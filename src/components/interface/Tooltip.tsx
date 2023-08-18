import { Component, createEffect, createSignal } from "solid-js";

import { getDevTooltips, getArtistTooltips } from "resource/tooltip";

import { useInterface } from "components/providers/InterfaceContextProvider";

import styles from "styles/module/Tooltip.module.scss";

const Tooltip: Component = () => {
	const { spec, field } = useInterface();
	const [tooltip, setTooltip] = createSignal<string>("");

	createEffect(() => {
		const formattedField = field().toLowerCase();
		if (spec() === "dev") {
			setTooltip(getDevTooltips(formattedField));
		} else {
			setTooltip(getArtistTooltips(formattedField));
		}
	});

	return (
		<section class={styles.container}>
			<h4 class={styles.title}>tooltip</h4>
			<div class={styles.tooltip}>
				<p>{tooltip()}</p>
			</div>
		</section>
	);
};

export default Tooltip;
