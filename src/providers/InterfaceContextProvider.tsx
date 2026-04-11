import { DevIconNames, type DevIcons } from "components/icons/developer";
import { LangIconNames, type LangIcons } from "components/icons/languages";
import { WorkIconNames, type WorkIcons } from "components/icons/projects";
import { type TabIcons } from "components/icons/tabs";
import { TechIconNames, type TechIcons } from "components/icons/technologies";
import { ParentComponent, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

/// types
//

export type Topics = LangIcons | TechIcons | WorkIcons | DevIcons;
export const TopicMap = {
	lang: LangIconNames,
	tech: TechIconNames,
	work: WorkIconNames,
	dev: DevIconNames,
} as const;

type InterfaceContext = {
	getTab: () => TabIcons;
	setTab: (value: TabIcons) => void;
	getTopic: () => Topics;
	setTopic: (value: Topics) => void;
	getOutfit: () => DevIcons;
};

type InterfaceStore = {
	active: TabIcons;
	state: {
		lang: LangIcons;
		tech: TechIcons;
		work: WorkIcons;
		dev: DevIcons;
	};
};

/// public interface
//

const Context = createContext<InterfaceContext | null>(null);

export const useUI = () => {
	const context = useContext(Context);

	if (!context) throw new Error("useUI must be used inside InterfaceContextProvider");

	return context;
};

/// component
//

const InterfaceContextProvider: ParentComponent = (props) => {
	// encapsulated context state
	const [store, setStore] = createStore<InterfaceStore>({
		active: "lang",
		state: {
			lang: "java",
			tech: "aws",
			work: "picat",
			dev: "none",
		},
	});

	/// exposed functions
	//

	const setTab = (tab: TabIcons): void => {
		setStore("active", tab);
	};

	const getTab = (): TabIcons => {
		return store.active;
	};

	const setTopic = (topic: Topics): void => {
		if (!TopicMap[store.active]?.includes(topic as never)) {
			return;
		}

		let override = {} as any;
		override[store.active] = topic;

		setStore("state", { ...store.state, ...override });
	};

	const getTopic = (): Topics => {
		return store.state[store.active];
	};

	const getOutfit = (): DevIcons => {
		return store.state.dev;
	};

	/// return
	//

	return (
		<Context.Provider value={{ getTab, setTab, getTopic, setTopic, getOutfit }}>
			{props.children}
		</Context.Provider>
	);
};

export default InterfaceContextProvider;
