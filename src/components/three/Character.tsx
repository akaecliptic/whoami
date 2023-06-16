import { Component, Show, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { useThree } from "components/providers/ThreeContextProvider";
import { AnimationAction, AnimationClip, AnimationMixer, Object3D } from "three";
import { Model3D } from "resource/models";
import createBridge from "hooks/createUIBridge";
import Item from "components/three/Item";

export enum ANIMATION {
	// eslint-disable-next-line no-unused-vars
	STRETCH = "Stretch_3s",
	// eslint-disable-next-line no-unused-vars
	IDLE = "Idle_3s",
	// eslint-disable-next-line no-unused-vars
	SHOW = "Show_3s",
}

const Character: Component<{ character: Model3D }> = (props) => {
	const { scene, clock } = useThree();
	const { attribute } = createBridge();

	const [clips, setClips] = createSignal<AnimationClip[]>([]);
	const [activeAction, setActiveAction] = createSignal<AnimationAction>();
	const [activeClip, setActiveClip] = createSignal<AnimationClip>();
	const [hand, setHand] = createSignal<Object3D | null>(null);

	let mixer: AnimationMixer;

	onMount(() => {
		mixer = new AnimationMixer(props.character.scene);
		setClips(props.character.animations);

		const search = props.character.scene.children[0].getObjectByName("handR");
		setHand(search || null);

		scene.add(props.character.scene);
	});

	onCleanup(() => {
		scene.remove(props.character.scene);
	});

	createEffect(() => {
		if (!mixer) return;

		let name;

		if (attribute() === "technologies" || attribute() === "tools") {
			name = ANIMATION.SHOW;
		} else if (attribute() === "portfolio") {
			name = ANIMATION.STRETCH;
		}

		if (!name) return;

		const clip = AnimationClip.findByName(clips(), name);
		if (clip === activeClip()) return;

		setActiveClip(clip);
		const action = mixer.clipAction(clip);

		transitionAction(action, 0.15);
	});

	function transitionAction(action: AnimationAction, duration: number) {
		const previousAction = activeAction();
		setActiveAction(action);

		if (previousAction !== activeAction() && previousAction) {
			previousAction.fadeOut(duration);
		}

		if (!activeAction()) return;

		activeAction()!.reset().fadeIn(duration).play();
	}

	createEffect(() => {
		mixer.update(clock.deltaTime);
	});

	return (
		<Show when={hand() && attribute() !== "portfolio"}>
			<Item hand={hand()!} />
		</Show>
	);
};

export default Character;
