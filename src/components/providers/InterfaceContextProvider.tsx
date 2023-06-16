import { Accessor, ParentComponent, createContext, createEffect, useContext } from "solid-js";

import createBridge from "hooks/createUIBridge";

import type { Attribute, Spec } from "types/interface";

export type InterfaceContext = {
	spec: Accessor<Spec>;
	setSpec: (value: Spec) => void;
	attribute: Accessor<Attribute>;
	setAttribute: (value: Attribute) => void;
	field: Accessor<string>;
	setField: (value: string) => void;
};

export const useInterface = () => {
	const context = useContext(Context);

	if (!context) throw new Error("useInterface must be used inside InterfaceContextProvider");

	return context;
};

const Context = createContext<InterfaceContext | null>(null);

const InterfaceContextProvider: ParentComponent = (props) => {
	const { spec, setSpec, attribute, setAttribute, field, setField } = createBridge();

	createEffect(() => {
		setAttribute(spec() === "dev" ? "technologies" : "tools");
	});

	return (
		<>
			<Context.Provider value={{ spec, setSpec, attribute, setAttribute, field, setField }}>
				{props.children}
			</Context.Provider>
		</>
	);
};

export default InterfaceContextProvider;
