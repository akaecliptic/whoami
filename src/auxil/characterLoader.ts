import { createResource } from "solid-js";
import { AnimationClip, Object3D } from "three";
import { GLTF, GLTFLoader } from "three-stdlib";

/// types & auxils
//

export type AKAModelV2 = {
	scene: Object3D;
	childObjects: Object3D[];
	childNames: string[];
	animationClips: AnimationClip[];
	animationNames: string[];
	hand?: Object3D;
};

const blankModel: AKAModelV2 = {
	scene: new Object3D(),
	childObjects: [],
	childNames: [],
	animationClips: [],
	animationNames: [],
	hand: new Object3D(),
} as const;

/// vars
//

const loader: GLTFLoader = new GLTFLoader();
const characterSceneName = "character";

/// core
//

const loadModelData = async (): Promise<AKAModelV2> => {
	const gltf: GLTF = await loader.loadAsync("/models/aka_v2.glb");

	// note: i only care about a few objects here, and i expect them to
	// be arranged like so:
	//
	// scene
	// 	> tesseract
	// 	> m_aka
	// 		> m_body
	// 		> m_<outfit>
	// 		> armature
	//			...
	//				> handL
	//

	if (!gltf.scene) {
		return blankModel;
	}

	const scene = gltf.scene;
	const anims = gltf.animations;
	const children = [];

	const tesseract = scene.getObjectByName("m_tesseract");
	const aka = scene.getObjectByName("m_aka");
	const hand = scene.getObjectByName("HandL");

	if (!aka || !aka.children || !tesseract) {
		return blankModel;
	}

	scene.name = characterSceneName;
	children.push(tesseract, aka);
	aka.children.forEach((child) => {
		if (child.name.startsWith("m_")) {
			children.push(child);
		}
	});

	const model: AKAModelV2 = {
		childObjects: children,
		childNames: children.map((child) => child.name),
		scene: gltf.scene,
		animationClips: anims,
		animationNames: anims.map((anim) => anim.name),
		hand: hand,
	};

	return model;
};

const [data] = createResource<AKAModelV2>(loadModelData, {
	initialValue: blankModel,
});

export { data };
