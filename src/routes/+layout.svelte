<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    import "../app.css";
</script>

<svelte:head>
    <title>{data.title}</title>
    <meta name="description" content={data.description} />
    <meta name="theme-color" content="#00e1ff" />
</svelte:head>

<slot />