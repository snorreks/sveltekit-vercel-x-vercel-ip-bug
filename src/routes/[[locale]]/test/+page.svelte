<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	const { location } = data;
</script>


{#if location}
	<pre>{JSON.stringify(location, null, 2)}</pre>
{/if}
