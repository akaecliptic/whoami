import { Component, Show } from "solid-js";

import ThreeContextProvider from "providers/ThreeContextProvider";
import InterfaceContextProvider from "providers/InterfaceContextProvider";

import Lights from "components/three/Lights";
import Character from "components/three/Character";

import Header from "components/interface/Header";
import Footer from "components/interface/Footer";

import Left from "components/interface/Left";
import Right from "components/interface/Right";
import Bottom from "components/interface/Bottom";

import { data } from "auxil/characterLoader";

const App: Component = () => {
	return (
		<>
			<Header />
			<InterfaceContextProvider>
				<main>
					<Left />
					<Bottom />
					<Right />
					<Show when={data.loading}>
						<span class='loading'>loading...</span>
					</Show>
				</main>
				<ThreeContextProvider>
					<Lights />
					<Show when={data.state === "ready"}>
						<Character character={data()} />
					</Show>
				</ThreeContextProvider>
			</InterfaceContextProvider>
			<Footer />
		</>
	);
};

export default App;
