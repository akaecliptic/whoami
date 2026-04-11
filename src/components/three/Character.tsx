import {
	Component,
	Show,
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
	onMount,
} from "solid-js";
import { useThree } from "providers/ThreeContextProvider";
import { AnimationAction, AnimationClip, AnimationMixer } from "three";
import { AKAModelV2 } from "auxil/characterLoader";
import { DevIcons } from "components/icons/developer";
import Item from "components/three/Item";
import { useUI } from "providers/InterfaceContextProvider";

type AnimationName = "idle_sit" | "idle_lounge" | DevIcons;

const Character: Component<{ character: AKAModelV2 }> = (props) => {
	// context providers
	const { getTab, getTopic, getOutfit } = useUI();
	const { scene, clock } = useThree();

	// local state
	const [activeAction, setActiveAction] = createSignal<AnimationAction>();
	const mixer = createMemo<AnimationMixer>(() => new AnimationMixer(props.character.scene));
	const activeClip = createMemo<AnimationClip | null>(() => {
		if (getTab() === "lang" || getTab() === "tech") {
			return getClip("idle_sit");
		} else if (getTab() === "work") {
			return getClip("idle_lounge");
		} else {
			switch (getTopic()) {
				case "art":
				case "bee":
				case "cinema":
				case "none":
				case "space":
				case "work":
					return getClip(getTopic() as AnimationName);
				default:
					return null;
			}
		}
	});

	/// functions
	//

	function getClip(anim: AnimationName): AnimationClip | null {
		return AnimationClip.findByName(props.character.animationClips, anim) || null;
	}

	function transitionAction(action: AnimationAction, duration: number) {
		const previousAction = activeAction();
		setActiveAction(action);

		if (previousAction !== activeAction() && previousAction) {
			previousAction.fadeOut(duration);
		}

		if (!activeAction()) return;

		activeAction()!.reset().fadeIn(duration).play();
	}

	/// side effects
	//

	// tranisitions animations
	createEffect(() => {
		if (!mixer() || !activeClip()) return;

		const action = mixer().clipAction(activeClip()!);

		transitionAction(action, 0.15);
	});

	// updates aka costumes and accessories appropriately
	createEffect(() => {
		const showTesseract = (name: string): boolean => {
			return (
				name === "m_tesseract" &&
				getTab() === "dev" &&
				(getTopic() === "cinema" || getTopic() === "art")
			);
		};

		const showOutfit = (name: string): boolean => {
			if (getTab() === "dev") {
				return name === `m_${getTopic()}`;
			} else {
				return name === `m_${getOutfit()}`;
			}
		};

		props.character.childObjects
			.filter((child) => child.name !== "m_aka" && child.name !== "m_body")
			.forEach((child) => {
				child.visible = showOutfit(child.name) || showTesseract(child.name);
			});
	});

	// ensures animations play
	createEffect(() => {
		mixer().update(clock.deltaTime);
	});

	/// mount & cleanup
	//

	onMount(() => {
		props.character.scene.position.set(0, -1, 0);
		scene.add(props.character.scene);
	});

	onCleanup(() => {
		scene.remove(props.character.scene);
	});

	/// return
	//

	return (
		<Show when={props.character.hand}>
			<Item hand={props.character.hand!} />
		</Show>
	);
};

export default Character;
