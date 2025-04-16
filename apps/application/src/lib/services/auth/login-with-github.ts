import { goto } from "$app/navigation";

export default function loginWithGithub() {
	console.log("Login with GitHub");
	goto("/");
}
