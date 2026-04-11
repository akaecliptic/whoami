import { Component, createEffect, createSignal, onCleanup, onMount } from "solid-js";

import styles from "styles/module/HeaderFooter.module.scss";

import timezone from "dayjs/plugin/timezone";
import dayjs, { Dayjs } from "dayjs";
import { GeneralIcon } from "components/icons/Icons";

/// utility
//

// configuring default timezone for dayjs
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/Dublin");

// defining day/night icons and utility types
const Icons = ["sol", "luna"] as const;
type TimeIcon = (typeof Icons)[number];

/// component
//

const Header: Component = () => {
	// signals
	const [localTime, setLocalTime] = createSignal<Dayjs>(dayjs());
	const [iconTime, setIconTime] = createSignal<TimeIcon>("sol");

	// variables
	let intervalId: number | undefined;

	/// side effects
	//

	createEffect(() => {
		const hour = localTime().hour(); // 0 - 23
		const icon: TimeIcon = hour > 18 || hour < 6 ? "luna" : "sol";
		setIconTime(icon);
	});

	/// mount & cleanup
	//

	onMount(() => {
		intervalId = setInterval(() => {
			setLocalTime(dayjs());
		}, 10_000);
	});

	onCleanup(() => {
		clearInterval(intervalId);
	});

	/// render
	//

	return (
		<header class={styles.container}>
			<div id={styles.header_top}>
				<div id={styles.time}>
					<GeneralIcon classname={styles.time_icon} name={iconTime()} />
					<span>{localTime().format("HH:mm")}</span>
				</div>
				<div id={styles.stats}>
					<span class={styles.stat}>
						<span class={`${styles.stat_icon} ${styles.circle}`}>26</span>
						<span class={styles.stat_text}>
							years
							<br />
							old
						</span>
					</span>
					<span class={styles.stat}>
						<span class={`${styles.stat_icon} ${styles.circle}`}>4</span>
						<span class={styles.stat_text}>
							years
							<br />
							exp
						</span>
					</span>
					<span class={styles.stat}>
						<span class={`${styles.stat_icon} ${styles.degree}`}>bcs</span>
						<span class={styles.stat_text}>
							1st class
							<br />
							computing
						</span>
					</span>
				</div>
			</div>
			<div id={styles.logo_container}>
				<div id={styles.outline} />
				<img id={styles.logo} src='logo.svg' alt='ae' />
			</div>
		</header>
	);
};

export default Header;
