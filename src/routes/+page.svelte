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
        <div class="text-center text-5xl font-mono my-4 cursor-default -rotate-6 leading-10 text-slate-500 group-hover:text-slate-700">
            <span>{randomStr(30)}<br>{randomStr(40)}</span>
            <span class="group-hover:py-4 block">{randomStr(20-data.name.length/2)}<a href={'https://github.com/'+data.github+'/5th-site'} target="_blank" class="group-hover:px-8 no-underline text-slate-300 group-hover:text-slate-100">{data.name.toUpperCase()}</a>{randomStr(20-data.name.length/2)}</span>
            <span>{randomStr(40)}<br>{randomStr(30)}</span>
        </div>
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
                <a href={'https://google.com/search?q='+skill} target="_blank" class="bg-slate-900 text-sky-100 hover:bg-slate-800 px-2 py-1 rounded-full no-underline text-xs sm:text-sm">{skill}</a>
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
        <h2 class="text-sm sm:text-base italic m-0">Latest blog post</h2>
        <h1 class="m-0 font-normal"><a class="no-underline" href={data.fetched.blog.url} target="_blank">{data.fetched.blog.title}</a></h1>
        <p class="text-lg m-0">{months[created.getMonth()]} {created.getDate()}, {created.getFullYear()} - {data.fetched.blog.desc}</p>
    </section>
    <section>
        <h2 class="text-sm sm:text-base italic m-0 mt-8">GitHub repositories</h2>
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
        <h2 class="italic font-normal mt-8 text-base sm:text-lg flex justify-between items-center">
            <span>@<span class="underline">{data.fetched.discord.username}</span></span>
            <span class="data-[status=idle]:text-yellow-200 data-[status=dnd]:text-red-200 data-[status=online]:text-green-200" data-status={data.fetched.discord.status}><b>{data.fetched.discord.status}</b></span>
        </h2>
        <div class="flex flex-wrap sm:justify-evenly my-4">
            {#if data.fetched.discord.spotify.song}
                <div class="m-4">
                    <div class="flex gap-2 items-center">
                        <img class="size-12 rounded-md" src={data.fetched.discord.spotify.art} alt="album art">
                        <div class="max-w-64 truncate">
                            <h3 class="my-0 inline"><a href={data.fetched.discord.spotify.link}>{data.fetched.discord.spotify.song}</a></h3>
                            <br><span class="italic">{data.fetched.discord.spotify.artist}</span>
                        </div>
                    </div>
                    <span class="italic text-sm">Listening to <b>Spotify</b></span>
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
                        <span class="italic text-sm">
                            Started {timeAgo(activity.started)}
                            {#if activity.state}
                            <br>{activity.state}
                            {/if}
                            {#if activity.details}
                            <br>{activity.details}
                            {/if}
                        </span>
                    </div>
                    <span class="italic text-sm">Playing <b>{activity.name}</b></span>
                </div>
            {/each}
        </div>
    </section>
</main>
<footer class=" mt-8">
    <nav class="flex justify-center items-center gap-4 text-lg">
        <a class="no-underline px-2" href={'https://nixwebr.ing/prev/'+data.nixwebring}>&lt;</a>
        <a class="no-underline px-2" href="https://nixwebr.ing/rand">*</a>
        <a class="no-underline px-2" href={'https://nixwebr.ing/next/'+data.nixwebring}>&gt;</a>
        <a class="no-underline px-2" href="https://nixwebr.ing">?</a>
    </nav>
    <p class="text-center m-0 font-mono italic">
        curl https://satr14.my.id
    </p>
</footer>