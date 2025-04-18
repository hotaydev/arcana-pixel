<script lang="ts"></script>

<div class="messages-container">
	<div class="messages-header">
		<h3>Conversa do Grupo</h3>
	</div>

	<div class="messages-list">
		<div class="message-item dm-message">
			<div class="message-avatar dm">
				<span>DM</span>
			</div>
			<div class="message-content">
				<div class="message-sender">Mestre</div>
				<div class="message-text">
					Bem-vindos à Floresta Sombria. Vocês se encontram em uma clareira, os sons de criaturas
					misteriosas ecoam ao seu redor...
				</div>
				<div class="message-time">Hoje, 13:45</div>
			</div>
		</div>

		<div class="message-date-divider">
			<span>Hoje</span>
		</div>

		<div class="message-item">
			<div class="message-avatar warrior">
				<span>G</span>
			</div>
			<div class="message-content">
				<div class="message-sender">Gorn</div>
				<div class="message-text">
					Vou verificar se há rastros de goblinóides por aqui. *Rola Sobrevivência*
				</div>
				<div class="message-roll success">
					<div class="roll-title">Sobrevivência</div>
					<div class="roll-value">
						<span class="dice">🎲</span>
						<span class="roll-result">17</span>
						<span class="roll-detail">(13 + 4)</span>
					</div>
				</div>
				<div class="message-time">14:02</div>
			</div>
		</div>

		<div class="message-item roll-only">
			<div class="message-avatar warrior">
				<span>G</span>
			</div>
			<div class="message-content">
				<div class="message-sender">Gorn</div>
				<div class="message-roll">
					<div class="roll-title">Iniciativa</div>
					<div class="roll-value">
						<span class="dice">🎲</span>
						<span class="roll-result">12</span>
						<span class="roll-detail">(10 + 2)</span>
					</div>
				</div>
				<div class="message-time">14:03</div>
			</div>
		</div>

		<div class="message-item">
			<div class="message-avatar mage">
				<span>L</span>
			</div>
			<div class="message-content">
				<div class="message-sender">Lyra</div>
				<div class="message-text">
					Vou lançar Detectar Magia para ver se há alguma aura mágica nesta área.
				</div>
				<div class="message-time">14:05</div>
			</div>
		</div>

		<div class="message-item dm-message">
			<div class="message-avatar dm">
				<span>DM</span>
			</div>
			<div class="message-content">
				<div class="message-sender">Mestre</div>
				<div class="message-text">
					Gorn, você nota rastros recentes de humanoides pequenos se movendo para o leste. Lyra,
					você detecta uma aura fraca de transmutação vindo de uma árvore antiga ao norte.
				</div>
				<div class="message-time">14:08</div>
			</div>
		</div>

		<div class="message-item roll-only">
			<div class="message-avatar mage">
				<span>L</span>
			</div>
			<div class="message-content">
				<div class="message-sender">Lyra</div>
				<div class="message-roll critical">
					<div class="roll-title">Ataque - Raio de Fogo</div>
					<div class="roll-value">
						<span class="dice">🎲</span>
						<span class="roll-result">20</span>
						<span class="roll-detail">(20 + 5)</span>
						<span class="critical-tag">CRÍTICO!</span>
					</div>
				</div>
				<div class="message-roll damage">
					<div class="roll-title">Dano</div>
					<div class="roll-value">
						<span class="dice">🔥</span>
						<span class="roll-result">18</span>
						<span class="roll-detail">(4d6: 3,5,4,6)</span>
					</div>
				</div>
				<div class="message-time">14:09</div>
			</div>
		</div>

		<div class="message-item">
			<div class="message-avatar cleric">
				<span>T</span>
			</div>
			<div class="message-content">
				<div class="message-sender">Thorne</div>
				<div class="message-text">
					Vamos investigar a árvore. Eu posso usar Orientação em quem for examinar.
				</div>
				<div class="message-time">14:10</div>
			</div>
		</div>

		<div class="message-item">
			<div class="message-avatar rogue">
				<span>V</span>
			</div>
			<div class="message-content">
				<div class="message-sender">Vex</div>
				<div class="message-text">
					Eu vou na frente para verificar armadilhas. Provavelmente não é uma árvore comum.
				</div>
				<div class="message-roll success">
					<div class="roll-title">Percepção</div>
					<div class="roll-value">
						<span class="dice">🎲</span>
						<span class="roll-result">22</span>
						<span class="roll-detail">(18 + 4)</span>
					</div>
				</div>
				<div class="message-time">14:12</div>
			</div>
		</div>

		<div class="message-item roll-only">
			<div class="message-avatar rogue">
				<span>V</span>
			</div>
			<div class="message-content">
				<div class="message-sender">Vex</div>
				<div class="message-roll failure">
					<div class="roll-title">Teste de Armadilhas</div>
					<div class="roll-value">
						<span class="dice">🎲</span>
						<span class="roll-result">3</span>
						<span class="roll-detail">(1 + 2)</span>
					</div>
				</div>
				<div class="message-time">14:13</div>
			</div>
		</div>

		<div class="message-item dm-message">
			<div class="message-avatar dm">
				<span>DM</span>
			</div>
			<div class="message-content">
				<div class="message-sender">Mestre</div>
				<div class="message-text">
					Vex, você se aproxima com cautela e percebe que um pequeno compartimento está escondido no
					tronco da árvore. Parece conter algo...
				</div>
				<div class="message-time">14:15</div>
			</div>
		</div>
	</div>

	<div class="message-input-area">
		<div class="input-wrapper">
			<input type="text" placeholder="Digite sua mensagem..." />
			<button class="send-button">Enviar</button>
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
