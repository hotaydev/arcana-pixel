<script lang="ts">
	import { GITHUB_LINK } from '$lib/variables';
	import { m } from '$lib/paraglide/messages.js';
	const lastUpdated = new Date('2025-04-23');
</script>

<svelte:head>
	<title>{m.license_page_title()}</title>
	<meta name="description" content={m.license_head_description()} />
	<meta name="keywords" content={m.license_head_keywords()} />
</svelte:head>

<div class="license-container">
	<div class="container">
		<h1>{m.license_main_title()}</h1>

		<div class="license-content">
			<section>
				<h2>{m.license_section_title()}</h2>
				<p>
					{m.license_intro_text()}
				</p>

				<ul>
					<li>{m.license_point_1()}</li>
					<li>{m.license_point_2()}</li>
					<li>{m.license_point_3()}</li>
					<li>{m.license_point_4()}</li>
				</ul>

				<p>
					{m.license_license_link_text()}
					<a href={`${GITHUB_LINK}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">
						{GITHUB_LINK}/blob/main/LICENSE
					</a>
				</p>
			</section>

			<section class="last-updated">
				<p>
					{m.last_updated()}: {lastUpdated.toLocaleDateString(undefined, {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</p>
			</section>
		</div>
	</div>
</div>

<style>
	.license-container {
		padding: 8rem 0 3rem;
		min-height: 80vh;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.license-content {
		background-color: var(--dark-surface);
		padding: 2rem;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	section {
		margin-bottom: 2rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: var(--light);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding-bottom: 0.3em;
	}

	p {
		margin-bottom: 1rem;
		line-height: 1.7;
		color: var(--gray);
	}

	a {
		color: var(--primary-light);
		text-decoration: none;
		transition: color 0.3s;
	}

	a:hover {
		text-decoration: underline;
	}

	ul {
		margin-bottom: 1rem;
		padding-left: 2rem;
		color: var(--gray);
	}

	li {
		margin-bottom: 0.5rem;
	}

	.last-updated {
		font-style: italic;
		text-align: right;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: 1.5rem;
		margin-top: 3rem;
	}

	@media (max-width: 768px) {
		.license-container {
			padding: 6rem 0 2rem;
		}

		.license-content {
			padding: 1.5rem;
		}
	}
</style>
