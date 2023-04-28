/**
 * Given a number of rolls to invest,
 * calculate the effectiveness multiplier for remaining rolls.
 * @param rollCount Number of rolls to invest
 * @oaram bonusMultiplier Additional wish multiplier to add to rolls
 * @return Effective multiplier for wishlist/firstwish
 */
function investRolls(rollCount, bonusMultiplier = {}) {
	let fw = 0.1 * rollCount;
	let wl = 0;

	// Rolls 1-5 have +20%
	if (rollCount > 0) wl += 0.2 * (rollCount <= 5 ? rollCount : 5);
	rollCount -= 5;
	// Rolls 5-15 have +15%
	if (rollCount > 0) wl += 0.15 * (rollCount <= 10 ? rollCount : 10);
	rollCount -= 10;
	// Remaining rolls have +10%
	if (rollCount > 0) wl += rollCount * 0.1;

	return {
		wishlist: 1 + wl + bonusMultiplier.wishlist ?? 0,
		firstwish: 1 + wl + fw + bonusMultiplier.firstwish ?? 0,
	};
}

// Calculate table of investment, returning results and ideal investment
function calcInvestTable(totalWishes, bonusMultiplier = {}) {
	let maxEffective = totalWishes * (1 + bonusMultiplier.wishlist ?? 0);
	let idealInvestment = 0;
	let results = [];


	for (let i = 0; i < totalWishes; i += 1) {
		// Perform calculations
		const rollsLeft = totalWishes - i;
		let multiplier = investRolls(i, bonusMultiplier);
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

	return [results, idealInvestment];
}

export { investRolls, calcInvestTable }