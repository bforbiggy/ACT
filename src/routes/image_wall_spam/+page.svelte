<script>
	let src;

	function fileHandler(element) {
		let img = element.srcElement.files[0];
		src = URL.createObjectURL(img);
	}
</script>

<div class="wall">
	{#if src}
		{#each Array(150) as i}
			<img
				{src}
				alt=""
				style="
				top: {Math.random() * 100 - 15}vh; 
				left: {Math.random() * 100 - 15}vw; 
				height: {Math.random() * 100 - 15}vh; 
				width: {Math.random() * 100 - 15}vw"
			/>
		{/each}
	{:else}
		<p>Choose an image:</p>
		<input
			type="file"
			accept="image/png, image/jpeg"
			on:change={fileHandler}
			name="userImage"
		/>
	{/if}
</div>

<style lang="scss">
	.wall {
		width: 100vw;
		height: 100vh;

		img {
			position: absolute;
		}
	}

	:global(body) {
		overflow: hidden;
	}
</style>
