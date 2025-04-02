const availableLanguages = ["en", "fr", "es", "it"];

function getCurrentLanguage() {
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split("/").filter(Boolean);

  if (availableLanguages.includes(pathSegments[0])) {
    return pathSegments[0];
  } else {
    return "pt";
  }
}
