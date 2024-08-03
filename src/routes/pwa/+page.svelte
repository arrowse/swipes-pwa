<script lang="ts">
	import { onMount } from 'svelte';
	import { lastSunday, plan, used } from '$lib/stores/localStorageHandler';
	import { get } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { circOut } from 'svelte/easing';
	import { GradientButton } from 'flowbite-svelte';

	let show = false;

	// Helper function to check if a date is more than 7 days ago
	function isMoreThan7DaysAgo(dateString: string): boolean {
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays > 7;
	}

	// Helper function to get the previous Sunday
	function getPreviousSunday(): string {
		const now = new Date();
		const dayOfWeek = now.getDay();
		const diff = now.getDate() - dayOfWeek;
		const previousSunday = new Date(now.setDate(diff));
		return previousSunday.toISOString().split('T')[0]; // Format as YYYY-MM-DD
	}

	// Helper function to determine if the plan is weekly
	function isWeeklyPlan(plan: string): boolean {
		return /\d+w/.test(plan);
	}

	// Helper function to calculate remaining swipes
	function calculateRemainingSwipes(plan: string, used: number): number {
		const totalSwipes = parseInt(plan);
		return totalSwipes - used;
	}

	let remainingSwipes = 0;
	let remainingSwipesMessage = '';
	let buttonsDisabled = false;

	onMount(() => {
		const lastSundayValue = get(lastSunday);
		const planValue = get(plan);
		const usedValue = get(used);

		if (lastSundayValue === '') {
			lastSunday.set(getPreviousSunday());
		} else if (lastSundayValue && isMoreThan7DaysAgo(lastSundayValue)) {
			if (isWeeklyPlan(planValue)) {
				used.set(0);
				lastSunday.set(getPreviousSunday());
			}
		}

		if (!planValue) {
			location.href = '/setup';
		} else {
			remainingSwipes = calculateRemainingSwipes(planValue, usedValue);
			if (remainingSwipes <= 0) {
				remainingSwipesMessage = 'You\'re out of swipes for the moment.';
			} else if (isWeeklyPlan(planValue)) {
				remainingSwipesMessage = `week.`;
			} else {
				remainingSwipesMessage = `quarter.`;
			}
		}

		show = true;
	});

	$: remainingSwipes = calculateRemainingSwipes($plan, $used);

	let randomMessages = [
		'How about them apples?',
		'Not to be confused with the CTA U Pass...',
		'Do you like big glowing buttons that only do one thing?',
		'Cheesed to meet you.',
		'Are you cooking? Not food... but like, with goals and stuff',
		'Not everything needs to be an app... but I was bored so.. hi',
		'Wherever you are, I hope your day is going well!'
	];

	function handleClick(action: () => void) {
		if (!buttonsDisabled) {
			action();
			buttonsDisabled = true;
			setTimeout(() => {
				buttonsDisabled = false;
			}, 300); // Disable buttons for 2 seconds
		}
	}
</script>

{#if $plan && show}
	<div in:fly={{ y: 10, easing: circOut, duration: 300, delay: 0 }}>
		<h1>You have {remainingSwipes} swipes left this {remainingSwipesMessage}</h1>
		<p>{randomMessages[Math.floor(Math.random() * randomMessages.length)]}</p>

		<GradientButton shadow color="purple" size="lg" on:click={() => handleClick(() => used.update(n => n + 1))}
										disabled={buttonsDisabled}>Swipe!
		</GradientButton>
		<br />
		<br />
		<GradientButton shadow color="teal" size="sm" on:click={() => handleClick(() => used.update(n => n - 1))}
										disabled={buttonsDisabled}>Unswipe!
		</GradientButton>
		<br />
		<br />
	</div>
{/if}