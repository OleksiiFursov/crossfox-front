import {ReactNode, JSX, FC} from "react";

export interface IDragDropContext {
	children: ReactNode,
	onDragEnd?: Function,
	selected?: string[]
}

export interface iDragDropElement {
	children: ReactNode
	tagName?: keyof JSX.IntrinsicElements,
	draggable?: boolean
	component: FC
}

export interface iSelection {
	items: HTMLElement[],
	itemsElement: HTMLElement[],
	owner: HTMLElement | ParentNode | null,
	dropTarget: HTMLElement | null,
	dropTargetElement: HTMLElement | null
}


export interface iDragDropZone{
	children: ReactNode,
	tagName?: keyof JSX.IntrinsicElements,
	component: FC
}


//
// export interface iRouterContext{
// 	baseUrl: string,
// 	onChange: (prev:string, current:string) => void,
// 	sUrl: string,
// 	setSUrl: (url: string, data: Record<string, any>) => void,
// 	sHistory: MutableRefObject<[string, Record<string, any>][] | null>,
// 	sLayout: MutableRefObject<string | null>
// }
//
// export interface iRouterLink{
// 	to: string,
// 	tagName?: string,
// 	children?: FC,
// 	data?: Record<string, string>,
// 	onClick?: (e:MouseEvent)=>void,
// 	href?: string
// }
//
// export interface iRouteConfig{
// 	layout: string,
// }
//
//
