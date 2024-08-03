<script lang="ts">
	import { Select, Label, GradientButton } from 'flowbite-svelte';
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
<div in:fly={{ y: -10, easing: circOut, duration: 350, delay: 0 }}>

	<Label>
		Select your meal plan!
		<Select class="mt-2 w-full" size="lg" items={countries} bind:value={selected} />
	</Label>
	<GradientButton href="pwa" disabled={!selected} shadow color="teal" class="mt-8">Save and exit</GradientButton>
</div>