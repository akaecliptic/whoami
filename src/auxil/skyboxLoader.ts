import { createResource } from "solid-js";
import { CubeTextureLoader, Texture } from "three";

/// core
//

const loader = new CubeTextureLoader();

const loadSkybox = async (): Promise<Texture> => {
	// note: this map is a oriented so the sun is behind aka
	const texture = await loader.loadAsync([
		"/skybox/stars_rt.jpg",
		"/skybox/stars_lf.jpg",
		"/skybox/stars_up.jpg",
		"/skybox/stars_dn.jpg",
		"/skybox/stars_ft.jpg",
		"/skybox/stars_bk.jpg",
	]);

	return texture;
};

const [skybox] = createResource<Texture>(loadSkybox, {
	initialValue: new Texture(),
});

export { skybox };
