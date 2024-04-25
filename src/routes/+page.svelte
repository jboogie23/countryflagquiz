<!-- src/routes/quiz/+page.svelte -->
<script lang="ts">
	import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
	import { Confetti } from 'svelte-confetti';

	export let data;

	let countries = data.data;
	console.log(countries);

	let questions: string = [];
	let answers: string = [];
	let score = 0;
	let currentQuestion = 0;
	let showConfetti: boolean = false;

	polyfillCountryFlagEmojis();

	function startGame() {
		const emojis = new Set();
		while (emojis.size < 10) {
			emojis.add(countries[Math.floor(Math.random() * countries.length)].emoji);
		}

		questions = Array.from(emojis);

		// Generate the multiple choice answers for each question
		questions.forEach((emoji) => {
			const correctAnswer = countries.find((item) => item.emoji === emoji).name;
			const wrongAnswers = countries
				.filter((item) => item.name !== correctAnswer)
				.sort(() => Math.random() - 0.5)
				.slice(0, 3)
				.map((item) => item.name);
			answers.push([...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5));
		});
	}

	function handleAnswer(index) {
		if (
			answers[currentQuestion][index] ===
			countries.find((item) => item.emoji === questions[currentQuestion]).name
		) {
			handleConfetti();
			score++;
			setTimeout(() => {}, 3000);
		}
		currentQuestion++;
	}

	function handleConfetti() {
		showConfetti = true;
		setTimeout(() => {
			showConfetti = false;
		}, 3000);
	}

	startGame();
</script>

<div class="flex flex-col justify-center items-center min-h-screen">
	<h1 class="font-black">Country Flag Quiz</h1>
	{#if currentQuestion != questions.length}
		{score} / 10
	{/if}
	{#if currentQuestion < questions.length}
		<h2>Question {currentQuestion + 1}</h2>
		<p class="text-9xl text-center">{questions[currentQuestion]}</p>
		<ul class="text-center">
			{#each answers[currentQuestion] as answer, index}
				<li>
					<button
						class="shadow-lg border w-full my-4 rounded-md p-2 bg-slate-100"
						on:click={() => handleAnswer(index)}>{answer}</button
					>
					{#if showConfetti}
						<Confetti />
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<h2>Final Score: {score} / 10</h2>
	{/if}
</div>
