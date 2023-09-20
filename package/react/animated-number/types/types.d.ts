import { JSX } from "react";
export type AnimatedCounterProps = {
    value: number;
    duration: number;
    rate: number;
    round: number;
    tagName: keyof JSX.IntrinsicElements;
    className?: string;
    showArrow: boolean;
    suffix: string;
    prefix: string;
    reserve: number;
    align: 'left' | 'right';
    onFinish: (data: {
        oldValue: number;
        value: number;
        $el: HTMLElement;
    }) => void;
};
