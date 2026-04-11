import {
	Component,
	createEffect,
	createSignal,
	Match,
	onCleanup,
	onMount,
	Show,
	Switch,
} from "solid-js";

import { useUI } from "providers/InterfaceContextProvider";
import { DevData, LangData, resolveData, TechData, WorkData } from "data";
import { GeneralIcon } from "components/icons/Icons";
import { createStore } from "solid-js/store";
import { TabIcons } from "components/icons/tabs";
import ChipContainer from "components/common/Chip";
import ExperienceBar from "components/common/Experience";

import styles from "styles/module/Sides.module.scss";

/// types & auxils
//

const defaultLangData: LangData = {
	description: "",
	experience: 1,
	domains: [],
} as const;

const defaultTechData: TechData = {
	description: "",
} as const;

const defaultWorkData: WorkData = {
	description: "",
	tech: [],
	link: "",
	text: "",
} as const;

const defaultDevData: DevData = {
	description: "",
	flavour: "",
} as const;

type DataStore = {
	active: TabIcons;
	state: {
		lang: LangData;
		tech: TechData;
		work: WorkData;
		dev: DevData;
	};
};

/// component
//

const Right: Component = () => {
	// interface provider
	const { getTab, getTopic } = useUI();

	// local state
	const [toggle, setToggle] = createSignal<boolean>(true);
	const [store, setStore] = createStore<DataStore>({
		active: "lang",
		state: {
			lang: defaultLangData,
			tech: defaultTechData,
			work: defaultWorkData,
			dev: defaultDevData,
		},
	});

	// element references
	let buttonToggle: HTMLButtonElement | undefined;

	/// event listeners
	//

	const onToggle = (): void => {
		setToggle((current) => !current);
	};

	/// side effects
	//

	createEffect(() => {
		let override = {} as any;
		override[getTab()] = resolveData(getTopic());

		setStore("active", getTab());
		setStore("state", { ...store.state, ...override });
	});

	/// mount & cleanup
	//

	onMount(() => {
		buttonToggle?.addEventListener("click", onToggle);
	});

	onCleanup(() => {
		buttonToggle?.removeEventListener("click", onToggle);
	});

	/// render
	//

	return (
		<article class={styles.container}>
			<div id={styles.article_title}>
				<h3>{getTopic()}</h3>
				<button
					ref={buttonToggle}
					id={styles.article_toggle}
					class={toggle() ? styles.toggle_open : styles.toggle_close}>
					<GeneralIcon name='toggle' />
				</button>
			</div>
			<div
				id={styles.article_description}
				class={toggle() ? styles.toggle_open : styles.toggle_close}>
				<hr />
				<Switch>
					<Match when={getTab() === "lang"}>
						<p>{store.state.lang.description}</p>
					</Match>
					<Match when={getTab() === "tech"}>
						<p>{store.state.tech.description}</p>
					</Match>
					<Match when={getTab() === "work"}>
						<div id={styles.article_context}>
							<ChipContainer items={store.state.work.tech} />
						</div>
						<p class={styles.slim}>{store.state.work.description}</p>
						<span class={styles.quote}>
							-{" "}
							<a href={store.state.work.link} target='_blank'>
								{store.state.work.text}
							</a>
						</span>
					</Match>
					<Match when={getTab() === "dev"}>
						<p class={styles.slim}>{store.state.dev.description}</p>
						<span class={styles.quote}>
							- <q>{store.state.dev.flavour}</q>
						</span>
					</Match>
				</Switch>
				<Show when={getTab() === "lang"}>
					<ExperienceBar data={store.state.lang} />
					<ChipContainer items={store.state.lang.domains} />
				</Show>
			</div>
		</article>
	);
};

export default Right;
