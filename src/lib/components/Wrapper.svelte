<script lang="ts">
	interface Props {
		center?: boolean;
		children: any;
	}
	let { center, children }: Props = $props();
</script>

<div class="wrapper {center ? 'center' : ''}">
	{@render children()}
</div>

<style>
	.wrapper {
		padding: 1rem;
	}
	.center {
		text-align: center;
	}
</style>
