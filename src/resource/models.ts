import { createResource } from "solid-js";
import { AnimationClip, Object3D } from "three";
import { GLTF, GLTFLoader } from "three-stdlib";
import type { Logo } from "types/interface";

export type Model3D = {
	scene: Object3D;
	animations: AnimationClip[];
};

const loader: GLTFLoader = new GLTFLoader();

const loadCharacter = async (): Promise<Model3D> => {
	const gltf: GLTF = await loader.loadAsync("/models/aka.glb");
	const resource: Model3D = {
		scene: gltf.scene || new Object3D(),
		animations: gltf.animations || [],
	};
	return resource;
};

const [character] = createResource<Model3D>(loadCharacter, {
	initialValue: { scene: new Object3D(), animations: [] },
});

const loadLogos = async (): Promise<Map<Logo, Object3D>> => {
	const gltf: GLTF = await loader.loadAsync("/models/logos.glb");
	const children: [Logo, Object3D][] = gltf.scene.children.map((child) => [
		child.name.toLowerCase() as Logo,
		child,
	]);
	const map: Map<Logo, Object3D> = new Map(children);
	return map;
};

export const [logos] = createResource<Map<Logo, Object3D>>(loadLogos, {
	initialValue: new Map(),
});

export default character;
