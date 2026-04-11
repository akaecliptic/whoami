import iconArt from "./art.svg?raw";
import iconBee from "./bee.svg?raw";
import iconCinema from "./cinema.svg?raw";
import iconNone from "./none.svg?raw";
import iconSpace from "./space.svg?raw";
import iconWork from "./work.svg?raw";

export const DevIconNames = ["none", "art", "bee", "cinema", "space", "work"] as const;

export type DevIcons = (typeof DevIconNames)[number];

export const resolveDevIcon = (value: DevIcons) => {
	switch (value) {
		case "art":
			return iconArt;
		case "bee":
			return iconBee;
		case "cinema":
			return iconCinema;
		case "none":
			return iconNone;
		case "space":
			return iconSpace;
		case "work":
			return iconWork;
	}
};
