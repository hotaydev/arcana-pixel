<script lang="ts">
	// Message types
	type MessageType = "dm" | "player" | "system";
	type RollType = "success" | "failure" | "critical" | "damage" | "normal";

	interface Roll {
		title: string;
		result: number;
		detail: string;
		type: RollType;
		criticalTag?: boolean;
	}

	interface Message {
		id: number;
		sender: string;
		senderType: MessageType;
		text?: string;
		rolls?: Roll[];
		timestamp: string; // ISO string format
	}

	// Format time like in my-card component
	function formatMessageTime(timestamp: string) {
		const date = new Date(timestamp);
		const now = new Date();
		const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
		const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;
		const timeString = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

		if (date.getTime() >= todayStart) {
			return `Hoje, ${timeString}`;
		} else if (date.getTime() >= yesterdayStart) {
			return `Ontem, ${timeString}`;
		} else {
			return `${date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}, ${timeString}`;
		}
	}

	// Mock messages data
	let messages = $state<Message[]>([
		{
			id: 1,
			sender: "Mestre",
			senderType: "dm",
			text: "Bem-vindos à Floresta Sombria. Vocês se encontram em uma clareira, os sons de criaturas misteriosas ecoam ao seu redor...",
			timestamp: "2023-11-05T13:45:00",
		},
		{
			id: 2,
			sender: "Gorn",
			senderType: "player",
			text: "Vou verificar se há rastros de goblinóides por aqui. *Rola Sobrevivência*",
			rolls: [
				{
					title: "Sobrevivência",
					result: 17,
					detail: "(13 + 4)",
					type: "success",
				},
			],
			timestamp: "2023-11-05T14:02:00",
		},
		{
			id: 3,
			sender: "Gorn",
			senderType: "player",
			rolls: [
				{
					title: "Iniciativa",
					result: 12,
					detail: "(10 + 2)",
					type: "normal",
				},
			],
			timestamp: "2023-11-05T14:03:00",
		},
		{
			id: 4,
			sender: "Lyra",
			senderType: "player",
			text: "Vou lançar Detectar Magia para ver se há alguma aura mágica nesta área.",
			timestamp: "2023-11-05T14:05:00",
		},
		{
			id: 5,
			sender: "Mestre",
			senderType: "dm",
			text: "Gorn, você nota rastros recentes de humanoides pequenos se movendo para o leste. Lyra, você detecta uma aura fraca de transmutação vindo de uma árvore antiga ao norte.",
			timestamp: "2023-11-05T14:08:00",
		},
		{
			id: 6,
			sender: "Lyra",
			senderType: "player",
			rolls: [
				{
					title: "Ataque - Raio de Fogo",
					result: 20,
					detail: "(20 + 5)",
					type: "critical",
					criticalTag: true,
				},
				{
					title: "Dano",
					result: 18,
					detail: "(4d6: 3,5,4,6)",
					type: "damage",
				},
			],
			timestamp: "2023-11-05T14:09:00",
		},
		{
			id: 7,
			sender: "Thorne",
			senderType: "player",
			text: "Vamos investigar a árvore. Eu posso usar Orientação em quem for examinar.",
			timestamp: "2023-11-05T14:10:00",
		},
		{
			id: 8,
			sender: "Vex",
			senderType: "player",
			text: "Eu vou na frente para verificar armadilhas. Provavelmente não é uma árvore comum.",
			rolls: [
				{
					title: "Percepção",
					result: 22,
					detail: "(18 + 4)",
					type: "success",
				},
			],
			timestamp: "2023-11-05T14:12:00",
		},
		{
			id: 9,
			sender: "Vex",
			senderType: "player",
			rolls: [
				{
					title: "Teste de Armadilhas",
					result: 3,
					detail: "(1 + 2)",
					type: "failure",
				},
			],
			timestamp: "2023-11-05T14:13:00",
		},
		{
			id: 10,
			sender: "Mestre",
			senderType: "dm",
			text: "Vex, você se aproxima com cautela e percebe que um pequeno compartimento está escondido no tronco da árvore. Parece conter algo...",
			timestamp: "2023-11-05T14:15:00",
		},
		// Example of a recent message from today
		{
			id: 11,
			sender: "Gorn",
			senderType: "player",
			text: "Eu vou abrir o compartimento com cuidado.",
			timestamp: new Date().toISOString(),
		},
	]);

	// Function to get CSS class for character avatar
	function getAvatarClass(senderType: MessageType, sender: string): string {
		if (senderType === "dm") return "dm";

		// Assign class based on character name
		switch (sender) {
			case "Gorn":
				return "warrior";
			case "Lyra":
				return "mage";
			case "Thorne":
				return "cleric";
			case "Vex":
				return "rogue";
			default:
				return "player";
		}
	}

	// For message input
	let newMessage = $state("");

	function sendMessage() {
		if (!newMessage.trim()) return;
		newMessage = "";
	}
</script>

