import { Component, createSignal, onMount } from "solid-js";

import styles from "styles/module/HeaderFooter.module.scss";

const Footer: Component = () => {
	const [mantra, setMantra] = createSignal<string>();

	onMount(() => {
		let str =
			"aka ae | " +
			"aka mide | " +
			"aka developer | " +
			"aka film buff | " +
			"aka stargazer | " +
			"aka space cadet | " +
			"aka mitochondria |" +
			"aka sleepiest engineer | " +
			"aka independent variable | " +
			"aka powerhouse of the cell | ".repeat(5);

		setMantra(str);
	});

	return (
		<footer class={styles.container}>
			<div>
				<span>{mantra()}</span>
				<span>{mantra()}</span>
			</div>
		</footer>
	);
};

export default Footer;
