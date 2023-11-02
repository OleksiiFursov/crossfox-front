import React, {useEffect, useState, createElement, DragEventHandler, MouseEventHandler} from 'react';
import {IDragDropContext, iDragDropElement, iDragDropZone, iSelection} from "./types";

const d = document;
const dQ = (s: string) => d.querySelector(s);

const initialSelections = (): iSelection => ({
    items: [],
    itemsElement: [],
    owner: null,
    dropTarget: null,
    dropTargetElement: null
})

let related: HTMLElement;
let isMouseMoveAvailable = false;


function getContainer(el: HTMLElement) {
    while (el) {
        if (el.nodeType === 1 && el.getAttribute('aria-dropeffect')) break

        el = el.parentNode as HTMLElement;
    }
    return el;
}

const find = (name: string) => dQ("[name='" + name + "']");
const getName = (query: HTMLElement) => query && query.getAttribute('name') || '';
const each = (query: string, callback: (el: Element, i: number) => void, parent = d) => {
    const els = parent.querySelectorAll(query);
    for (let i = 0; i < els.length; i++) {
        callback(els[i], i);
    }
};


const HandleDragEnter: DragEventHandler = e => {
    related = e.currentTarget as HTMLElement;
}

export function DragDropContext(props: IDragDropContext) {

    const {onDragEnd, children, selected = []} = {
        onDragEnd: (selections: iSelection) => {
            for (let i = 0; i < selections.items.length; i++) {
                if (selections.dropTarget) {
                    selections.dropTarget.appendChild(selections.items[i]);
                }

            }
        }, ...props
    };

    const [selections, setSelections] = useState<iSelection>(initialSelections());

    useEffect(() => {
        setSelections(initialSelections());
    }, []);

    useEffect(() => {
        for (const id of selected) {
            // @ts-ignore
            if (!selections.items.includes(id)) {
                addSelection(find(id) as HTMLElement);
            }
        }
        for (const id of selections.items) {
            // @ts-ignore
            if (!selected.includes(id)) {
                // @ts-ignore
                removeSelection(find(id) as HTMLElement);
            }
        }
    }, [selected]);


    const addSelection = (item: HTMLElement) => {
        if (!selections.owner && item) {
            selections.owner = item.parentNode;
        } else if (selections.owner !== item.parentNode) {
            return;
        }

        item.setAttribute('aria-grabbed', 'true');
        // @ts-ignore
        selections.items.push(item.getAttribute('name'));
        selections.itemsElement.push(item);
        setSelections({...selections});
    }


    //function for unselecting an item
    const removeSelection = (item: HTMLElement): void => {
        if (!item) return;
        item.setAttribute('aria-grabbed', 'false');

        for (let i = 0; i < selections.items.length; i++) {
            if (selections.items[i] === item) {
                selections.itemsElement.splice(i, 1);
                selections.items.splice(i, 1);
                break;
            }
        }
        setSelections({...selections});
    }

    const clearSelections = () => {
        if (selections.items.length) {
            selections.owner = null;

            for (let i = 0; i < selections.itemsElement.length; i++) {
                //@ts-ignore
                if (!selected.includes(selections.items[i]) && selections.itemsElement[i])
                    selections.itemsElement[i].setAttribute('aria-grabbed', 'false');
            }

            selections.items = [];
            //@ts-ignore
            selections.itemsElement = Array(selected.length).fill(0).map(find);
            setSelections({...selections});
        }

    }

    const hasModifier = (e: KeyboardEvent | MouseEvent) => e.ctrlKey || e.metaKey || e.shiftKey;


    function addDropEffects() {
        //@ts-ignore
        let ownAttrName = getName(selections.owner);

        if (ownAttrName)
            ownAttrName = ":not(" + ownAttrName + ")";

        each('[aria-dropeffect="none"]' + ownAttrName,
            v => v.setAttribute('aria-dropeffect', 'move')
        );
        each('[aria-grabbed]' + ownAttrName,
            v => v.removeAttribute('aria-grabbed')
        );
    }

    function clearDropEffects() {

        if (selections.items.length) {
            each('[data-draggable="target"]:not([aria-dropeffect="none"])',
                v => v.setAttribute('aria-dropeffect', 'none')
            );

            each('[data-draggable="item"]:not([aria-grabbed])',
                v => v.setAttribute('aria-grabbed', 'false')
            );

        }
    }


    const HandleMouseDown: MouseEventHandler = (e) => {
        const el = ((e.target as HTMLElement).closest('[data-draggable="item"]') || e.target) as HTMLElement;
        if (el.getAttribute('draggable')) {
            clearDropEffects();
            //@ts-ignore
            if (!hasModifier(e) && el.getAttribute('aria-grabbed') === 'false') {
                clearSelections();
                addSelection(el);
            }   //@ts-ignore
        } else if (!hasModifier(e)) {
            clearDropEffects();
            clearSelections();
        } else {
            clearDropEffects();
        }
    }

    const HandleMouseUp: MouseEventHandler = e => {
        const el = ((e.target as HTMLElement).closest('[data-draggable="item"]') || e.target as HTMLElement);
        // @ts-ignore
        if (el.getAttribute('draggable') && hasModifier(e)) {

            if (el.getAttribute('aria-grabbed') === 'true') {
                removeSelection(el as HTMLElement);

                if (!selections.items.length) {
                    selections.owner = null;
                    setSelections({...selections});
                }
            } else {

                addSelection(el as HTMLElement);
            }
        }
    };

    const HandleDragStart: DragEventHandler = e => {

        if (selections.owner !== (e.target as HTMLElement).parentNode) { //closest
            e.preventDefault();
            return;
        }
        const a = (e.target as HTMLElement).parentElement as HTMLElement;
        //@ts-ignore
        if (hasModifier(e) && a.getAttribute('aria-grabbed') === 'false') {

            addSelection(a);
        }

        e.dataTransfer.setData('text', '');

        addDropEffects();
    }


    const HandleDragLeave: DragEventHandler = () => {

        let dropTargetElement = getContainer(related);

        if (dropTargetElement === selections.owner) {
            //@ts-ignore
            dropTargetElement = null;
        }

        if (dropTargetElement !== selections.dropTargetElement) {
            if (selections.dropTargetElement) {
                (selections.dropTargetElement as HTMLElement).classList.remove('dragover');
            }
            if (dropTargetElement) {
                dropTargetElement.classList.add('dragover');
            }

            selections.dropTargetElement = dropTargetElement;
            // @ts-ignore
            selections.dropTarget = getName(dropTargetElement as HTMLElement);
            setSelections({...selections});
        }
    }

    const HandleDragOver: DragEventHandler = e => {
        if (isMouseMoveAvailable) {
            setTimeout(() => {
                isMouseMoveAvailable = true;
            }, 30);
        }
        isMouseMoveAvailable = false;

        if (selections.items.length) e.preventDefault();
    }

    const HandleDragEnd: DragEventHandler = e => {
        if (selections.dropTargetElement) {
            onDragEnd({...selections})
            e.preventDefault();
        }

        if (selections.items.length) {
            clearDropEffects();

            if (selections.dropTargetElement) {
                clearSelections();

                selections.dropTargetElement.classList.remove('dragover')

                selections.dropTargetElement = null;
                selections.dropTarget = null;
                setSelections({...selections});
            }
        }

    };

    return <div onDragEnd={HandleDragEnd}
                onDragOver={HandleDragOver}
                onDragLeave={HandleDragLeave}
                onDragEnter={HandleDragEnter}
                onDragStart={HandleDragStart}
                onMouseUp={HandleMouseUp}
                onMouseDown={HandleMouseDown}
    >
        {children}
    </div>;
}


export function DragDropZone(props: iDragDropZone) {
    const {children, tagName = 'div', component: Component, ...attrs} = props;

    const properties = {
        'data-draggable': "target",
        'aria-dropeffect': "none",
        ...attrs
    };

    if (Component)
        return <Component {...properties}>{children}</Component>;

    return createElement(tagName, properties, children);
}

export function DragDropElement(props: iDragDropElement) {
    const {tagName = 'div', children, draggable = true, component: Component, ...attrs} = props;

    const properties = {
        'data-draggable': draggable ? "item" : 'item-no-drop',
        'aria-grabbed': false,
        draggable,
        ...attrs
    };

    if (Component)
        return <Component {...properties}>{children}</Component>;

    return createElement(tagName, properties, children);
}
