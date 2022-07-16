<script>
	import { test } from '../store/test';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/test">test</a>

<button on:click={test.increment}>add</button>
<button on:click={test.decrement}>dec</button>
<p>{$test}</p>
