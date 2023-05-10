<script>
	import { onMount } from "svelte";

	let wall;
	let src = "anya.jpg";

	function spamImages() {
		console.log("hi");
		const child = document.createElement("img");
		child.src = src;
		wall.appendChild(child);
	}

	onMount(() => {
		spamImages();
	});
</script>

<div bind:this={wall} style="width: 100vw; height: 100vh;" />
