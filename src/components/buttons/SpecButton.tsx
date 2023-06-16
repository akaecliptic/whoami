import { Component, Show, createRenderEffect, createSignal, onMount } from "solid-js";

import { useInterface } from "components/providers/InterfaceContextProvider";

import type { Spec } from "types/interface";

import styles from "styles/module/button/Spec.module.scss";

export type PropSpecButton = {
	name: Spec;
};

const SpecButton: Component<PropSpecButton> = (props) => {
	const [selected, setSelected] = createSignal<boolean>(false);
	const { spec, setSpec } = useInterface();

	onMount(() => {
		setSelected(spec() === props.name);
	});

	createRenderEffect(() => {
		setSelected(spec() === props.name);
	});

	return (
		<div class={styles.container}>
			<button
				type='button'
				title={`button ${props.name}`}
				class={selected() ? styles.selected : styles.selection}
				onClick={() => setSpec(props.name)}>
				<Show
					when={selected()}
					fallback={
						<img
							src={`/buttons/btn_${props.name}.svg`}
							alt={`button spec ${props.name}`}
						/>
					}>
					<img
						src={`/buttons/btn_${props.name}_select.svg`}
						alt={`button spec ${props.name}`}
					/>
				</Show>
			</button>
			<Show when={selected()}>
				<img class={styles.active} src='/animations/arrow.gif' alt='arrow for selected' />
			</Show>
		</div>
	);
};

export default SpecButton;
