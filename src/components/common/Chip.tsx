import { Component, For } from "solid-js";

import styles from "styles/module/Common.module.scss";

type ChipProps = {
	text: string;
};

const Chip: Component<ChipProps> = (props) => {
	return <span class={styles.chip}>{props.text}</span>;
};

export type ChipContainerProps = {
	items: string[];
};

const ChipContainer: Component<ChipContainerProps> = (props) => {
	return (
		<div class={styles.chip_container}>
			<For each={props.items} fallback={<></>}>
				{(text) => <Chip text={text} />}
			</For>
		</div>
	);
};

export default ChipContainer;
