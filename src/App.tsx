import { Component, Show, createSignal, onCleanup, onMount } from "solid-js";

import ThreeContextProvider from "components/providers/ThreeContextProvider";
import InterfaceContextProvider from "components/providers/InterfaceContextProvider";

import Lights from "components/three/Lights";
import Character from "components/three/Character";

import Attributes from "components/interface/Attributes";
import Fields from "components/interface/Fields";
import Header from "components/interface/Header";
import Footer from "components/interface/Footer";
import Tooltip from "components/interface/Tooltip";

import character from "resource/models";
import Terminal from "components/introduction/Terminal";
import { randInt } from "three/src/math/MathUtils";

const App: Component = () => {
	const [showIntro, setShowIntro] = createSignal<boolean>(true);
	const [initOverlay, setInitOverlay] = createSignal<boolean>(false);

	let intervalId: number;
	let intro!: HTMLDivElement;

	onMount(() => {
		intervalId = setInterval(() => {
			const img = document.getElementById("animation-overlay") as HTMLImageElement;
			img.src = "/animations/eyes.gif" + "?seed=" + randInt(0, 999999);
			if (!initOverlay()) setInitOverlay(true);
		}, 60000);
	});

	onCleanup(() => {
		clearInterval(intervalId);
	});

	return (
		<>
			<Show when={showIntro()}>
				<div ref={intro} class='intro'>
					<Terminal onComplete={() => setShowIntro(false)} parent={intro} />
				</div>
			</Show>
			<InterfaceContextProvider>
				<img
					id='animation-overlay'
					class={initOverlay() ? "" : "animation-hidden"}
					src='/elements/blank.png'
					alt='eyes animation'
				/>
				<Header />
				<main>
					<Fields />
					<Attributes />
					<Tooltip />
				</main>
				<Footer />
			</InterfaceContextProvider>
			<ThreeContextProvider>
				<Lights />
				<Show when={character().scene.name}>
					<Character character={character()} />
				</Show>
			</ThreeContextProvider>
		</>
	);
};

export default App;
