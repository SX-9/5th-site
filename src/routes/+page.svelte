<script lang="ts">
    import { page } from "$app/stores";
    import { daysUntilBirthday, getTimeIn, randomStr } from "$lib";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
    import {
        blur,
        crossfade,
        draw,
        fade,
        fly,
        scale,
        slide
    } from 'svelte/transition';
    import {
        cubicOut
    } from 'svelte/easing';

    let days = daysUntilBirthday(data.birthday);
    let time = getTimeIn(data.timezone);
    let charAmount = 0;
    let webring = $page.url.searchParams.has('webring');

    onMount(() => {
        charAmount = Math.floor(window.innerWidth / 20);
    });
</script>

<div class="fixed top-0 left-0 w-full h-full -bg-gradient-6 opacity-25 from-ctp-sapphire via-transparent to-ctp-sapphire" transition:fade={{
    duration: 1500, easing: cubicOut
}}></div>

<div class="fixed top-0 left-0 w-full h-full overflow-hidden flex justify-center items-center select-none" transition:blur={{
    duration: 1000, easing: cubicOut,
}}>
    <div class="font-[Stray,_monospace] group whitespace-nowrap text-center text-5xl my-4 cursor-default -rotate-6 leading-10 text-ctp-overlay1 hover:text-ctp-base">
        <span class="inline-block animate-scrolling-text-to-l">{randomStr(charAmount)}</span><br>
        <span class="block">{randomStr(Math.round(charAmount-data.name.length/2))}<a href={'https://github.com/SX-9/5th-site'} target="_blank" class="group-hover:px-8 no-underline text-ctp-subtext1 group-hover:text-ctp-text">{data.name.toUpperCase()}</a>{randomStr(Math.round(charAmount-data.name.length/2))}</span>
        <span class="inline-block animate-scrolling-text-to-r">{randomStr(charAmount)}</span><br>
    </div>
</div>

<div class="fixed top-0 left-0 w-full text-base flex justify-center items-center">
    <nav class="py-2 px-4 backdrop-blur rounded-t-3xl border-ctp-base hover:border-ctp-sky">
        {#if webring}
            <a href="https://nixwebr.ing" class="no-underline">nixwebr.ing:</a>
            <a href="https://nixwebr.ing/prev/satr14" class="no-underline">&larr;</a>
            <a href="https://nixwebr.ing/rand/" class="no-underline">?</a>
            <a href="https://nixwebr.ing/next/satr14" class="no-underline">&rarr;</a>
        {:else}
            <p class="animate-pulse italic text-base">
                <span class="hidden sm:block">Press [Enter] to continue.</span>
                <span class="sm:hidden">Scroll to continue.</span>
            </p>
        {/if}
    </nav>
</div>
    
<div class="h-[calc(100%-8rem)] sm:h-[calc(100%-6rem)]"></div>

<div class="backdrop-blur-md backdrop-brightness-75 w-[calc(100%-2rem)] ml-4 pt-4 border-t-2 border-x-2 border-ctp-surface1 hover:border-ctp-sky shadow-inner rounded-t-3xl" transition:fly={{
    duration: 1500, easing: cubicOut, y: 200, opacity: 0,
}}>
    <div class="max-w-3xl mx-auto px-4 pt-2 sm:pt-4">
        <header>
            <nav class="overflow-hidden flex flex-col-reverse sm:flex-row justify-center sm:justify-between items-center sm:gap-4 text-lg max-w-full w-full px-4 overflow-y-auto text-nowrap">
                <div class="flex justify-center gap-4">
                    {#each Object.entries(data.socials) as [name, url]}
                        <a href={url} target="_blank">{name}</a>
                    {/each}
                </div>
                <!-- svelte-ignore a11y-autofocus -->
                <a href="/#abt" id="abt" class="text-center no-underline text-xl font-extrabold" autofocus>&uarr;</a>
                <p class="text-center m-0 font-mono italic hidden md:block">curl https://satr14.my.id</p>
            </nav>
        </header>
        
        <main>
            <article>
                <h1>{data.subtitle}</h1>
                <p>{data.description}</p>
                <p class="text-sm"><i>
                    It's <b>{time}</b> in <b>{data.timezone}</b>.
                </i></p>
                <p class="flex flex-wrap gap-2 text-sm">
                    {#each data.skills as skill}
                        <span class="bg-ctp-surface0 text-ctp-text px-2 py-1 rounded-full no-underline text-xs sm:text-sm">{skill}</span>
                    {/each}
                </p>
                <p class="flex flex-wrap gap-1">
                    {#each Object.entries(data.links) as [title, url], i}
                        {#if i > 0}<span class="text-ctp-subtext1">~</span>{/if}
                        <a href={url} target="_blank">{title}</a>
                    {/each}
                </p>
            </article>
            <!-- hate optimizing images ;-; -->
            <!-- <section class="flex flex-wrap gap-4 px-4 pb-4">
                {#each Object.entries(data.communities) as [name,details], i}
                    <div class="inline-block">
                        <div class="flex gap-2">
                            <img src={details.icon} alt={name} class="size-12 rounded-lg">
                            <div>
                                <h2 class="text-base m-0"><a href={details.url}>{name}</a></h2>
                                <span>{details.role}</span>
                            </div>
                        </div>
                    </div>
                {/each}
            </section> -->
        </main>
    </div>
</div>