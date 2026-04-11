import iconBlacktones from "./blacktones.svg?raw";
import iconMarathonmoments from "./marathonmoments.svg?raw";
import iconPicat from "./picat.svg?raw";
import iconWhoami from "./whoami.svg?raw";

export const WorkIconNames = ["blacktones", "marathonmoments", "picat", "whoami"] as const;

export type WorkIcons = (typeof WorkIconNames)[number];

export const resolveWorkIcon = (value: WorkIcons) => {
	switch (value) {
		case "blacktones":
			return iconBlacktones;
		case "marathonmoments":
			return iconMarathonmoments;
		case "picat":
			return iconPicat;
		case "whoami":
			return iconWhoami;
	}
};
