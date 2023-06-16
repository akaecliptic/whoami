import { Component, Show, createRenderEffect, createSignal, onMount } from "solid-js";

import { useInterface } from "components/providers/InterfaceContextProvider";
import { Attribute } from "types/interface";

import styles from "styles/module/button/Attr.module.scss";

export type PropAttrButton = {
	name: Attribute;
	instance: number;
};

const AttrButton: Component<PropAttrButton> = (props) => {
	const [selected, setSelected] = createSignal<boolean>(false);
	const { attribute, setAttribute } = useInterface();

	onMount(() => {
		setSelected(attribute() === props.name);
	});

	createRenderEffect(() => {
		setSelected(attribute() === props.name);
	});

	return (
		<div class={styles.container}>
			<button
				type='button'
				title={`attribute ${props.name}`}
				class={
					selected()
						? `${styles.selected} ${props.instance}`
						: `${styles.selection} ${props.instance}`
				}
				onClick={() => setAttribute(props.name)}>
				<h5>{props.name}</h5>
			</button>
			<Show when={selected()}>
				<img class={styles.active} src='/animations/arrow.gif' alt='arrow for selected' />
			</Show>
		</div>
	);
};

export default AttrButton;
