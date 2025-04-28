<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	const lastUpdated = new Date('2025-04-23');
</script>

<svelte:head>
	<title>{m.privacy_head_title()}</title>
	<meta name="description" content={m.privacy_head_description()} />
	<meta name="keywords" content={m.privacy_head_keywords()} />
</svelte:head>

<div class="privacy-container">
	<div class="container">
		<h1>{m.privacy_page_title()}</h1>

		<div class="privacy-content">
			<section>
				<h2>1. Introduction</h2>
				<p>
					At Arcana Pixel VTT ("we", "our", or "us"), we are committed to protecting your privacy.
					This Privacy Policy explains how we collect, use, disclose, and safeguard your information
					when you use our website, applications, and services (collectively, the "Services").
				</p>
				<p>
					Please read this Privacy Policy carefully. By accessing or using our Services, you
					acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
				</p>
			</section>

			<section>
				<h2>2. Information We Collect</h2>
				<p>We may collect the following types of information:</p>
				<h3>2.1 Personal Information</h3>
				<p>
					Personal Information is information that can be used to identify you individually, such
					as:
				</p>
				<ul>
					<li>Email address</li>
					<li>Username</li>
					<li>Profile information</li>
					<li>Account preferences</li>
				</ul>

				<h3>2.2 Usage Information</h3>
				<p>We may collect information about how you use our Services, including:</p>
				<ul>
					<li>Log data (such as IP address, browser type, pages visited)</li>
					<li>Device information (such as device ID, operating system)</li>
					<li>Game session data</li>
					<li>Feature usage statistics</li>
				</ul>
			</section>

			<section>
				<h2>3. How We Use Your Information</h2>
				<p>We may use the information we collect for the following purposes:</p>
				<ul>
					<li>Provide, maintain, and improve our Services</li>
					<li>Create and manage your account</li>
					<li>Process transactions</li>
					<li>
						Send administrative information, such as updates, security alerts, and support messages
					</li>
					<li>Respond to your comments, questions, and requests</li>
					<li>Analyze usage patterns and trends</li>
					<li>Develop new products, services, features, and functionality</li>
					<li>
						Prevent fraudulent transactions, monitor against theft, and protect against criminal
						activity
					</li>
					<li>For any other purpose with your consent</li>
				</ul>
			</section>

			<section>
				<h2>4. Sharing Your Information</h2>
				<p>We may share your information in the following situations:</p>
				<ul>
					<li>
						<strong>With Service Providers:</strong> We may share your information with third-party vendors,
						service providers, contractors, or agents who perform services for us or on our behalf.
					</li>
					<li>
						<strong>For Business Transfers:</strong> We may share or transfer your information in connection
						with, or during negotiations of, any merger, sale of company assets, financing, or acquisition
						of all or a portion of our business to another company.
					</li>
					<li>
						<strong>With Your Consent:</strong> We may disclose your personal information for any other
						purpose with your consent.
					</li>
					<li>
						<strong>With Other Users:</strong> When you share personal information or otherwise interact
						with public areas of the Services, such information may be viewed by all users and may be
						publicly distributed.
					</li>
					<li>
						<strong>Legal Requirements:</strong> We may disclose your information where required to do
						so by law or in response to valid requests by public authorities.
					</li>
				</ul>
			</section>

			<section>
				<h2>5. Data Security</h2>
				<p>
					We have implemented appropriate technical and organizational security measures designed to
					protect the security of any personal information we process. However, despite our
					safeguards, no security system is impenetrable, and we cannot guarantee the security of
					our systems. In the event that any information under our control is compromised as a
					result of a breach of security, we will take reasonable steps to investigate the situation
					and, where appropriate, notify those individuals whose information may have been
					compromised.
				</p>
			</section>

			<section>
				<h2>6. Data Retention</h2>
				<p>
					We will retain your personal information only for as long as is necessary for the purposes
					set out in this Privacy Policy. We will retain and use your information to the extent
					necessary to comply with our legal obligations, resolve disputes, and enforce our
					policies.
				</p>
			</section>

			<section>
				<h2>7. Your Privacy Rights</h2>
				<p>
					Depending on your location, you may have certain rights regarding your personal
					information, such as:
				</p>
				<ul>
					<li>The right to access personal information we hold about you</li>
					<li>The right to request correction of inaccurate personal information</li>
					<li>The right to request deletion of your personal information</li>
					<li>The right to object to processing of your personal information</li>
					<li>The right to data portability</li>
					<li>The right to withdraw consent</li>
				</ul>
				<p>To exercise these rights, please contact us at privacy@arcanapixel.com.</p>
			</section>

			<section>
				<h2>8. Children's Privacy</h2>
				<p>
					Our Services are not intended for use by children under the age of 13. We do not knowingly
					collect personal information from children under 13. If you are a parent or guardian and
					believe that your child has provided us with personal information, please contact us so
					that we can delete such information.
				</p>
			</section>

			<section>
				<h2>9. Changes to This Privacy Policy</h2>
				<p>
					We may update our Privacy Policy from time to time. We will notify you of any changes by
					posting the new Privacy Policy on this page and updating the "Last updated" date. You are
					advised to review this Privacy Policy periodically for any changes.
				</p>
			</section>

			<section>
				<h2>10. Contact Us</h2>
				<p>If you have any questions about this Privacy Policy, please contact us at:</p>
				<p><a href="mailto:privacy@arcanapixel.com">privacy@arcanapixel.com</a></p>
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
	.privacy-container {
		padding: 8rem 0 3rem;
		min-height: 80vh;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.privacy-content {
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

	h3 {
		font-size: 1.25rem;
		margin: 1.5rem 0 0.75rem;
		color: var(--light);
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

	strong {
		color: var(--light);
	}

	.last-updated {
		font-style: italic;
		text-align: right;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: 1.5rem;
		margin-top: 3rem;
	}

	@media (max-width: 768px) {
		.privacy-container {
			padding: 6rem 0 2rem;
		}

		.privacy-content {
			padding: 1.5rem;
		}
	}
</style>
