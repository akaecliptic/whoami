import { Component, For, Match, Switch, createRenderEffect } from "solid-js";

import { useInterface } from "components/providers/InterfaceContextProvider";

import StatButton from "components/buttons/StatButton";
import TextButton from "components/buttons/TextButton";

import art from "data/art.json";
import dev from "data/dev.json";

import styles from "styles/module/Fields.module.scss";

const Fields: Component = () => {
	const { attribute, spec, setField } = useInterface();

	createRenderEffect(() => {
		if (attribute() === "technologies") {
			setField(dev.technologies[0].name);
		} else if (attribute() === "tools") {
			setField(art.tools[0]);
		} else if (spec() === "dev") {
			setField(dev.portfolio[0].name);
		} else {
			setField(art.portfolio[0].name);
		}
	});

	return (
		<section class={styles.container}>
			<h4 class={styles.title}>fields</h4>
			<div class={styles.buttons}>
				<Switch>
					<Match when={attribute() === "technologies"}>
						<For each={dev.technologies}>
							{(tech) => <StatButton name={tech.name} value={tech.value} />}
						</For>
					</Match>
					<Match when={attribute() == "tools"}>
						<For each={art.tools}>{(tool) => <TextButton name={tool} />}</For>
					</Match>
					<Match when={attribute() === "portfolio" && spec() === "dev"}>
						<For each={dev.portfolio}>
							{(port) => <TextButton name={port.name} link={port.link} />}
						</For>
					</Match>
					<Match when={attribute() === "portfolio" && spec() === "art"}>
						<For each={art.portfolio}>
							{(port) => <TextButton name={port.name} link={port.link} />}
						</For>
					</Match>
				</Switch>
			</div>
		</section>
	);
};

export default Fields;
