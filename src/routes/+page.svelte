<script lang="ts">
    import { daysUntilBirthday, getTimeIn, months, randomStr, timeAgo } from "$lib";
    import type { PageData } from "./$types";
    export let data: PageData;

    let days = daysUntilBirthday(data.birthday);
    let time = getTimeIn(data.timezone);
    let created = new Date(data.fetched.blog.created);
</script>

<header>
    <div class="group border-2 border-slate-700 hover:border-slate-500 rounded-xl w-full h-32 overflow-hidden flex justify-center items-center shadow-lg">
        <span class="text-center text-5xl font-mono my-4 cursor-default -rotate-6 leading-10 text-slate-500 group-hover:text-slate-700">
            {randomStr(25)}<br>{randomStr(25)}
            {randomStr(20-data.name.length/2)}<a href={'https://github.com/'+data.github+'/5th-site'} target="_blank" class="group-hover:px-2 no-underline text-slate-300 group-hover:text-slate-100">{data.name.toUpperCase()}</a>{randomStr(20-data.name.length/2)}
            {randomStr(25)}<br>{randomStr(25)}
        </span>
    </div>
    <nav class="flex justify-center gap-4 text-lg max-w-full overflow-y-auto text-nowrap">
        <a href={'https://github.com/'+data.github} target="_blank">github</a>
        <a href={'https://discordapp.com/users/'+data.discord} target="_blank">discord</a>
        <a href={data.blog.main} target="_blank">blog</a>
    </nav>
</header>

<main>
    <article>
        <h1>{data.subtitle}</h1>
        <p>{data.description}</p>
        <p class="text-sm italic">
            <b>{days || 'Today'}</b> { days ? 'day' + (days === 1 ? '' : 's') + ' until my birthday.' : 'is my birthday!' }
            It's <b>{time}</b> for me.
        </p>
        <p class="flex flex-wrap gap-2 text-sm">
            {#each data.skills as skill}
                <a href={'https://google.com/search?q='+skill} target="_blank" class="bg-slate-900 text-sky-100 hover:bg-slate-800 px-2 py-1 rounded-full no-underline">{skill}</a>
            {/each}
        </p>
        <p class="flex flex-wrap gap-1">
            {#each Object.entries(data.links) as link, i}
                {#if i > 0}<span class="text-slate-300">~</span>{/if}
                <a href={link[1]} target="_blank">{link[0]}</a>
            {/each}
        </p>
    </article>
    <section>
        <h2 class="text-base italic m-0">Latest blog post</h2>
        <h1 class="m-0 font-normal"><a class="no-underline" href={data.fetched.blog.url} target="_blank">{data.fetched.blog.title}</a></h1>
        <p class="text-lg m-0">{months[created.getMonth()]} {created.getDate()}, {created.getFullYear()} - {data.fetched.blog.desc}</p>
    </section>
    <section>
        <h2 class="text-base italic m-0 mt-8">GitHub repositories</h2>
        <div class="flex flex-col gap-4 mt-2">
            {#each data.fetched.github as repo, i}
                <div class="flex justify-between items-center ">
                    <div>
                        <h3 class="m-0 font-normal"><a class="no-underline" href={repo.url} target="_blank">{repo.name}</a></h3>
                        <p class="m-0">{repo.desc}</p>
                    </div>
                    <div class="text-right">
                        {#if repo.lang}<span class="italic">{repo.lang}</span>{/if}<br>
                        {#if repo.stars}<span class="text-yellow-200"><b>{repo.stars}</b> star{repo.stars>1?'s':''}</span>{/if}
                    </div>
                </div>
            {/each}
        </div>
    </section>
    <section>
        <h2 class="text-base italic m-0 mt-8">Discord status</h2>
        <div class="flex flex-wrap my-4">
            {#if data.fetched.discord.spotify.song}
                <div class="m-4">
                    <div class="flex gap-2 items-center">
                        <img class="size-12 rounded-md" src={data.fetched.discord.spotify.art} alt="album art">
                        <div>
                            <h4 class="my-0"><a href={data.fetched.discord.spotify.link}>{data.fetched.discord.spotify.song}</a></h4>
                            <span class="italic">{data.fetched.discord.spotify.artist}</span>
                        </div>
                    </div>
                    <span class="italic text-sm">Listening to Spotify</span>
                </div>
            {/if}
            {#each data.fetched.discord.activity as activity}
                <div class="m-4">
                    <div class="flex gap-2 items-center">
                        <div class="relative">
                            {#if activity.images.large}
                            <img class="size-12 rounded-md" src={activity.images.large} alt="large">
                            {/if}
                            {#if activity.images.small}
                            <img class="size-6 rounded-full absolute -bottom-1 -right-1" src={activity.images.small} alt="small">
                            {/if}
                        </div>
                        <span class="italic">
                            Started {timeAgo(activity.started)}
                            {#if activity.state}
                            <br>{activity.state}
                            {/if}
                            {#if activity.details}
                            <br>{activity.details}
                            {/if}
                        </span>
                    </div>
                    <span class="italic text-sm">Playing {activity.name}</span>
                </div>
            {/each}
        </div>
        <h3 class="italic my-0 font-normal text-xl">@<span class="underline">{data.fetched.discord.username}</span> is <span class="data-[status=idle]:text-yellow-200 data-[status=dnd]:text-red-200 data-[status=online]:text-green-200" data-status={data.fetched.discord.status}>{data.fetched.discord.status}</span> in discord</h3>
    </section>
</main>
<footer>
    <p class="text-center mt-8">
        &copy; {new Date().getFullYear()} {data.legal}. All rights reserved.
    </p>
    <nav class="flex justify-center items-center gap-2">
        <a class="no-underline" href={'https://nixwebr.ing/prev/'+data.nixwebring}>&lt;</a>
        <a class="no-underline" href="https://nixwebr.ing">nixwebr.ing</a>
        <a class="no-underline" href="https://nixwebr.ing/rand">*</a>
        <a class="no-underline" href={'https://nixwebr.ing/next/'+data.nixwebring}>&gt;</a>
    </nav>
</footer>