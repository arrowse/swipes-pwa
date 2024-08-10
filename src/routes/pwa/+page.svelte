<script lang="ts">
	import { onMount } from 'svelte';
	import { lastSunday, plan, used } from '$lib/stores/localStorageHandler';
	import { get } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { circOut } from 'svelte/easing';
	import { Button } from 'flowbite-svelte';

	let show = false;

	// Helper function to check if a date is more than 7 days ago
	function isMoreThan7DaysAgo(dateString: string): boolean {
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays > 7;
	}

	// Helper function to get the previous Sunday at 12:00am CST
	function getPreviousSunday(): string {
		const now = new Date();
		const dayOfWeek = now.getUTCDay();
		const diff = now.getUTCDate() - dayOfWeek;
		const previousSunday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), diff, 6)); // 6 AM UTC is midnight CST
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
			if (isWeeklyPlan(planValue)) {
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
		'Wherever you are, I hope your day is going well!',
			'The one piece is real!',
			'I still think they should nerf tenta missiles.',
			'SODAAAAAAAAAAAA',
			'Cats: "All your base are belong to us."',
			'[Object object]',
			'I will be your server today Mr. Gates',
			'Slenderman, cooking hot dogs on the stove?!?!?',
			'Did you know the green line is the oldest?',
			'The city of San Fransisco flag is actually so bad...',
			'mmmmmm bugati',
			'Your blue eyes white dragon can\'t hear over the wall of infinite kuribohs!',
			'Remember when cocaine bear launched? What a film.',
			'I think we\'re going to need more C-47s over here.',
			'brat',
			'Miku approved!',
			'1 billion lions vs all pokemon (they will form a lion ladder)',
			'You\'d have to stop the world just to stop the feeling',
			'i love gambling',
		'starship fans when the tin can does absolutely nothing for 12 hours straight',
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

	let message = randomMessages[Math.floor(Math.random() * randomMessages.length)]
</script>

{#if $plan && show}
	<div in:fly={{ y: 20, easing: circOut, duration: 450, delay: 0 }} class="{message === 'brat' ? 'bg-[#8ACE00] archivo-narrow' : ''}">
		<h1>You have {remainingSwipes} swipes left this {remainingSwipesMessage}</h1>
		<p>{message}</p>

		<Button class="bg-[#BB9CFF] text-[#11111B]" size="lg" on:click={() => handleClick(() => used.update(n => n + 1))}
										disabled={buttonsDisabled}>Swipe!
		</Button>
		<br />
		<br />
		<Button class="bg-[#99D1DB] text-[#11111B]" size="sm" on:click={() => handleClick(() => used.update(n => n - 1))}
										disabled={buttonsDisabled}>Unswipe!
		</Button>
	</div>
{/if}