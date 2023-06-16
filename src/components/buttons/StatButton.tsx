import { Component, JSX, createRenderEffect, createSignal } from "solid-js";
import { randInt } from "three/src/math/MathUtils";

import { useInterface } from "components/providers/InterfaceContextProvider";

import styles from "styles/module/button/Stat.module.scss";

export type PropStatButton = {
	name: string;
	value: number;
};

const StatButton: Component<PropStatButton> = (props) => {
	const [selected, setSelected] = createSignal<boolean>(false);
	const { field, setField } = useInterface();

	const dots = (): JSX.Element[] => {
		const elements: JSX.Element[] = [];

		for (let i = 0; i < props.value; i++) {
			const num = randInt(1, 5);
			elements.push(<img src={`/elements/dot_${num}.svg`} alt='stat point' />);
		}

		return elements;
	};

	createRenderEffect(() => {
		setSelected(field() === props.name);
	});

	return (
		<div class={styles.container}>
			<button
				type='button'
				class={selected() ? styles.selected : styles.selection}
				title={`field ${props.name}`}
				onClick={() => setField(props.name)}>
				<h5>{props.name}</h5>
			</button>
			<button
				type='button'
				class={styles.dots}
				title={`field ${props.name}`}
				onClick={() => setField(props.name)}>
				{dots()}
			</button>
		</div>
	);
};

export default StatButton;
