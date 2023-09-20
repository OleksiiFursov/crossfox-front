import {createElement, memo, useEffect, useRef} from 'react';
import {AnimatedCounterProps} from './types';


const classStatus = ['is-increment', 'is-decrement'];
const easingFunction = (t: number) => t * t * (3 - 2 * t) * 2;

function AnimatedCounter(props: Partial<AnimatedCounterProps>) {
	const {
		value = 0,
		duration = 1000,
		rate = 60,
		round = 0,
		tagName = 'div',
		className,
		showArrow = false,
		suffix = '',
		prefix = '',
		reserveMinusSpace = true,
		reserve = 0,
		align = 'left',
		onFinish = () => {
		},
		...rest
	} = props;

	const ref = useRef<HTMLElement>();
	const timer = useRef<NodeJS.Timeout | null>(null)
	const oldValue = useRef<number>(value);

	const formatContent = (value: number, isUp?: boolean) => {
		let content = value.toFixed(round);
		if (reserve && content.length < reserve) {
			const space = "\u00A0".repeat(reserve - content.length);
			content = align === 'left' ? content + space : space + content;
		}
		const arrow = isUp === undefined ? '' : (showArrow ? isUp ? '🠕' : '🠗' : '')
		return (reserveMinusSpace && value >= 0 ? '\u00A0' : '') + prefix + arrow + content + suffix;
	}

	useEffect(() => {
		let current = oldValue.current;
		let i = 0;
		const loopCount = rate * (duration / 1000);
		const step = (value - oldValue.current) / loopCount;
		if (step) {
			const isUp = step > 0;
			if (timer.current) {
				if (ref.current) {
					ref.current.innerHTML = formatContent(current, isUp);
				}
				clearInterval(timer.current);
			}

			const currentClassApi = ref.current?.classList;
			if (currentClassApi) {
				currentClassApi.add(classStatus[+!isUp], 'is-progress');
				currentClassApi.remove(classStatus[+isUp]);
			}


			timer.current = setInterval(() => {
				current += step * easingFunction(i / loopCount);

				if (++i >= loopCount) {
					clearInterval(timer.current!);
					timer.current = null;
					if (currentClassApi) {
						currentClassApi.remove('is-progress');
					}
					current = value;

					onFinish({
						oldValue: oldValue.current,
						value,
						$el: ref.current as HTMLElement
					})

				}
				if (ref.current) {
					ref.current.innerHTML = formatContent(current, isUp);
				}

			}, 1000 / rate)
			oldValue.current = value;
		}
		return () => {
			if (timer.current) {
				clearInterval(timer.current);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, duration, onFinish, rate]);

	return createElement(tagName, {
		ref,
		className,
		...rest,
		dangerouslySetInnerHTML: {__html: formatContent(oldValue.current)}
	});

}

export default memo(AnimatedCounter);
