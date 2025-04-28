<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	const lastUpdated = new Date('2025-04-23');
</script>

<svelte:head>
	<title>{m.coc_page_title()}</title>
	<meta name="description" content={m.coc_head_description()} />
	<meta name="keywords" content={m.coc_head_keywords()} />
</svelte:head>

<div class="conduct-container">
	<div class="container">
		<h1>{m.coc_main_title()}</h1>

		<div class="conduct-content">
			<section>
				<h2>{m.coc_section_title()}</h2>
				<p>
					{m.coc_intro_text()}
				</p>

				<ul>
					<li>{m.coc_point_1()}</li>
					<li>{m.coc_point_2()}</li>
					<li>{m.coc_point_3()}</li>
					<li>{m.coc_point_4()}</li>
					<li>{m.coc_point_5()}</li>
				</ul>

				<p>
					{m.coc_covenant_link_text()}
					<a
						href="https://www.contributor-covenant.org/version/2/0/code_of_conduct/"
						target="_blank"
						rel="noopener noreferrer"
						>https://www.contributor-covenant.org/version/2/0/code_of_conduct/</a
					>
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
	.conduct-container {
		padding: 8rem 0 3rem;
		min-height: 80vh;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.conduct-content {
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
		color: var(--primary);
		text-decoration: none;
		transition: color 0.3s;
	}

	a:hover {
		color: var(--primary-light);
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
		.conduct-container {
			padding: 6rem 0 2rem;
		}

		.conduct-content {
			padding: 1.5rem;
		}
	}
</style>
