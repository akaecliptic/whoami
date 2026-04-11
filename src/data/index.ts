import { type LangIcons } from "components/icons/languages";

import dataJava from "./lang/java.json";
import dataGo from "./lang/go.json";
import dataC from "./lang/c.json";
import dataTypescript from "./lang/typescript.json";
import dataZig from "./lang/zig.json";

import { type TechIcons } from "components/icons/technologies";

import dataAWS from "./tech/aws.json";
import dataDocker from "./tech/docker.json";
import dataPostgres from "./tech/postgres.json";
import dataTerraform from "./tech/terraform.json";
import dataFigma from "./tech/figma.json";
import dataSqlite from "./tech/sqlite.json";

import { type WorkIcons } from "components/icons/projects";

import dataBlacktones from "./work/blacktones.json";
import dataPicat from "./work/picat.json";
import dataWhoami from "./work/whoami.json";
import dataMarathonmoments from "./work/marathonmoments.json";

import { type DevIcons } from "components/icons/developer";

import dataArt from "./dev/art.json";
import dataBee from "./dev/bee.json";
import dataCinema from "./dev/cinema.json";
import dataNone from "./dev/none.json";
import dataSpace from "./dev/space.json";
import dataWork from "./dev/work.json";
import { Topics } from "providers/InterfaceContextProvider";

export type ExperienceRange = 1 | 2 | 3 | 4 | 5;

export type LangData = {
	description: string;
	experience: ExperienceRange;
	domains: string[];
};

export const resolveLangData = (lang: LangIcons): LangData => {
	let data: unknown;

	switch (lang) {
		case "java":
			data = dataJava;
			break;
		case "typescript":
			data = dataTypescript;
			break;
		case "go":
			data = dataGo;
			break;
		case "c":
			data = dataC;
			break;
		case "zig":
			data = dataZig;
			break;
	}

	return data as LangData;
};

export type TechData = {
	description: string;
};

export const resolveTechData = (tech: TechIcons): TechData => {
	let data: unknown;

	switch (tech) {
		case "aws":
			data = dataAWS;
			break;
		case "docker":
			data = dataDocker;
			break;
		case "postgres":
			data = dataPostgres;
			break;
		case "terraform":
			data = dataTerraform;
			break;
		case "figma":
			data = dataFigma;
			break;
		case "sqlite":
			data = dataSqlite;
			break;
	}

	return data as TechData;
};

export type WorkData = {
	description: string;
	tech: string[];
	link: string;
	text: string;
};

export const resolveWorkData = (work: WorkIcons): WorkData => {
	let data: unknown;

	switch (work) {
		case "blacktones":
			data = dataBlacktones;
			break;
		case "marathonmoments":
			data = dataMarathonmoments;
			break;
		case "picat":
			data = dataPicat;
			break;
		case "whoami":
			data = dataWhoami;
			break;
	}

	return data as WorkData;
};

export type DevData = {
	description: string;
	flavour: string;
};

export const resolveDevData = (dev: DevIcons): DevData => {
	let data: unknown;

	switch (dev) {
		case "none":
			data = dataNone;
			break;
		case "art":
			data = dataArt;
			break;
		case "bee":
			data = dataBee;
			break;
		case "cinema":
			data = dataCinema;
			break;
		case "space":
			data = dataSpace;
			break;
		case "work":
			data = dataWork;
			break;
	}

	return data as DevData;
};

export const resolveData = (topic: Topics): LangData | TechData | WorkData | DevData => {
	let data: any;

	switch (topic) {
		case "java":
		case "c":
		case "typescript":
		case "zig":
		case "go":
			data = resolveLangData(topic as LangIcons);
			break;
		case "figma":
		case "aws":
		case "docker":
		case "postgres":
		case "sqlite":
		case "terraform":
			data = resolveTechData(topic as TechIcons);
			break;
		case "blacktones":
		case "marathonmoments":
		case "picat":
		case "whoami":
			data = resolveWorkData(topic as WorkIcons);
			break;
		case "none":
		case "art":
		case "bee":
		case "cinema":
		case "space":
		case "work":
			data = resolveDevData(topic as DevIcons);
			break;
	}

	return data;
};
