import { writable } from "svelte/store";

export const showWiki = writable(false);

export const toggleWiki = () => {
	showWiki.update((value) => !value);
};
