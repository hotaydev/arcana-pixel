// Available themes in the application
export const themes = ["blue", "purple", "green", "red", "amber"] as const;
export type ThemeType = (typeof themes)[number];

/**
 * Set the application color theme
 * @param theme The theme to set ('blue' is default and doesn't need an attribute)
 */
export function setTheme(theme: ThemeType): void {
	const root = document.documentElement;

	// Blue is the default theme, so we remove the attribute to use default CSS variables
	if (theme === "blue") {
		root.removeAttribute("data-color-theme");
	} else {
		root.setAttribute("data-color-theme", theme);
	}

	// Store the theme preference in localStorage
	localStorage.setItem("color-theme-preference", theme);
}

/**
 * Get the current theme
 */
export function getCurrentTheme(): ThemeType {
	const themeAttr = document.documentElement.getAttribute("data-color-theme");

	// If no attribute is set, the theme is blue (default)
	return (themeAttr as ThemeType) || "blue";
}

/**
 * Initialize theme from stored preference
 * Should be called on app initialization
 */
export function initTheme(): void {
	if (typeof window === "undefined") return;

	const storedTheme = localStorage.getItem("color-theme-preference") as ThemeType | null;

	if (storedTheme && themes.includes(storedTheme as ThemeType)) {
		setTheme(storedTheme);
	}
}
