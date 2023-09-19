import {JSX} from "react";

export type AnimatedCounterProps = {
    value: number;
    duration: number;
    rate: number;
    round: number;
    tagName: keyof JSX.IntrinsicElements;
    className?: string;
    showArrow: boolean;
		reserveMinusSpace: boolean;
    suffix: string;
    prefix: string;
    marginEnd: number;
    align: 'left' | 'right';
    onFinish: (data: { oldValue: number; value: number; $el: HTMLElement }) => void;
};
