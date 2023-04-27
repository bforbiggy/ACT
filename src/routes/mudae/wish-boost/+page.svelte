<script>
	let userWishes;

	let idealInvestment = 0;
	let results = [];

	/**
	 * Given a number of rolls to invest,
	 * calculate the effectiveness multiplier for remaining rolls.
	 * @param rollCount Number of rolls to invest
	 * @return Effective multiplier for wishlist/firstwish
	 */
	function investRolls(rollCount) {
		let fw = 1 + 0.1 * rollCount;
		let wl = 1;

		// Rolls 1-5 have +20%
		if (rollCount > 0) wl += 0.2 * (rollCount <= 5 ? rollCount : 5);
		rollCount -= 5;
		// Rolls 5-15 have +15%
		if (rollCount > 0) wl += 0.15 * (rollCount <= 10 ? rollCount : 10);
		rollCount -= 10;
		// Remaining rolls have +10%
		if (rollCount > 0) wl += rollCount * 0.1;

		return {
			wishlist: wl,
			firstwish: fw,
		};
	}

	// Calculate table of investment
	function calculate() {
		let maxEffective = userWishes;
		idealInvestment = 0;
		results = [];

		for (let i = 1; i < userWishes; i += 1) {
			// Perform calculations
			const rollsLeft = userWishes - i;
			let multiplier = investRolls(i);
			const result = {
				rolls: rollsLeft,
				invested: i,
				wlMultiplier: multiplier.wishlist,
				fwMultiplier: multiplier.firstwish,
				wlTotal: rollsLeft * multiplier.wishlist,
				fwTotal: rollsLeft * multiplier.firstwish,
			};

			// Store calculations, updating maxResult accordingly
			results.push(result);
			if (result.wlTotal > maxEffective) {
				maxEffective = result.wlTotal;
				idealInvestment = i;
			}
		}

		// Forcefully update results
		results = results;
	}

	//.toFixed(3)
</script>

<div class="main">
	<div class="userInputs">
		<input
			bind:value={userWishes}
			for="wishes"
			type="number"
			min="2"
			placeholder="Total # of rolls"
		/>
		<button on:click={calculate}> Calculate </button>
	</div>

	<p>You should invest {idealInvestment ?? "?"} rolls.</p>

	<div class="results">
		<!-- <p>Remaining Rolls</p> -->
		<p>Invested Rolls</p>
		<p>Wish Multiplier</p>
		<p>Firstwish multiplier</p>
		<p>Total wishrate</p>
		<p>Total firstwish rate</p>

		{#each results as result}
			<!-- <p>{result.rolls}</p> -->
			<p>{result.invested}</p>
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

	.results {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 10px;
		max-width: max-content;

		p {
			text-align: center;
		}
	}
</style>
