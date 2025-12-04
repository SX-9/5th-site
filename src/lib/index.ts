// export function blog(api: string, base?: string) {
//     return fetch(`${api}/api/collections/blogs/records?page=1&perPage=1&fields=collectionId,id,title,desc,created,thumbnail&sort=-created`)
//         .then(res => res.json())
//         .then((data: {
//             items: {
//                 collectionId: string,
//                 id: string,
//                 title: string,
//                 desc: string,
//                 created: number,
//                 thumbnail: string,
//             }[]
//         }) => {
//             const blog = data.items[0];

//             return {
//                 title: blog.title,
//                 desc: blog.desc,
//                 created: blog.created,
//                 // thumbnail: `${api}/api/files/${blog.collectionId}/${blog.id}/${blog.thumbnail}?thumb=320x160`,
//                 url: !base ? '' : `${base}/${blog.id}`,
//             };
//         });
// }

// export function github(max: number, user: string) {
//     return fetch(`https://api.github.com/users/${user}/repos?per_page=${max}?type=owner&sort=created`)
//         .then(res => res.json())
//         .then((data: 
//             {
//                 fork: boolean,
//                 name: string,
//                 description: string,
//                 html_url: string,
//                 stargazers_count: number,
//                 language: string,
//             }[]
//         ) => data.filter(repo => !repo.fork).slice(0, max).map(repo => ({
//             name: repo.name,
//             desc: repo.description,
//             url: repo.html_url,
//             stars: repo.stargazers_count,
//             lang: repo.language,
//         }))).catch((e) => [
//             { name: 'Error', desc: e.message, url: '', stars: 0, lang: '' },
//         ]);
// }

// export function discord(id: string) {
//     return fetch(`https://api.lanyard.rest/v1/users/${id}`)
//         .then(res => res.json())
//         .then(({data}: {
//             data: {
//                 discord_user: {
//                     id: string,
//                     username: string,
//                     avatar: string,
//                 },
//                 discord_status: string,
//                 spotify: {
//                     album_art_url: string,
//                     track_id: string,
//                     song: string,
//                     artist: string,
//                 },
//                 activities: {
//                     type: number,
//                     name: string,
//                     created_at: number,
//                     state: string,
//                     details: string,
//                     assets: {
//                         large_image: string,
//                         small_image: string,
//                     },
//                     application_id: string,
//                 }[],
//             }
//             success: boolean,
//         }) => ({
//             // avatar: `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`,
//             username: data.discord_user.username,
//             status: data.discord_status,
//             spotify: {
//                 art: data?.spotify?.album_art_url,
//                 link: `https://open.spotify.com/intl-id/track/${data?.spotify?.track_id}`,
//                 song: data?.spotify?.song,
//                 artist: data?.spotify?.artist,
//             },
//             activity: data?.activities.filter((a: {type:number}) =>a.type===0).map((activity: 
//                 {name: string, created_at: number, state: string, details: string, assets: {large_image: string, small_image: string}, application_id: string}
//             ) => ({
//                 name: activity.name,
//                 started: activity.created_at,
//                 state: activity.state,
//                 details: activity.details,
//                 images: {
//                     large: !activity?.assets?.large_image ? '' : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity?.assets?.large_image}.png?size=256`,
//                     small: !activity?.assets?.small_image ? '' : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity?.assets?.small_image}.png?size=256`,
//                 },
//             })).sort((a: {started:number}, b: {started:number}) => b.started - a.started) || [],
//         })).catch(() => ({
//             username: 'Error',
//             status: 'Error',
//             spotify: {
//                 art: '',
//                 link: '',
//                 song: '',
//                 artist: '',
//             },
//             activity: [],
//         }));
// }

export function daysUntilBirthday(date: number[]): number {
    const today = new Date();
    const birthday = new Date(today.getFullYear(), date[1] - 1, date[0]);
    if (today > birthday) {
        birthday.setFullYear(today.getFullYear() + 1);
    }
    // @ts-ignore
    return Math.ceil((birthday - today) / 86400000);
}

export function getTimeIn(timezone: string): string {
    const options = { timeZone: timezone, hour12: true, hour: 'numeric', minute: 'numeric' };
    // @ts-ignore
    const time = new Date().toLocaleString("en-US", options);
    return time;
}

export function timeAgo(unixTimestamp: number): string {
    const date = new Date(unixTimestamp);
    // @ts-ignore
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

export function randomStr(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'.toUpperCase();
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default {
    title: "satr14's site",
    subtitle: "Howdy!",
    name: "satr14",
    legal: "Satria",
    description: "I'm Satria, Im a self-taught hobbyist web developer and homelaber sysadmin from Indonesia. I've been programming since 2021 and I love spending my free time  working on personal projects and experimenting with new technologies.",
    skills: ["HTML", "CSS", "JavaScript", "Tailwind", "Svelte", "SvelteKit", "TypeScript", "NodeJS", "Express", "PocketBase", "Python", "Linux", "Nginx", "Docker", "Git", "Bash", "Proxmox", "Nix"],
    birthday: [12,6],
    timezone: "Asia/Jakarta",
    links: {
        "part-of.my.id": "https://part-of.my.id/",
        "fetch.sh": "https://fetch.satr14.my.id/",
        "NixOS Flakes": "https://github.com/SX-9/nix-conf",
        "Forever Maze": "https://forever-maze.satr14.my.id/",
        "Chess from scratch": "https://sx-9.github.io/chess-from-scratch/",
    },
    communities: {
        "part-of.my.id": {
            icon: "https://avatars.githubusercontent.com/u/184933425?s=200&v=4",
            role: "Founder",
            url: "https://part-of.my.id/",  
        },
        "is-a.dev": {
            icon: "https://avatars.githubusercontent.com/u/72358814?s=200&v=4",
            role: "Maintainer",
            url: "https://is-a.dev/",
        },
        "Hack Club": {
            icon: "https://assets.hackclub.com/icon-square.png",
            role: "Member",
            url: "https://hackclub.com/",
        },
    },
    socials: {
        dc: "https://discord.com/users/882595027132493864",
        gh: "https://github.com/SX-9",
        rdt: "https://reddit.com/u/Frequent_Outside_741",
        stm: "https://steamcommunity.com/id/satr14",
        mail: "mailto:admin@satr14.my.id",
    },
}
