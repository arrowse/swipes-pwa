<script lang="ts">
	import '../app.css';
	import { Button, DarkMode } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { AdjustmentsHorizontalOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	let darkmodebtn =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5 fixed right-4 top-2 z-50';

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r) {
					// uncomment following code if you want check for updates
					r &&
					setInterval(() => {
						console.log('Checking for sw update');
						r.update();
					}, 20000 /* 20s for testing purposes */);
					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error: Error) {
					console.log('SW registration error', error);
				}
			});
		}
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<DarkMode btnClass={darkmodebtn} />
{#if $page.url.pathname === '/pwa'}
	<Button href="/setup" class={darkmodebtn} style="right: 60px;">
		<AdjustmentsHorizontalOutline />
	</Button>
{/if}

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center min-h-screen">
	<div class="hidden md:block col-span-1 flex-1 min-w-0">
		<!-- Left column content -->
	</div>
	<div class="col-span-1 max-w-screen-md mx-auto p-8">
		<slot />
	</div>
	<div class="hidden md:block col-span-1 flex-1 min-w-0">
		<!-- Right column content -->
	</div>
</div>