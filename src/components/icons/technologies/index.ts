import iconAws from "./aws.svg?raw";
import iconDocker from "./docker.svg?raw";
import iconFigma from "./figma.svg?raw";
import iconPostgres from "./postgres.svg?raw";
import iconSqlite from "./sqlite.svg?raw";
import iconTerraform from "./terraform.svg?raw";

export const TechIconNames = ["aws", "docker", "figma", "postgres", "sqlite", "terraform"] as const;

export type TechIcons = (typeof TechIconNames)[number];

export const resolveTechIcon = (value: TechIcons) => {
	switch (value) {
		case "aws":
			return iconAws;
		case "docker":
			return iconDocker;
		case "figma":
			return iconFigma;
		case "postgres":
			return iconPostgres;
		case "sqlite":
			return iconSqlite;
		case "terraform":
			return iconTerraform;
	}
};
