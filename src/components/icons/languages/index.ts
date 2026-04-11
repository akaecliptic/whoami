import iconC from "./c.svg?raw";
import iconGo from "./go.svg?raw";
import iconJava from "./java.svg?raw";
import iconTypescript from "./typescript.svg?raw";
import iconZig from "./zig.svg?raw";

export const LangIconNames = ["java", "typescript", "c", "go", "zig"] as const;

export type LangIcons = (typeof LangIconNames)[number];

export const resolveLangIcon = (value: LangIcons) => {
	switch (value) {
		case "c":
			return iconC;
		case "go":
			return iconGo;
		case "java":
			return iconJava;
		case "typescript":
			return iconTypescript;
		case "zig":
			return iconZig;
	}
};
