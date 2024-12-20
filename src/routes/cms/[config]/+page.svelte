<script>
	import CollapsableDiv from '$lib/components/CollapsableDiv.svelte';
	import Wrapper from '$lib/components/Wrapper.svelte';

	let { data } = $props();

	const cms = JSON.parse(data.cms.trim());

	const w = Object.entries(cms);
	console.log('w', w);
</script>

<Wrapper>
	{#each Object.entries(cms) as [key, value]}
		<CollapsableDiv {key} values={value} />
	{/each}
</Wrapper>

<style lang="scss">
</style>
