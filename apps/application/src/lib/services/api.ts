import { PUBLIC_API_URL } from "$env/static/public";

// The replace is used to avoid doubleslashes
export const SERVER_URL = `${PUBLIC_API_URL}/v1`.replaceAll("\/\/v1", "\/v1");
