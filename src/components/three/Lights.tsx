import { Component, onCleanup, onMount } from "solid-js";

import { AmbientLight, Color, PointLight } from "three";

import { useThree } from "components/providers/ThreeContextProvider";

const Lights: Component<{}> = () => {
	const { scene } = useThree();

	const ambient = new AmbientLight(Color.NAMES.white, 2);
	const pointred = new PointLight(Color.NAMES.red, 0.25);
	const pointblue = new PointLight(Color.NAMES.blue, 0.25);

	onMount(() => {
		pointred.position.set(5, 0, 0);
		pointblue.position.set(-5, 0, 0);

		scene.add(ambient);
		scene.add(pointred);
		scene.add(pointblue);
	});

	onCleanup(() => {
		scene.remove(ambient);
		scene.remove(pointred);
		scene.remove(pointblue);
	});

	return <></>;
};

export default Lights;
