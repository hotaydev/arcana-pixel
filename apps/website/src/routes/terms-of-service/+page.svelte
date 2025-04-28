<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	const lastUpdated = new Date('2025-04-23');
</script>

<svelte:head>
	<title>{m.tos_head_title()}</title>
	<meta name="description" content={m.tos_head_description()} />
	<meta name="keywords" content={m.tos_head_keywords()} />
</svelte:head>

<div class="terms-container">
	<div class="container">
		<h1>{m.tos_title()}</h1>

		<div class="terms-content">
			<section>
				<h2>1. Introduction</h2>
				<p>
					Welcome to Arcana Pixel VTT ("we", "our", or "us"). By accessing or using our services,
					website, and applications (collectively, the "Services"), you agree to be bound by these
					Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our
					Services.
				</p>
			</section>

			<section>
				<h2>2. Acceptance of Terms</h2>
				<p>
					By accessing or using our Services, you acknowledge that you have read, understood, and
					agree to be bound by these Terms, as well as our Privacy Policy, which is incorporated
					herein by reference.
				</p>
			</section>

			<section>
				<h2>3. Services Description</h2>
				<p>
					Arcana Pixel VTT is an open-source virtual tabletop platform designed for tabletop
					role-playing games. Our Services include, but are not limited to, providing tools for game
					masters and players to conduct tabletop role-playing game sessions online.
				</p>
			</section>

			<section>
				<h2>4. User Accounts</h2>
				<p>
					To access certain features of our Services, you may be required to create an account. You
					are responsible for maintaining the confidentiality of your account information, including
					your password, and for all activity that occurs under your account. You agree to notify us
					immediately of any unauthorized use of your account.
				</p>
			</section>

			<section>
				<h2>5. User Content</h2>
				<p>
					Users may create, upload, or share content ("User Content") through our Services. You
					retain ownership of your User Content, but grant us a worldwide, non-exclusive,
					royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute
					your User Content for the purpose of providing and improving our Services.
				</p>
				<p>
					You represent and warrant that your User Content does not violate any third-party rights,
					including copyright, trademark, privacy, publicity, or other personal or proprietary
					rights, and does not contain libelous or otherwise unlawful material.
				</p>
			</section>

			<section>
				<h2>6. Prohibited Conduct</h2>
				<p>When using our Services, you agree not to:</p>
				<ul>
					<li>Violate any applicable law or regulation</li>
					<li>Infringe upon the rights of others</li>
					<li>Use our Services for any illegal or unauthorized purpose</li>
					<li>Interfere with or disrupt our Services or servers</li>
					<li>Attempt to gain unauthorized access to our Services or systems</li>
					<li>Harass, threaten, or intimidate other users</li>
					<li>Post content that is offensive, discriminatory, or inappropriate</li>
				</ul>
			</section>

			<section>
				<h2>7. Intellectual Property Rights</h2>
				<p>
					All intellectual property rights in and to our Services, including but not limited to
					software, designs, logos, text, images, audio, and video materials (excluding User
					Content), are owned by us or our licensors.
				</p>
				<p>
					Arcana Pixel VTT is open-source software, and its source code is available under the
					license specified in our repository. However, our trademarks, service marks, and logos
					used in connection with our Services are not licensed under the open-source license and
					may not be used without our prior written consent.
				</p>
			</section>

			<section>
				<h2>8. Termination</h2>
				<p>
					We reserve the right to terminate or suspend your access to our Services immediately,
					without prior notice or liability, for any reason whatsoever, including without limitation
					if you breach these Terms.
				</p>
			</section>

			<section>
				<h2>9. Disclaimers</h2>
				<p>
					OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE EXPRESSLY DISCLAIM
					ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
					IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
					NON-INFRINGEMENT.
				</p>
				<p>
					WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE,
					OR THAT ANY DEFECTS IN OUR SERVICES WILL BE CORRECTED.
				</p>
			</section>

			<section>
				<h2>10. Limitation of Liability</h2>
				<p>
					IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
					PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR
					OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR
					USE OUR SERVICES.
				</p>
			</section>

			<section>
				<h2>11. Changes to Terms</h2>
				<p>
					We reserve the right to modify or replace these Terms at any time. If a revision is
					material, we will provide at least 30 days' notice prior to any new terms taking effect.
					What constitutes a material change will be determined at our sole discretion.
				</p>
			</section>

			<section>
				<h2>12. Governing Law</h2>
				<p>
					These Terms shall be governed by and construed in accordance with the laws of
					[Jurisdiction], without regard to its conflict of law provisions.
				</p>
			</section>

			<section>
				<h2>13. Contact Information</h2>
				<p>
					If you have any questions about these Terms, please contact us at legal@arcanapixel.com.
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
	.terms-container {
		padding: 8rem 0 3rem;
		min-height: 80vh;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.terms-content {
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
		.terms-container {
			padding: 6rem 0 2rem;
		}

		.terms-content {
			padding: 1.5rem;
		}
	}
</style>
