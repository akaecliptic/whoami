import { Component, For } from "solid-js";
import { LangData } from "data";

import styles from "styles/module/Common.module.scss";

const Bars = Array.from(Array(5).keys());

type ExperienceProps = {
	data: LangData;
};

const ExperienceBar: Component<ExperienceProps> = (props) => {
	const getClass = (index: number): string => {
		return index > props.data.experience - 1 ? styles.empty : "";
	};

	const getTitle = (): string => {
		switch (props.data.experience) {
			case 1:
				return "why bother?";
			case 2:
				return "developer dabbles";
			case 3:
				return "personal projects";
			case 4:
				return "comfortable";
			case 5:
				return "experienced";
		}
	};

	return (
		<div class={styles.experience_container}>
			<div class={styles.experience_bar}>
				<For each={Bars} fallback={<></>}>
					{(_, index) => <div class={`${styles.bar} ${getClass(index())}`} />}
				</For>
			</div>
			<span class={styles.experience_label}>{getTitle()}</span>
		</div>
	);
};

export default ExperienceBar;
