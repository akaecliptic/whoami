export const getDevTooltips = (field: string): string => {
	switch (field) {
		case "java":
			return "The developer has been working with Java for just over 5 years, both professionally and personally. Familiarity is key to productivity, and this domain is their comfort.";
		case "typescript":
			return "Their second most used language, with almost 4 years of experience in personal projects. If it is built for the web, they built it with TypeScript.";
		case "sql":
			return "For data persistence, a relation database is the developer's first and final choice. Working with dialects like SQLite for small projects and PostgreSQL for anything that needs more power.";
		case "more":
			return "To understand is the ultimate goal. The developer is always eager to learn new skills. Adjacent to the tools in their arsenal, they delve in NextJS, SolidJS and C-style languages. ";
		case "cinephile":
			return "The developer watches a lot of movies, too many movies some might say... To keep track of the ever-growing list, the developer sought a simple android app.";
		case "akaecliptic.dev":
			return "Forever a star gazer, the developer imagined something that could mimic the wonders of space, and bring it closer within their grasps.";
		default:
			return "";
	}
};

export const getArtistTooltips = (field: string): string => {
	switch (field) {
		case "clipstudiopaint":
			return "For 2D work, Clip Studio Paint is the artist's weapon of choice.";
		case "blender":
			return "For a better perspective of dimension, space and form, the artist utilises Blender. From models to sculpts, animations to video editing. The versatility of Blender suits them well. ";
		case "flash":
			return "To distil the art of animation to its purest form, the artist can think of no better tool than Macromedia's Flash. It has served them well for many years, and for many more to come.";
		case "figma":
			return "When it comes to mocking UI, Figma is an easy choice.";
		case "this.site":
			return "At the ready, you find yourself interacting with an expression of the artist. Welcome, enjoy your stay.";
		case "akaecliptic.dev":
			return "Aesthetics a core concept, akaecliptic is the culmination of the artist's many interests. A creative and technical endeavour.";
		default:
			return "";
	}
};
