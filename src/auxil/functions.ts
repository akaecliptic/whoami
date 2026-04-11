import { type TabIcons } from "components/icons/tabs";

// resolves label display name from internal tab name
export const resolveLabel = (name: TabIcons): string => {
	let label = "_";

	switch (name) {
		case "lang":
			label += "langauges";
			break;
		case "tech":
			label += "technologies";
			break;
		case "work":
			label += "projects";
			break;
		case "dev":
			label += "developer";
			break;
	}

	return label;
};
