// Available themes in the application
export const colorThemes = ["blue", "purple", "green", "red", "amber"] as const;
export const colorScheme = ["light", "dark"] as const;
export type ThemeType = (typeof colorThemes)[number];
export type SchemeType = (typeof colorScheme)[number];

export const defaultColorTheme: ThemeType = "blue";
export const defaultColorScheme: SchemeType = "dark";

/**
 * Set the application color theme
 * @param theme The theme to set ('blue' is default and doesn't need an attribute)
 */
export function setTheme({ theme, scheme }: { theme?: ThemeType; scheme?: SchemeType }): void {
	if (theme) {
		document.documentElement.setAttribute("data-color-theme", theme);
		localStorage.setItem("color-theme", theme);
	}
	if (scheme) {
		document.documentElement.setAttribute("data-theme", scheme);
		localStorage.setItem("color-scheme", scheme);
	}
}

/**
 * Get the current theme
 */
export function getCurrentTheme(): { theme: ThemeType; scheme: SchemeType } {
	const storedColorTheme = localStorage.getItem("color-theme") as ThemeType | null;
	const storedColorScheme = localStorage.getItem("color-scheme") as SchemeType | null;

	return {
		theme: storedColorTheme || defaultColorTheme,
		scheme: storedColorScheme || defaultColorScheme,
	};
}

/**
 * Initialize theme from stored preference
 * Should be called on app initialization
 */
export function initTheme(): void {
	if (typeof window === "undefined") return;

	const theme = getCurrentTheme();

	if (theme.scheme && colorScheme.includes(theme.scheme)) {
		setTheme({ scheme: theme.scheme });
	}

	if (theme.theme && colorThemes.includes(theme.theme)) {
		setTheme({ theme: theme.theme });
	}
}
