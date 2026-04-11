import { Component, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { useUI } from "providers/InterfaceContextProvider";
import { resolveLabel } from "auxil/functions";
import { type TabIcons, TabIconNames } from "components/icons/tabs";
import { TabIcon } from "components/icons/Icons";

import styles from "styles/module/Sides.module.scss";

const Bottom: Component = () => {
	// interface provider
	const { getTab, setTab } = useUI();

	// signals
	const [isNavHover, setIsNavHover] = createSignal<boolean>(false);
	const [labelText, setLabelText] = createSignal<string | null>(null);

	// element references
	let container: HTMLElement | undefined;
	let icons: NodeListOf<HTMLDivElement> | undefined;

	let label: HTMLSpanElement | undefined;
	let selector: HTMLDivElement | undefined;

	// scramble animation variables
	const chars = "<>/+@[]^$%£&*#?!";
	const animationLength = 1000;
	// note: this isn't used during rendering, so it's a simple variable
	let hoveredTab: TabIcons | null = null;

	/// functions
	//

	// https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
	// plays scramble animation for label text
	const scrambleLabel = (intput: string, context: TabIcons) => {
		// step 0 - set up closure variables
		const interval = animationLength / intput.length;

		let text = intput.split("");
		let counter = 0;
		let timestamp = 0;

		// step 1 - define animation
		function decode(time: number) {
			// step 1.1 - validation and initialisation checks
			// note: there was some weird behaviour when a user moved too quickly over mutliple icons.
			// this line checks if this animation is still valid to the current hovered icon, if not,
			// the function exits, stopping any more from frames being processed
			if (context !== hoveredTab) return;

			// note: i'm doing it this way for initial animation delay
			if (timestamp === undefined) {
				timestamp = time;
			}

			// step 1.2 - calculate time since last animation frame, and decide if enough time has passed
			const deltatime = time - timestamp;

			if (deltatime >= interval) {
				for (let i = 0; i < intput.length; i++) {
					// step 1.3 - only play scramble animation for none decoded characters
					if (counter >= i) {
						text[i] = intput.charAt(i);
					} else {
						const index = Math.floor(Math.random() * (chars.length - 1));
						text[i] = chars[index];
					}
				}

				// step 1.4 - "play" animation frame aka, update ui with current state and update closures
				setLabelText(text.join(""));

				counter++;
				timestamp = time;
			}

			// step 1.5 - determine if animation should request more frames
			// note: this is the recursion exit condition.
			// if false, all characters have been de-scrambled
			if (counter < intput.length) {
				requestAnimationFrame(decode);
			}
		}

		// step 2 - play animation recursively
		requestAnimationFrame(decode);
	};

	/// event listeners
	//

	// sets active tab based on icon clicked
	const onclick = (event: MouseEvent): void => {
		if (!icons) return;

		const target = event.currentTarget as HTMLDivElement;
		const name = target.dataset["name"] as TabIcons;

		// return early if current tab is tab being clicked
		if (getTab() === name) return;

		setTab(name);

		icons.forEach((icon) => {
			const current = icon.dataset["name"] === name;
			icon.classList.toggle(styles.active, current);
		});
	};

	// moves selector to icon under cursor position and sets label name
	const onmouseover = (event: MouseEvent): void => {
		const target = event.currentTarget as HTMLDivElement;
		const name = target.dataset["name"] as TabIcons;
		const offset = target.offsetLeft.toString() + "px";

		if (!selector) return;

		if (selector.style.left !== offset) {
			selector.style.left = offset;

			hoveredTab = name;
			scrambleLabel(resolveLabel(name), name);
		} else {
			hoveredTab = name;
			setLabelText(resolveLabel(name));
		}
	};

	// sets selector as active only when nav is hovered
	const onmousemove = (event: MouseEvent): void => {
		setIsNavHover(true);
	};

	// sets selector as inactive if cursor is not hovering nav
	const onmouseleave = (): void => {
		hoveredTab = null;

		setIsNavHover(false);
		setLabelText(null);
	};

	/// mount & cleanup
	//

	onMount(() => {
		if (container) {
			icons = container.querySelectorAll<HTMLDivElement>(`div.${styles.nav_icon}`);

			icons.forEach((icon) => {
				// assign event listeners
				icon.addEventListener("mousemove", onmouseover);
				icon.addEventListener("click", onclick);

				// set default tab
				const current = icon.dataset["name"] === getTab();
				icon.classList.toggle(styles.active, current);
			});

			container.addEventListener("mousemove", onmousemove);
			container.addEventListener("mouseleave", onmouseleave);
		}
	});

	onCleanup(() => {
		if (icons) {
			icons.forEach((icon) => {
				icon.removeEventListener("mousemove", onmouseover);
				icon.removeEventListener("click", onclick);
			});
		}

		if (container) {
			container.removeEventListener("mousemove", onmousemove);
			container.removeEventListener("mouseleave", onmouseleave);
		}
	});

	/// render
	//

	return (
		<nav ref={container} class={styles.container}>
			<div
				ref={selector}
				id={styles.nav_selector}
				class={isNavHover() ? styles.active : styles.inactive}
			/>
			<Show when={!!labelText()}>
				<span ref={label} id={styles.nav_label}>
					{labelText() ?? ""}
				</span>
			</Show>
			<For each={TabIconNames}>
				{(item) => <TabIcon name={item} classname={styles.nav_icon} />}
			</For>
		</nav>
	);
};

export default Bottom;
