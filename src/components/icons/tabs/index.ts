import iconDev from "./dev.svg?raw";
import iconLang from "./lang.svg?raw";
import iconTech from "./tech.svg?raw";
import iconWork from "./work.svg?raw";

export const TabIconNames = ["lang", "tech", "work", "dev"] as const;

export type TabIcons = (typeof TabIconNames)[number];

export const resolveTabIcon = (value: TabIcons) => {
	switch (value) {
		case "dev":
			return iconDev;
		case "lang":
			return iconLang;
		case "tech":
			return iconTech;
		case "work":
			return iconWork;
	}
};
