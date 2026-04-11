import { Component, createEffect, createMemo, createResource, onCleanup, onMount } from "solid-js";
import { Box3, Object3D, Vector3 } from "three";

import { useThree } from "providers/ThreeContextProvider";
import { useUI } from "providers/InterfaceContextProvider";
import { getIcon, iconSceneName } from "auxil/svgLoader";
import { LangIcons } from "components/icons/languages";
import { TechIcons } from "components/icons/technologies";

const Item: Component<{ hand: Object3D }> = (props) => {
	// context providers
	const { getTab, getTopic } = useUI();
	const { scene, clock } = useThree();

	// local state
	const [icon] = createResource(
		getTopic,
		async () => {
			if (getTab() === "tech" || getTab() === "lang") {
				return await getIcon(getTopic() as LangIcons | TechIcons);
			} else {
				const last = scene.getObjectByName(iconSceneName);
				if (last) {
					scene.remove(last);
				}
				return null;
			}
		},
		{ initialValue: null },
	);

	const bounds = createMemo(() => {
		if (!icon()) return { x: 0, y: 0, z: 0 };

		let boundingBox = new Box3().setFromObject(icon()!);
		let measure = new Vector3();

		boundingBox.getSize(measure);

		return { x: measure.x, y: measure.y, z: measure.z };
	});

	// none-state-y variables
	// note: this object is a child of aka's hand
	// icons are added to the word scene and this
	// objects' global posisition is copied to icon.
	// this is to avoid transform inheritance issues
	const empty: Object3D = new Object3D();

	/// side effects
	//

	// updates icon model based on tab and topic
	createEffect(() => {
		if (!icon()) return;

		const last = scene.getObjectByName(iconSceneName);

		if (last && last !== icon()) {
			scene.remove(last);
		}

		scene.add(icon()!);
	});

	// animates icon floating animation
	createEffect(() => {
		if (!icon()) return;

		const scalar = Math.sin(clock.time / 1000) * 0.2;

		empty.getWorldPosition(icon()!.position);
		icon()!.position.add({
			x: -(bounds().x / 1.5),
			y: 0.5 + scalar + bounds().y,
			z: 0.15,
		});
	});

	/// mount & cleanup
	//

	onMount(() => {
		props.hand.add(empty);
		empty.position.setZ(0);
		empty.position.setY(0);
	});

	onCleanup(() => {
		props.hand.remove(empty);

		const last = scene.getObjectByName(iconSceneName);
		if (last) {
			scene.remove(last);
		}
	});

	/// return
	//

	return <></>;
};

export default Item;
