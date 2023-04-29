<script>
	import { calcInvestTable } from "./mudae-wb.js";

	// In-binding variables
	let userWishes;

	// Out-binding variables
	let idealInvestment = 0;
	let results = [];

	// Update  roll investment table
	function calculate(event) {
		const elements = event.target.elements;
		let bonusMultiplier = {};
		bonusMultiplier.wishlist = elements.ruby.checked ? 0.5 : 0;
		bonusMultiplier.wishlist += elements.silver.value * 0.25;
		bonusMultiplier.firstwish = bonusMultiplier.wishlist;

		const [r, i] = calcInvestTable(userWishes, bonusMultiplier);
		results = r;
		idealInvestment = i;
	}
</script>

<div class="main">
	<form class="userInputs" on:submit={calculate}>
		<div id="silver">
			<p style="margin-right: 1em;">Silver Badge Level</p>
			<input type="radio" name="silver" value="0" />
			<label for="0">0</label>
			<input type="radio" name="silver" value="1" />
			<label for="1">1</label>
			<input type="radio" name="silver" value="2" />
			<label for="2">2</label>
			<input type="radio" name="silver" value="3" />
			<label for="3">3</label>
			<input type="radio" name="silver" value="4" checked="checked" />
			<label for="4">4</label>
		</div>

		<div id="ruby">
			<label for="Ruby" style="margin-right: 1em;"> Ruby 2</label><br />
			<input type="checkbox" name="ruby" value="ruby" checked="checked" />
		</div>

		<div id="rolls">
			<input
				bind:value={userWishes}
				type="number"
				min="2"
				placeholder="Total # of rolls"
			/>
			<input type="submit" value="Calculate" />
		</div>
	</form>

	<h2>You should invest {idealInvestment ?? "?"} rolls.</h2>

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
		font-size: xx-large;
		min-height: 2em;
		flex-direction: column;
		margin-bottom: 15vh;

		#silver {
			display: flex;
			align-items: center;
			height: min-content;

			p {
				margin: 0;
			}
		}

		#ruby {
			display: flex;
		}

		#rolls input {
			font-size: 30px;
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
