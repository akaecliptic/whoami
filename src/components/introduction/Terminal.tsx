import { Component, onCleanup, onMount } from "solid-js";

import TypeWritter from "lib/typeit";
import { randInt } from "three/src/math/MathUtils";
import { asci, greet, user, welcome } from "resource/intro";

export type PropTerminal = {
	onComplete: () => void;
	parent: HTMLDivElement;
};

const Terminal: Component<PropTerminal> = (props) => {
	let timeout: number;

	onMount(() => {
		const random = randInt(0, 10);

		if (random === 10) {
			new TypeWritter("#typewriter", {
				speed: 100,
				startDelay: 2000,
				waitUntilVisible: true,
				afterComplete: async (instance: any) => {
					instance.destroy();
					props.parent.classList.add("fadeout");
					timeout = setTimeout(() => {
						props.onComplete();
					}, 1000);
				},
			})
				.type("who", { delay: 500 })
				.type("anmi", { delay: 1500 })
				.move(-1, { delay: 150 })
				.move(-1, { delay: 250 })
				.delete(1)
				.move(1, { delay: 100 })
				.move(1, { delay: 100 })
				.pause(1000)
				.go();
		} else {
			new TypeWritter("#typewriter", {
				speed: 100,
				startDelay: 2000,
				waitUntilVisible: true,
				afterComplete: async (instance: any) => {
					instance.destroy();
					props.parent.classList.add("fadeout");
					timeout = setTimeout(() => {
						props.onComplete();
					}, 1000);
				},
			})
				.type("who", { delay: 500 })
				.type("ami", { delay: 1500 })
				.pause(1000)
				.go();
		}
	});

	onCleanup(() => {
		clearTimeout(timeout);
	});

	return (
		<>
			<code>{welcome}</code>
			<code>{asci}</code>
			<code>{greet}</code>
			<div class='container-typeit'>
				<code>{user}</code>
				<code id='typewriter' />
			</div>
		</>
	);
};

export default Terminal;
