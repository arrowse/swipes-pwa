<script>
	import { circOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
</script>

<div in:fly={{ y: 10, easing: circOut, duration: 300, delay: 400 }}>
	<h1>How to install</h1>
	<p>To get started, install this site as a progressive web app by
		clicking share on IOS, or menu on Android. Lastly, tap add to home screen.</p>

	<p>Swipe data will be stored 100% on device, and even works without
		an internet connection.</p>
</div>