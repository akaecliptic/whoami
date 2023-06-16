import createBridge from "hooks/createUIBridge";
import { textureArt, textureDev } from "resource/texture";
import {
	ParentComponent,
	createContext,
	createEffect,
	onCleanup,
	onMount,
	useContext,
} from "solid-js";
import { createStore } from "solid-js/store";

import { WebGLRenderer, PerspectiveCamera, Scene, Camera, Vector2 } from "three";
import { EffectComposer, OrbitControls } from "three-stdlib";
import { RenderPixelatedPass } from "three-stdlib/postprocessing/RenderPixelatedPass";

import { ThreeClock } from "types/three";

export type ThreeContext = {
	scene: Scene;
	camera: Camera;
	clock: ThreeClock;
};

export const useThree = () => {
	const context = useContext(Context);

	if (!context) throw new Error("useThree must be used inside ThreeContextProvider");

	return context;
};

const Context = createContext<ThreeContext | null>(null);

const ThreeContextProvider: ParentComponent = (props) => {
	const DISTANCE = 5;

	const [clock, setClock] = createStore<ThreeClock>({ deltaTime: 0, time: 0 });
	const { spec } = createBridge();

	const aspect = window.innerWidth / window.innerHeight;
	const scene: Scene = new Scene();
	const camera = new PerspectiveCamera(45, aspect);

	let renderer: WebGLRenderer;
	let composer: EffectComposer;
	let controls: OrbitControls;

	const init = (canvas: HTMLCanvasElement) => {
		camera.position.setScalar(DISTANCE);
		camera.position.z = 50;

		renderer = new WebGLRenderer({ canvas: canvas });
		renderer.setSize(window.innerWidth, window.innerHeight);

		composer = new EffectComposer(renderer);

		window.addEventListener("resize", () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			composer.setSize(window.innerWidth, window.innerHeight);

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		});
	};

	const initControls = (canvas: HTMLCanvasElement) => {
		controls = new OrbitControls(camera, canvas);

		controls.enablePan = false;
		controls.enableZoom = false;

		controls.minDistance = 2;
		controls.maxDistance = 10;

		controls.enableDamping = true;
		controls.dampingFactor = 0.05;

		controls.autoRotate = true;
		controls.autoRotateSpeed = 0.5;
	};

	const initRenderPass = () => {
		/*
			!RANT!

			As of right now the types for RenderPixelatedPass is banjaxed.
			The type definitions for the constructor do not match the implementation.

			I have submitted a pull request to fix this. 
			Until it is approved and merged, this is how I will get around this.

			A resolution parameter (the first argument) is missing, so the arguments are shifted over by one to the left.
			The constructor only does simple assignment, so luckily, manually assigning the fields after instantiating seems to work.

			!RANT!

			This is a non-issue, it just slightly upset me...
			2023/06/07
		*/
		const pixel = new RenderPixelatedPass(40, scene, camera);

		pixel.camera = camera;
		pixel.resolution = new Vector2(window.innerWidth, window.innerHeight);
		pixel.scene = scene;
		pixel.pixelSize = 2;

		pixel.normalEdgeStrength = 1;
		pixel.depthEdgeStrength = 1;

		composer.addPass(pixel);
	};

	const animate = (timestamp: number = 0) => {
		requestAnimationFrame(animate);

		if (!clock.time) {
			setClock("time", timestamp);
			return;
		}

		setClock("deltaTime", (timestamp - clock.time) / 1000);
		setClock("time", timestamp);

		controls.update();
		composer.render();
	};

	onMount(() => {
		const canvas = document.getElementById("render-target") as HTMLCanvasElement;

		init(canvas);
		initControls(canvas);
		initRenderPass();

		if (!clock.time) animate();
	});

	onCleanup(() => {
		renderer.dispose();
	});

	createEffect(() => {
		scene.background = spec() === "dev" ? textureDev : textureArt;
	});

	return (
		<Context.Provider value={{ scene, camera, clock }}>
			{props.children}
			<canvas id='render-target' />
		</Context.Provider>
	);
};

export default ThreeContextProvider;
