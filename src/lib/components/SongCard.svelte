<script lang="ts">
	interface Props {
		id: number;
		title: string;
		deluxe: boolean;
		difficulty: string;
	}

	let { id, title, deluxe, difficulty } = $props();
</script>

<div class="card">
	{title}
</div>

<style>
	.card {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 8rem;
	}
</style>
