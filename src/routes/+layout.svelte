<script lang="ts">
    import type { PageData } from './$types';
    import "../app.css";
    import { onMount } from 'svelte';
    export let data: PageData;

    let loaded = false;
    onMount(() => {
        const handleVisibilityChange = () => loaded = document.visibilityState === 'visible';
        document.addEventListener('visibilitychange', handleVisibilityChange);
        handleVisibilityChange();
    });
</script>

<svelte:head>
    <title>{data.title}</title>
    <meta name="description" content={data.description} />
    <meta name="theme-color" content="#00e1ff" />
</svelte:head>

{#if loaded}
    <slot />
{/if}