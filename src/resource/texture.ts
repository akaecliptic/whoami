import { CubeTextureLoader, Texture, TextureLoader } from "three";
import { Logo } from "types/interface";

const textLoader = new TextureLoader();
const cubeLoader = new CubeTextureLoader();

export const textureDev = textLoader.load("/textures/dev.png");
export const textureArt = cubeLoader
	.setPath("/textures/cubemap/")
	.load(["right.png", "left.png", "top.png", "bottom.png", "front.png", "back.png"]);

export const logoMap: Map<Logo, Texture> = new Map([
	["blender", textLoader.load("/logos/blender.png")],
	["figma", textLoader.load("/logos/figma.png")],
	["flash", textLoader.load("/logos/flash.png")],
	["clip", textLoader.load("/logos/clip.png")],
]);
