import { Component, createEffect, For, Match, onCleanup, Switch } from "solid-js";
import { resolveLabel } from "auxil/functions";

import styles from "styles/module/Sides.module.scss";

import { type Topics, useUI } from "providers/InterfaceContextProvider";

import { DevIcon, LangIcon, TechIcon, WorkIcon } from "components/icons/Icons";
import { LangIconNames } from "components/icons/languages";
import { TechIconNames } from "components/icons/technologies";
import { WorkIconNames } from "components/icons/projects";
import { DevIconNames } from "components/icons/developer";

// note: this used to be on the left, as the name suggests,
// but for now it is on the right, because i think it looks
// better.
// i will not be updating the name
const Left: Component = () => {
	// signals
	const { getTab, getTopic, setTopic } = useUI();

	// element references
	let container: HTMLDivElement | undefined;
	let icons: NodeListOf<HTMLDivElement> | undefined;

	// signal dependents
	const className = (item: Topics) =>
		`${styles.aside_icon} ${getTopic() === item ? styles.active : ""}`;

	/// event listeners
	//

	const onclick = (event: PointerEvent) => {
		const target = event.currentTarget as HTMLDivElement;
		const name = target.dataset["name"] as Topics;

		setTopic(name);
	};

	/// side effects
	//

	createEffect(() => {
		if (container && getTab()) {
			icons = container.querySelectorAll(`div.${styles.aside_icon}`);
			icons.forEach((icon) => icon.addEventListener("click", onclick));
		}
	});

	/// mount & cleanup
	//

	onCleanup(() => {
		if (icons) {
			icons.forEach((icon) => icon.removeEventListener("click", onclick));
		}
	});

	/// render
	//

	return (
		<aside class={styles.container}>
			<h2>{resolveLabel(getTab()).slice(1)}</h2>
			<hr />
			<div ref={container} id={styles.aside_content}>
				<Switch>
					<Match when={getTab() === "lang"}>
						<For each={LangIconNames} fallback={<></>}>
							{(item) => <LangIcon name={item} classname={className(item)} />}
						</For>
					</Match>
					<Match when={getTab() === "tech"}>
						<For each={TechIconNames} fallback={<></>}>
							{(item) => <TechIcon name={item} classname={className(item)} />}
						</For>
					</Match>
					<Match when={getTab() === "work"}>
						<For each={WorkIconNames} fallback={<></>}>
							{(item) => <WorkIcon name={item} classname={className(item)} />}
						</For>
					</Match>
					<Match when={getTab() === "dev"}>
						<For each={DevIconNames} fallback={<></>}>
							{(item) => <DevIcon name={item} classname={className(item)} />}
						</For>
					</Match>
				</Switch>
			</div>
		</aside>
	);
};

export default Left;
