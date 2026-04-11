import { Component, onCleanup, onMount } from "solid-js";

import { AmbientLight, Color } from "three";

import { useThree } from "providers/ThreeContextProvider";

const Lights: Component = () => {
	const { scene } = useThree();

	const ambient = new AmbientLight(Color.NAMES.white, 3);

	onMount(() => {
		scene.add(ambient);
	});

	onCleanup(() => {
		scene.remove(ambient);
	});

	return <></>;
};

export default Lights;
