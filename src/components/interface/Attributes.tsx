import { Component, For, Match, Switch } from "solid-js";

import { useInterface } from "components/providers/InterfaceContextProvider";

import AttrButton from "components/buttons/AttrButton";

import type { Attribute } from "types/interface";

import art from "data/art.json";
import dev from "data/dev.json";

import styles from "styles/module/Attributes.module.scss";

const Attributes: Component<{}> = () => {
	const { spec } = useInterface();

	return (
		<section class={styles.container}>
			<h4 class={styles.title}>attrs</h4>
			<div class={styles.buttons}>
				<Switch>
					<Match when={spec() === "dev"}>
						<For each={Object.keys(dev)}>
							{(attr, index) => (
								<AttrButton name={attr as Attribute} instance={index() + 1} />
							)}
						</For>
					</Match>
					<Match when={spec() === "art"}>
						<For each={Object.keys(art)}>
							{(attr, index) => (
								<AttrButton name={attr as Attribute} instance={index() + 2} />
							)}
						</For>
					</Match>
				</Switch>
			</div>
		</section>
	);
};

export default Attributes;
