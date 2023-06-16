import { Component, Show, createRenderEffect, createSignal } from "solid-js";

import { useInterface } from "components/providers/InterfaceContextProvider";

import styles from "styles/module/button/Text.module.scss";

export type PropTextButton = {
	name: string;
	link?: string;
};

const TextButton: Component<PropTextButton> = (props) => {
	const [selected, setSelected] = createSignal<boolean>(false);
	const { field, setField } = useInterface();

	createRenderEffect(() => {
		setSelected(field() === props.name);
	});

	return (
		<div class={styles.container}>
			<Show when={props.link}>
				<a href={props.link} class={styles.link} title={props.link}>
					[link]
				</a>
			</Show>
			<button
				type='button'
				class={selected() ? styles.selected : styles.selection}
				title={`field ${props.name}`}
				onClick={() => setField(props.name)}>
				<h5>{props.name}</h5>
			</button>
		</div>
	);
};

export default TextButton;
