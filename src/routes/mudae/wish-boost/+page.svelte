<script>
	import { calcInvestTable, findIdealInvestment } from "./mudae-wb.js";

	// In-binding variables
	let userRolls;
	let bonusMultiplier = {};

	// Out-binding variables
	let wishInvestment = 0;
	let firstInvestment = 0;
	let results = [];

	// Update  roll investment table
	function calculate() {
		results = calcInvestTable(userRolls, bonusMultiplier);
		[wishInvestment, firstInvestment] = findIdealInvestment(results);
	}
</script>

<div class="main">
	<div class="userInputs">
		<input
			bind:value={bonusMultiplier.wishlist}
			type="number"
			step="0.25"
			min="0"
			placeholder="$bonus wishlist multiplier"
		/>
		<input
			bind:value={bonusMultiplier.firstwish}
			type="number"
			step="0.25"
			min="0"
			placeholder="$bonus firstwish multiplier"
		/>
		<input
			bind:value={userRolls}
			type="number"
			min="2"
			placeholder="Total # of rolls"
		/>
		<button on:click={calculate}>Calculate</button>
	</div>

	<h2>
		You should invest {wishInvestment ?? "?"} rolls. ({firstInvestment ?? "?"} for
		firstwishes)
	</h2>

	<div class="results">
		<p style="margin-left: 1em;">Invested Rolls</p>
		<p style="margin-right: 1em;">Remaining Rolls</p>
		<p style="margin-left: 1em;">Wish Multiplier</p>
		<p style="margin-right: 1em;">Firstwish multiplier</p>
		<p style="margin-left: 1em;">Effective Wish Rolls</p>
		<p style="margin-right: 1em;">Effective Firstwish Rolls</p>

		{#each results as result}
			<p>{result.invested}</p>
			<p>{result.rolls}</p>
			<p>{result.wlMultiplier.toFixed(2)}</p>
			<p>{result.fwMultiplier.toFixed(2)}</p>
			<p>{result.wlTotal.toFixed(2)}</p>
			<p>{result.fwTotal.toFixed(2)}</p>
		{/each}
	</div>
</div>

<style lang="scss">
	.main {
		display: flex;
		flex-direction: column;
	}

	.userInputs {
		display: flex;
		min-height: 2em;
		flex-direction: column;
		margin-bottom: 15vh;

		input {
			font-size: 20px;
			width: 15em;
		}

		button {
			font-size: 20px;
			max-width: max-content;
		}
	}

	.results {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		max-width: max-content;

		p {
			padding: 10px;
			margin-top: 0;
			margin-bottom: 0;
			border: 1px solid black;

			text-align: center;
		}
	}
</style>
