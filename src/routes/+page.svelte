<script lang="ts">
    import { page } from "$app/stores";
    import { daysUntilBirthday, getTimeIn, months, randomStr, timeAgo } from "$lib";
    import type { PageData } from "./$types";
    export let data: PageData;

    let days = daysUntilBirthday(data.birthday);
    let time = getTimeIn(data.timezone);
    let charAmount = 50;
    let webring = $page.url.searchParams.has('webring');
</script>

<div class="fixed top-0 left-0 w-full h-full -bg-gradient-6 opacity-10 from-ctp-sapphire via-transparent to-ctp-green"></div>


<div class="fixed top-0 left-0 w-full h-full overflow-hidden flex justify-center items-center select-none">
    <div class="group whitespace-nowrap text-center text-5xl font-mono my-4 cursor-default -rotate-6 leading-10 text-ctp-overlay1 hover:text-ctp-base">
        <span class="inline-block animate-scrolling-text-to-l">{randomStr(charAmount)}</span><br>
        <span class="block">{randomStr(Math.round(charAmount-data.name.length/2))}<a href={'https://github.com/'+data.github+'/5th-site'} target="_blank" class="group-hover:px-8 no-underline text-ctp-subtext1 group-hover:text-ctp-text">{data.name.toUpperCase()}</a>{randomStr(Math.round(charAmount-data.name.length/2))}</span>
        <span class="inline-block animate-scrolling-text-to-r">{randomStr(charAmount)}</span><br>
    </div>
</div>

{#if webring}
    <div class="fixed top-0 left-0 w-full text-base flex justify-center items-center">
        <nav class="py-2 px-4 backdrop-blur rounded-t-3xl border-ctp-base hover:border-ctp-sky">
            <a href="https://nixwebr.ing" class="no-underline">nixwebr.ing:</a>
            <a href="https://nixwebr.ing/prev/" class="no-underline">&larr;</a>
            <a href="https://nixwebr.ing/rand/" class="no-underline">?</a>
            <a href="https://nixwebr.ing/next/" class="no-underline">&rarr;</a>
        </nav>
    </div>
{/if}
    
<div class="h-[calc(100%-8rem)] sm:h-[calc(100%-6rem)]"></div>

<div class="backdrop-blur-md w-[calc(100%-2rem)] ml-4 pt-4 border-t-2 border-x-2 border-ctp-base hover:border-ctp-sky shadow-inner rounded-t-3xl">
    <div class="max-w-3xl mx-auto px-4 pt-2 sm:pt-4">
        <header>
            <nav class="flex flex-col-reverse sm:flex-row justify-center sm:justify-between items-center sm:gap-4 text-lg max-w-full w-full px-4 overflow-y-auto text-nowrap">
                <div class="flex justify-center gap-4">
                    <a href={'https://github.com/'+data.github} target="_blank">github</a>
                    <a href={'https://discordapp.com/users/'+data.discord} target="_blank">discord</a>
                    <a href={data.blog} target="_blank">blog</a>
                </div>
                <!-- svelte-ignore a11y-autofocus -->
                <a href="/#abt" id="abt" class="text-center no-underline text-xl font-extrabold" autofocus>&uarr;</a>
                <p class="text-center m-0 font-mono italic hidden sm:block">curl https://satr14.my.id</p>
            </nav>
        </header>
        
        <main>
            <article>
                <h1>{data.subtitle}</h1>
                <p>{data.description}</p>
                <p class="text-sm"><i>
                    It's <b>{time}</b> in <b>{data.timezone}</b>.
                    <b>{days || 'Today'}</b> { days ? 'day' + (days === 1 ? '' : 's') + ' until my birthday.' : 'is my birthday!' }
                </i></p>
                <p class="flex flex-wrap gap-2 text-sm">
                    {#each data.skills as skill}
                        <a href={'https://google.com/search?q='+skill} target="_blank" class="bg-ctp-surface0 text-ctp-text hover:bg-ctp-base px-2 py-1 rounded-full no-underline text-xs sm:text-sm">{skill}</a>
                    {/each}
                </p>
                <p class="flex flex-wrap gap-1">
                    {#each Object.entries(data.links) as [title, url], i}
                        {#if i > 0}<span class="text-ctp-subtext1">~</span>{/if}
                        <a href={url} target="_blank">{title}</a>
                    {/each}
                </p>
            </article>
            <section class="flex flex-wrap gap-4 px-4 pb-4">
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
            </section>
        </main>
    </div>
</div>