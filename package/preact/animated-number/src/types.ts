export type AnimatedCounterProps = {
    value: number;
    duration: number;
    rate: number;
    round: number;
    tagName:any;
    className?: string;
    showArrow: boolean;
		reserveMinusSpace: boolean;
    suffix: string;
    prefix: string;
    reserve: number;
    align: 'left' | 'right';
    onFinish: (data: { oldValue: number; value: number; $el: HTMLElement }) => void;
};
