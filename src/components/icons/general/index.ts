import iconLuna from "./luna.svg?raw";
import iconSol from "./sol.svg?raw";
import iconSwitch from "./switch.svg?raw";
import iconToggle from "./toggle.svg?raw";

export const GeneralIconNames = ["luna", "sol", "switch", "toggle"] as const;

export type GeneralIcons = (typeof GeneralIconNames)[number];

export const resolveGeneralIcon = (value: GeneralIcons) => {
	switch (value) {
		case "luna":
			return iconLuna;
		case "sol":
			return iconSol;
		case "switch":
			return iconSwitch;
		case "toggle":
			return iconToggle;
	}
};
