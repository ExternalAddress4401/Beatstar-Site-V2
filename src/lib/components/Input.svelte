<script lang="ts">
	interface Props {
		onChange: (searchTerm: string) => void;
	}

	let { onChange }: Props = $props();

	let timer: NodeJS.Timeout;

	const debounce = (v) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			onChange(v);
		}, 750);
	};
</script>

<input type="text" oninput={(e) => debounce(e.target?.value)} />

<style>
</style>
