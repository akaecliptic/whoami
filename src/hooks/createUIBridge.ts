import { createSignal } from "solid-js";

import { InterfaceContext } from "components/providers/InterfaceContextProvider";

import type { Attribute, Spec } from "types/interface";

const [spec, setSpec] = createSignal<Spec>("dev");
const [attribute, setAttribute] = createSignal<Attribute>(null);
const [field, setField] = createSignal<string>("");

const createBridge = (): InterfaceContext => {
	return { spec, setSpec, attribute, setAttribute, field, setField };
};

export default createBridge;