<div class="messages-container">
	<div class="messages-header">
		<h3>Conversa do Grupo</h3>
	</div>

	<div class="messages-list">
		{#each messages as message (message.id)}
			<div
				class="message-item {!message.text && message.rolls
					? 'roll-only'
					: ''} {message.senderType === 'dm' ? 'dm-message' : ''}"
			>
				<div class="message-avatar {getAvatarClass(message.senderType, message.sender)}">
					<span>{message.sender.charAt(0)}</span>
				</div>
				<div class="message-content">
					<div class="message-sender">{message.sender}</div>

					{#if message.text}
						<div class="message-text">
							{message.text}
						</div>
					{/if}

					{#if message.rolls && message.rolls.length > 0}
						{#each message.rolls as roll}
							<div class="message-roll {roll.type}">
								<div class="roll-title">{roll.title}</div>
								<div class="roll-value">
									<span class="dice">{roll.type === "damage" ? "🔥" : "🎲"}</span>
									<span class="roll-result">{roll.result}</span>
									<span class="roll-detail">{roll.detail}</span>
									{#if roll.criticalTag}
										<span class="critical-tag">CRÍTICO!</span>
									{/if}
								</div>
							</div>
						{/each}
					{/if}

					<div class="message-time">{formatMessageTime(message.timestamp)}</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="message-input-area">
		<div class="input-wrapper">
			<input
				type="text"
				placeholder="Digite sua mensagem..."
				bind:value={newMessage}
				onkeydown={(e) => e.key === "Enter" && sendMessage()}
			/>
			<button class="send-button" onclick={sendMessage}>Enviar</button>
		</div>
	</div>
</div>

<style>
	h3 {
		margin-bottom: 0.75rem;
		font-weight: 600;
		font-size: 1.25rem;
		color: var(--title-color);
	}

	/* Messages Tab Styles */
	.messages-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.messages-header {
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--background-color-level-2);
	}

	.messages-header h3 {
		margin-bottom: 0;
	}

	.messages-list {
		flex: 1;
		overflow-y: auto;
		padding: 1rem 0.75rem 1rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		scrollbar-width: thin;
		scrollbar-color: var(--background-color-level-3) var(--background-color-level-1);
	}

	/* Custom scrollbar for webkit browsers */
	.messages-list::-webkit-scrollbar {
		width: 6px;
	}

	.messages-list::-webkit-scrollbar-track {
		background: var(--background-color-level-1);
		border-radius: 4px;
	}

	.messages-list::-webkit-scrollbar-thumb {
		background-color: var(--background-color-level-3);
		border-radius: 4px;
	}

	.messages-list::-webkit-scrollbar-thumb:hover {
		background-color: var(--primary-color);
	}

	.message-date-divider {
		display: flex;
		align-items: center;
		margin: 0.75rem 0;
		color: var(--text-color-dim);
		font-size: 0.8rem;
		text-align: center;
	}

	.message-date-divider::before,
	.message-date-divider::after {
		content: "";
		flex: 1;
		height: 1px;
		background-color: var(--background-color-level-2);
		margin: 0 0.75rem;
	}

	.message-item {
		display: flex;
		gap: 0.75rem;
	}

	.message-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		color: white;
		flex-shrink: 0;
	}

	.message-avatar.warrior {
		background-color: #e74c3c;
	}

	.message-avatar.mage {
		background-color: #3498db;
	}

	.message-avatar.cleric {
		background-color: #2ecc71;
	}

	.message-avatar.rogue {
		background-color: #9b59b6;
	}

	.message-avatar.dm {
		background-color: #34495e;
	}

	.message-content {
		flex: 1;
		min-width: 0;
	}

	.message-sender {
		font-weight: 600;
		margin-bottom: 0.25rem;
		color: var(--title-color);
		font-size: 0.9rem;
	}

	.message-text {
		line-height: 1.3;
		white-space: pre-wrap;
		word-break: break-word;
	}

	.message-time {
		font-size: 0.7rem;
		color: var(--text-color-dim);
		margin-top: 0.25rem;
	}

	.message-roll {
		display: inline-flex;
		background-color: var(--background-color-level-2);
		padding: 0.35rem 0.75rem;
		border-radius: 0.75rem;
		margin: 0.5rem 0;
		font-size: 0.9rem;
		flex-direction: column;
		width: 100%;
		border-left: 3px solid var(--background-color-level-3);
	}

	.message-roll.success {
		border-left: 3px solid var(--primary-color);
	}

	.message-roll.failure {
		border-left: 3px solid #e74c3c;
	}

	.message-roll.critical {
		border-left: 3px solid #f39c12;
		background-color: rgba(243, 156, 18, 0.1);
	}

	.message-roll.damage {
		border-left: 3px solid #e74c3c;
		background-color: rgba(231, 76, 60, 0.1);
	}

	.roll-title {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text-color-dim);
		margin-bottom: 0.25rem;
	}

	.roll-value {
		display: flex;
		align-items: center;
	}

	.dice {
		margin-right: 0.5rem;
		font-size: 1.1rem;
	}

	.roll-result {
		font-weight: 700;
		color: var(--primary-color);
		font-size: 1.1rem;
	}

	.critical-tag {
		margin-left: 0.5rem;
		font-size: 0.75rem;
		font-weight: 700;
		color: #f39c12;
		background: rgba(243, 156, 18, 0.15);
		padding: 0.15rem 0.4rem;
		border-radius: 0.25rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.roll-detail {
		margin-left: 0.5rem;
		font-size: 0.85rem;
		color: var(--text-color-dim);
	}

	.message-item.roll-only .message-roll {
		margin-top: 0;
	}

	.message-input-area {
		margin-top: auto;
		padding-top: 0.75rem;
		border-top: 1px solid var(--background-color-level-2);
	}

	.input-wrapper {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.message-input-area input[type="text"] {
		flex: 1;
		padding: 0.65rem 0.75rem;
		height: 40px;
		border-radius: var(--border-radius);
		border: 1px solid var(--background-color-level-2);
		background-color: var(--background-color-level-0);
		color: var(--text-color);
		font-family: inherit;
		font-size: 0.9rem;
	}

	.message-input-area input[type="text"]:focus {
		outline: none;
		border-color: var(--primary-color-50);
	}

	.send-button {
		padding: 0 1rem;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--border-radius);
		border: none;
		cursor: pointer;
		font-weight: 600;
		background-color: var(--primary-color);
		color: var(--primary-color-contrast);
		min-width: 80px;
	}

	.send-button:hover {
		background-color: var(--primary-color-hover, var(--primary-color-dark, #0056b3));
	}
</style>
