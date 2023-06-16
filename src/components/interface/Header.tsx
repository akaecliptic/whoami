import { Component } from "solid-js";

import SpecButton from "components/buttons/SpecButton";

import styles from "styles/module/Header.module.scss";

const Header: Component = () => {
	return (
		<header class={styles.container}>
			<img id={styles.logo} src='/logo.svg' alt='logo' />
			<nav class={styles.buttons}>
				<SpecButton name='dev' />
				<SpecButton name='art' />
			</nav>
		</header>
	);
};

export default Header;
