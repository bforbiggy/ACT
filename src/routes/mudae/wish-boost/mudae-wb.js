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
		wishlist: 1 + wl + (bonusMultiplier.wishlist ?? 0),
		firstwish: 1 + wl + fw + (bonusMultiplier.firstwish ?? 0),
	};
}

/**
 * Calculate table of investments, returning data for each investment amount
 * @param {number} totalRolls Total number of rolls available
 * @param {*} bonusMultiplier Bonus multiplier for wishlist/firstwish
 * @returns 
 */
function calcInvestTable(totalRolls, bonusMultiplier = {}) {
	let results = [];


	for (let i = 0; i < totalRolls; i += 1) {
		// Perform calculations
		const rollsLeft = totalRolls - i;
		let multiplier = investRolls(i, bonusMultiplier);
		const result = {
			rolls: rollsLeft,
			invested: i,
			wlMultiplier: multiplier.wishlist,
			fwMultiplier: multiplier.firstwish,
			wlTotal: rollsLeft * multiplier.wishlist,
			fwTotal: rollsLeft * multiplier.firstwish,
		};

		// Store calculations, updating ideal investments accordingly
		results.push(result);
	}

	return results;
}

/**
 * Finds the ideal investment for the given results.
 * * This method adds iterations, but it's a lot cleaner compared to having a predicate/chunky result generator
 * @param {*} results results genereated by calcInvestTable
 * @return Ideal investments for maximizing wishes & firstwishs
 */
function findIdealInvestment(results) {
	let effectiveWish = 0, effectiveFirst = 0;
	let wishInvestment = 0, firstInvestment = 0;

	results.forEach((result, i) => {
		// Update max effective wishes
		if (result.wlTotal > effectiveWish) {
			effectiveWish = result.wlTotal;
			wishInvestment = i;
		}

		// Update max effective firstwishes
		if (result.fwTotal > effectiveFirst) {
			effectiveFirst = result.fwTotal;
			firstInvestment = i;
		}
	});

	return [wishInvestment, firstInvestment];
}

export { investRolls, calcInvestTable, findIdealInvestment }