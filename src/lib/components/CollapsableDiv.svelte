<script lang="ts">
	import CollapsableDiv from '$lib/components/CollapsableDiv.svelte';

	let { key, values, depth = 1 } = $props();
	let opened = $state(false);

	const isExpandable = Array.isArray(values) || typeof values === 'object';

	function determineClass(value: any) {
		if (typeof value === 'string') {
			return 'string';
		} else if (typeof value === 'number') {
			return 'number';
		} else if (typeof value === 'boolean') {
			return value ? 'booleanTrue' : 'booleanFalse';
		}
	}
</script>

<button
	class={isExpandable ? 'key' : ''}
	onclick={() => (opened = isExpandable ? !opened : opened)}
	style={`margin-left: ${depth * 20}px`}
>
	{#if isExpandable}
		<span class="sign">{opened ? '-' : '+'}</span>
	{/if}
	{key}: {#if !Array.isArray(values) && typeof values !== 'object'}
		<span class={determineClass(values)}>{values}</span>
	{/if}
</button>

{#if opened}
	{#each Object.entries(values) as [key, value]}
		<CollapsableDiv {key} values={value} depth={depth + 1} />
	{/each}
{/if}

<style lang="scss">
	.key {
		margin-left: 5px;
		&:hover {
			cursor: pointer;
			text-decoration: underline;
			text-decoration-color: var(--secondary);
		}
	}
	.string {
		color: var(--success);
	}
	.number {
		color: var(--secondary);
	}
	.booleanTrue {
		color: var(--primary-light);
	}
	.booleanFalse {
		color: var(--error);
	}
	.sign {
		display: inline-block;
		width: 10px;
	}
</style>
