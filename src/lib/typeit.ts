import TypeIt from "typeit";
import { El, Options } from "typeit/dist/types";

// https://www.typescriptlang.org/docs/handbook/2/functions.html#construct-signatures

type TypeItInstantiator = {
	new (element: El | string, options: Options): any;
};

const TypeWritter = TypeIt as any as TypeItInstantiator;

export default TypeWritter;
