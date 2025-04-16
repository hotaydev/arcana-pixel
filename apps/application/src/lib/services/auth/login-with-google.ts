import { goto } from "$app/navigation";

export default function loginWithGoogle() {
	console.log("Login with Google");
	goto("/");
}
