<script>
	let src;

	function fileHandler(element) {
		let img = element.srcElement.files[0];
		src = URL.createObjectURL(img);
	}
</script>

<div class="wall">
	{#if src}
		{#each Array(200) as i}
			<div
				class="wrapper"
				style="
				top: {Math.random() * 115 - 15}vh; 
				left: {Math.random() * 115 - 15}vw; 
				height: {Math.random() * 100}vh; 
				width: {Math.random() * 100}vw"
			>
				<img {src} alt="" />
			</div>
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

		.wrapper {
			position: absolute;

			img {
				width: 100%;
				height: 100%;
				object-fit: fill;
			}
		}
	}

	:global(body) {
		overflow: hidden;
	}
</style>
