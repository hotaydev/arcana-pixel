<script lang="ts">
	export let metadata;
	const keywords = ['Arcana Pixel', 'VTT', 'RPG platform', 'Blog', ...metadata.tags];
</script>

<svelte:head>
	<title>{metadata.title} | Arcana Pixel Blog</title>
	<meta name="description" content={metadata.description} />
	<meta name="keywords" content={keywords.join(', ')} />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:description" content={metadata.description} />
	<meta property="og:url" content={`https://www.arcanapixel.com/blog/post/${metadata.slug}`} />
</svelte:head>
