# What is this folder?

This folder is not included in the final build files (like occurs with `/web-components/`).

We use web-components to load content in async with JS, but if the user haven't JS activated then we want to still provide a basic web page.
So, part of the content (the main part) is embedded directly in the HTML files, and not loaded with JS. This content is placed mostly here (like the NavBar, which is used across multiple pages and NEED to be loaded). Then we can include it using our builder script. Check `/scripts/bilder.js` for more info.