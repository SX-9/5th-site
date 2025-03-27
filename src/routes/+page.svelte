<script lang="ts">
    import { daysUntilBirthday, getTimeIn, months, randomStr, timeAgo } from "$lib";
    import type { PageData } from "./$types";
    export let data: PageData;

    let days = daysUntilBirthday(data.birthday);
    let time = getTimeIn(data.timezone);
</script>

<header>
    <div class="group border-2 border-ctp-base hover:border-ctp-overlay1 rounded-xl w-full h-32 overflow-hidden flex justify-center items-center shadow-lg">
        <div class="text-center text-5xl font-mono my-4 cursor-default -rotate-6 leading-10 text-ctp-overlay1 group-hover:text-ctp-base">
            <span>{randomStr(30)}<br>{randomStr(40)}</span>
            <span class="group-hover:py-4 block">{randomStr(20-data.name.length/2)}<a href={'https://github.com/'+data.github+'/5th-site'} target="_blank" class="group-hover:px-8 no-underline text-ctp-subtext1 group-hover:text-ctp-text">{data.name.toUpperCase()}</a>{randomStr(20-data.name.length/2)}</span>
            <span>{randomStr(40)}<br>{randomStr(30)}</span>
        </div>
    </div>
    <nav class="flex justify-between items-center gap-4 text-lg max-w-full w-full px-4 overflow-y-auto text-nowrap">
        <div class="flex justify-center gap-4">
            <a href={'https://github.com/'+data.github} target="_blank">github</a>
            <a href={'https://discordapp.com/users/'+data.discord} target="_blank">discord</a>
            <a href={data.blog} target="_blank">blog</a>
        </div>
        <p class="text-center m-0 font-mono italic">curl https://satr14.my.id</p>
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
                <a href={'https://google.com/search?q='+skill} target="_blank" class="bg-ctp-mantle text-ctp-text hover:bg-ctp-base px-2 py-1 rounded-full no-underline text-xs sm:text-sm">{skill}</a>
            {/each}
        </p>
        <p class="flex flex-wrap gap-1">
            {#each Object.entries(data.links) as link, i}
                {#if i > 0}<span class="text-ctp-subtext1">~</span>{/if}
                <a href={link[1]} target="_blank">{link[0]}</a>
            {/each}
        </p>
    </article>
</main>



<footer class=" mt-8">
    <nav class="flex justify-center items-center gap-4 text-lg">
        <a class="no-underline px-2" href="https://nixwebr.ing">nixwebr.ing:</a>
        <a class="no-underline px-2" href="https://nixwebr.ing/prev/satr14">&lt;</a>
        <a class="no-underline px-2" href="https://nixwebr.ing/rand">*</a>
        <a class="no-underline px-2" href="https://nixwebr.ing/next/satr14">&gt;</a>
    </nav>
</footer>