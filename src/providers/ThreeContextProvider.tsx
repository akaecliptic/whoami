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
import { EffectComposer, OrbitControls, OutlinePass } from "three-stdlib";
import { RenderPixelatedPass } from "three-stdlib";
import { skybox } from "auxil/skyboxLoader";
import { data } from "auxil/characterLoader";

/// types
//

type ThreeClock = {
	deltaTime: number;
	time: number;
};

export type ThreeContext = {
	scene: Scene;
	camera: Camera;
	clock: ThreeClock;
};

/// public interface
//

const Context = createContext<ThreeContext | null>(null);

export const useThree = () => {
	const context = useContext(Context);

	if (!context) throw new Error("useThree must be used inside ThreeContextProvider");

	return context;
};

/// component
//

const ThreeContextProvider: ParentComponent = (props) => {
	// context state
	const [clock, setClock] = createStore<ThreeClock>({ deltaTime: 0, time: 0 });

	// consts & vars
	const aspect = window.innerWidth / window.innerHeight;
	const scene: Scene = new Scene();
	const camera = new PerspectiveCamera(45, aspect);

	// note: i might make these into signals, will monitor behaviour
	let renderer: WebGLRenderer;
	let composer: EffectComposer;
	let controls: OrbitControls;

	/// initialisation functions
	//

	const init = (canvas: HTMLCanvasElement) => {
		camera.position.z = 10;

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
		controls.enableZoom = true;

		controls.minDistance = 7;
		controls.maxDistance = 12;

		controls.enableDamping = true;
		controls.dampingFactor = 0.05;

		controls.autoRotate = false;

		// look horizontal - range [- 2 PI, 2 PI]
		controls.maxAzimuthAngle = Math.PI * 0.4;
		controls.minAzimuthAngle = -Math.PI * 0.4;

		controls.maxPolarAngle = Math.PI * 0.8; // look from down - Math.PI max
		controls.minPolarAngle = Math.PI * 0.2; // look from above - 0 min
	};

	const initRenderPass = () => {
		const pixel = new RenderPixelatedPass(
			new Vector2(window.innerWidth, window.innerHeight),
			2,
			scene,
			camera,
			{ depthEdgeStrength: 0, normalEdgeStrength: 0 },
		);

		composer.addPass(pixel);
	};

	/// functions
	//

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

	/// side effects
	//

	// assigns skybox to background once loaded
	createEffect(() => {
		if (skybox.state === "ready" && skybox()) {
			scene.background = skybox();
		}
	});

	// adds aka to outline pass once loaded into scene
	createEffect(() => {
		if (data.state === "ready" && data()) {
			const outline = new OutlinePass(new Vector2(), scene, camera, [data().scene]);
			composer?.addPass(outline);
		}
	});

	/// mount & cleanup
	//

	onMount(() => {
		const canvas = document.getElementById("three_render_target") as HTMLCanvasElement;

		init(canvas);
		initControls(canvas);
		initRenderPass();

		if (!clock.time) animate();
	});

	onCleanup(() => {
		renderer?.dispose();
	});

	/// return
	//

	return (
		<Context.Provider value={{ scene, camera, clock }}>
			{props.children}
			<canvas id='three_render_target' />
		</Context.Provider>
	);
};

export default ThreeContextProvider;
