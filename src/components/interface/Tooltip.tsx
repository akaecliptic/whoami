import { Component } from "solid-js";

import styles from "styles/module/Tooltip.module.scss";

const Tooltip: Component = () => {
	return (
		<section class={styles.container}>
			<h4 class={styles.title}>tooltip</h4>
			<div class={styles.tooltip}>
				<p>lil bro thinks he's cooking 💀</p>
			</div>
		</section>
	);
};

export default Tooltip;
