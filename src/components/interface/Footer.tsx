import { useInterface } from "components/providers/InterfaceContextProvider";
import { Component, createEffect, createSignal } from "solid-js";

import styles from "styles/module/Footer.module.scss";

const Footer: Component = () => {
	const [mantra, setMantra] = createSignal<string>();
	const { spec } = useInterface();

	createEffect(() => {
		let str = "";
		const repeat = spec() === "art" ? "facio ergo sum | " : "powerhouse of the cell | ";

		for (let i = 0; i < 25; i++) {
			str += repeat;
		}

		setMantra(str);
	});

	return (
		<footer class={styles.container}>
			<div>
				<span class={styles[spec()]}>{mantra()}</span>
				<span class={styles[spec()]}>{mantra()}</span>
			</div>
		</footer>
	);
};

export default Footer;
