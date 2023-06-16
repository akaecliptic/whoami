import { ShaderMaterialParameters, TextureLoader } from "three";

const textureLoader = new TextureLoader();
const texture = textureLoader.load("/textures/noise.jpg");

// https://discourse.threejs.org/t/how-to-make-screen-space-projection-moved-texture/31979
// https://discourse.threejs.org/t/getting-screen-coords-in-shadermaterial-shaders/23783/2

export const fragmentShader = `
	uniform sampler2D map;
	uniform float time;
	
	varying vec4 vPos;
	
	void main() {
		vec2 coords = vPos.xy;
		vec2 scalar = vec2(time, time * 2.0);

		coords /= vPos.w;
		coords += 0.5;

		vec4 texelColor = texture2D( map, coords + scalar );
		gl_FragColor = texelColor;
  	}
`;

export const vertexShader = `
	varying vec4 vPos;

	void main() {
		vPos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		gl_Position = vPos;
	}
`;

export const uniforms: ShaderMaterialParameters["uniforms"] = {
	time: { value: 1.0 },
	map: { value: texture },
};
