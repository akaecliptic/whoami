import { LangIconNames, LangIcons, resolveLangIcon } from "components/icons/languages";
import { resolveTechIcon, TechIconNames, TechIcons } from "components/icons/technologies";
import { createStore } from "solid-js/store";
import { Color, DoubleSide, ExtrudeGeometry, Group, Mesh, MeshBasicMaterial } from "three";
import { SVGLoader } from "three-stdlib";

/// types & auxils
//

type CachedIcon = { [key: string]: null | Group };

/// vars
//

const loader = new SVGLoader();
const base: CachedIcon = {};
const iconSceneName = "svg_icon";
const iconScale = 0.004;

// dynamically pre-populate base object with key names and null values
for (const key of [...LangIconNames, ...TechIconNames]) {
	base[key] = null;
}

/// core
//

const [store, setStore] = createStore({
	icons: { ...base },
});

// helper function to collapse the two resolve function to a single one
const resolveIcon = (name: TechIcons | LangIcons): string => {
	switch (name) {
		case "aws":
		case "docker":
		case "figma":
		case "postgres":
		case "sqlite":
		case "terraform":
			return resolveTechIcon(name);
		case "java":
		case "typescript":
		case "c":
		case "go":
		case "zig":
			return resolveLangIcon(name);
	}
};

// core logic fetches icon and converts string representation to Group
const getIcon = async (name: LangIcons | TechIcons): Promise<Group> => {
	let icon: Group | null = store.icons[name];

	// if the icon is hasn't previously been loaded, do that below
	if (icon === null) {
		const raw = resolveIcon(name);
		const data = await loader.parse(raw);
		const paths = data.paths;
		const group = new Group();

		// liberated from threejs docs
		const material = new MeshBasicMaterial({
			color: Color.NAMES.white,
			side: DoubleSide,
			depthWrite: true,
			depthTest: true,
		});

		for (let i = 0; i < paths.length; i++) {
			const path = paths[i];

			const shapes = SVGLoader.createShapes(path);
			for (let j = 0; j < shapes.length; j++) {
				const shape = shapes[j];
				const geometry = new ExtrudeGeometry(shape, {
					depth: 5,
					bevelEnabled: false,
				});
				const mesh = new Mesh(geometry, material);
				group.add(mesh);
			}
		}

		group.scale.setScalar(iconScale);
		group.rotateX(Math.PI);
		group.name = iconSceneName;

		// update store with processed icon for reuse later
		setStore("icons", (current) => ({
			...current,
			name: group,
		}));

		icon = group;
	}

	return icon;
};

export { getIcon, iconSceneName };
