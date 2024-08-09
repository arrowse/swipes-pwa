<script lang="ts">
	import { Select, Label, Button } from 'flowbite-svelte';
	import { plan } from '$lib/stores/localStorageHandler';
	import { circOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	$: selected = $plan;

	let mustEdit = true;

	$: if (selected) {
		mustEdit = false;
	}

	let countries = [
		{ value: '12w', name: '12 Swipes Weekly' },
		{ value: '14w', name: '14 Swipes Weekly' },
		{ value: '45q', name: '45 Swipes Quarterly' },
		{ value: '90q', name: '90 Swipes Quarterly' }
	];

	$: plan.set(selected);

</script>
<div in:fly={{ y: -20, easing: circOut, duration: 400, delay: 0 }}>
	<Label>
		Select your meal plan!
		<Select class="mt-2 w-full" size="lg" items={countries} bind:value={selected} />
	</Label>
	<Button href="pwa" disabled={!selected} shadow class="mt-8 bg-[#BB9CFF] text-[#11111B]">Save and exit</Button>
</div>