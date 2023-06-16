import { Component, createEffect, onCleanup, onMount } from "solid-js";
import { NearestFilter, Object3D, Sprite, SpriteMaterial, Texture } from "three";

import { useThree } from "components/providers/ThreeContextProvider";
import createBridge from "hooks/createUIBridge";
import { logoMap } from "resource/texture";
import { logos } from "resource/models";

export type PropItem = {
	hand: Object3D;
};

const Item: Component<PropItem> = (props) => {
	const { scene, clock } = useThree();
	const { spec, field } = createBridge();

	const empty: Object3D = new Object3D();
	let logo: Object3D | undefined;

	const getSprite = (field: string): void => {
		let texture: Texture | undefined;

		switch (field) {
			case "ClipStudioPaint":
				texture = logoMap.get("clip")!;
				break;
			case "Blender":
				texture = logoMap.get("blender")!;
				break;
			case "Flash":
				texture = logoMap.get("flash")!;
				break;
			case "Figma":
				texture = logoMap.get("figma")!;
				break;
		}

		if (!texture) return;

		texture.minFilter = texture.magFilter = NearestFilter;

		const material = new SpriteMaterial({
			map: texture,
			alphaTest: 0.1,
		});

		if (logo) scene.remove(logo);

		logo = new Sprite(material);

		logo.scale.set(0.35, 0.35, 1);
	};

	const getMesh = (field: string): void => {
		let item: Object3D | undefined;

		switch (field) {
			case "Java":
				item = logos().get("java");
				break;
			case "TypeScript":
				item = logos().get("typescript");
				break;
			case "SQL":
				item = logos().get("sql");
				break;
			case "More":
				item = logos().get("more");
				break;
		}

		if (!item) return;

		if (logo) scene.remove(logo);

		logo = item;

		logo.scale.set(0.35, 0.35, 0.35);
	};

	onMount(() => {
		props.hand.add(empty);
		empty.position.setX(-0.5);
		empty.position.setY(0.2);
	});

	onCleanup(() => {
		props.hand.remove(empty);
		if (logo) scene.remove(logo);
	});

	createEffect(() => {
		if (spec() === "dev") {
			getMesh(field());
		} else if (spec() === "art") {
			getSprite(field());
		} else {
			return;
		}

		if (!logo) return;

		scene.add(logo);
	});

	createEffect(() => {
		if (!logo) return;

		const scalar = Math.sin(clock.time / 1000) * 0.9;

		empty.getWorldPosition(logo.position);
		logo.position.set(-0.35, 2 + scalar * 0.15, 1.2);
	});

	return <></>;
};

export default Item;
