import { Component, createSignal, onMount } from "solid-js";

import { type LangIcons, resolveLangIcon } from "./languages";
import { type TechIcons, resolveTechIcon } from "./technologies";
import { type GeneralIcons, resolveGeneralIcon } from "./general";
import { type WorkIcons, resolveWorkIcon } from "./projects";
import { type DevIcons, resolveDevIcon } from "./developer";
import { type TabIcons, resolveTabIcon } from "./tabs";

/// types & auxils
//

type Icons = LangIcons | TechIcons | GeneralIcons | WorkIcons | DevIcons | TabIcons;

/// base component
//

type BaseIconProps<T extends Icons> = {
	name: T;
	resolver: (name: T) => string;
	classname?: string;
};

const BaseIcon = <T extends Icons>(props: BaseIconProps<T>) => {
	const [icon, setIcon] = createSignal<string>();

	onMount(() => {
		setIcon(props.resolver(props.name));
	});

	return (
		<div
			class={`icon_wrapper ${props.classname ?? ""}`}
			innerHTML={icon()}
			data-name={props.name}></div>
	);
};

/// public interface
//

export type IconProps<T extends Icons> = {
	name: T;
	classname?: string;
};

export const LangIcon: Component<IconProps<LangIcons>> = (props) => {
	return (
		<BaseIcon<LangIcons>
			name={props.name}
			resolver={resolveLangIcon}
			classname={props.classname}
		/>
	);
};

export const TabIcon: Component<IconProps<TabIcons>> = (props) => {
	return (
		<BaseIcon<TabIcons>
			name={props.name}
			resolver={resolveTabIcon}
			classname={props.classname}
		/>
	);
};

export const GeneralIcon: Component<IconProps<GeneralIcons>> = (props) => {
	return (
		<BaseIcon<GeneralIcons>
			name={props.name}
			resolver={resolveGeneralIcon}
			classname={props.classname}
		/>
	);
};

export const TechIcon: Component<IconProps<TechIcons>> = (props) => {
	return (
		<BaseIcon<TechIcons>
			name={props.name}
			resolver={resolveTechIcon}
			classname={props.classname}
		/>
	);
};

export const WorkIcon: Component<IconProps<WorkIcons>> = (props) => {
	return (
		<BaseIcon<WorkIcons>
			name={props.name}
			resolver={resolveWorkIcon}
			classname={props.classname}
		/>
	);
};

export const DevIcon: Component<IconProps<DevIcons>> = (props) => {
	return (
		<BaseIcon<DevIcons>
			name={props.name}
			resolver={resolveDevIcon}
			classname={props.classname}
		/>
	);
};
