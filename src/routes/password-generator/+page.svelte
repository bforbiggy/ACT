<script>
	let lowercase = true;
	let uppercase = true;
	let numbers = true;
	let symbols = false;

	function randomSelect(options) {
		const array = new Uint32Array(1);
		self.crypto.getRandomValues(array);
		const index = array[0] % options.length;
		return options[index];
	}

	let length = 12;
	let password = '';
	function generatePassword() {
		let options = '';

		if (lowercase) options += 'abcdefghijklmnopqrstuvwxyz';
		if (uppercase) options += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		if (numbers) options += '0123456789';
		if (symbols) options += '~`! @#$%^&*()_-+={[}]|:;"\'<,>.?/';

		let temp = '';
		for (let i = 0; i < length; i++) temp += randomSelect(options);
		password = temp;
	}
</script>

<div class="lowercase">
	<label for="lowercase">Lowercase letters (a-z)</label>
	<input type="checkbox" name="lowercase" bind:checked={lowercase} />
</div>

<div class="uppercase">
	<label for="uppercase">Uppercase letters (a-z)</label>
	<input type="checkbox" name="uppercase" bind:checked={uppercase} />
</div>

<div class="numbers">
	<label for="numbers">Numbers (0-9)</label>
	<input type="checkbox" name="numbers" bind:checked={numbers} />
</div>

<div class="symbols">
	<label for="symbols">Symbols (!@#)</label>
	<input type="checkbox" name="symbols" bind:checked={symbols} />
</div>

<input type="range" min="1" max="30" bind:value={length} />
<input type="number" bind:value={length} />

<div>
	<input type="text" name="password" bind:value={password} />
	<button on:click={generatePassword}>Generate Password</button>
</div>
