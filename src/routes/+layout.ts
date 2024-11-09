import type { LayoutLoad } from './$types';
import info, { blog, discord, github } from '$lib';

export const ssr = true;
// export const csr = true;
export const load = (async () => {
    return {
        ...info,
        fetched: {
            discord: await discord(info.discord).catch((err) => ({
                username: '',
                status: '',
                activity: [],
                spotify: {
                    song: '',
                    art: '',
                    link: '',
                    artist: '',
                },
            })),
            github: await github(7, info.github).catch((err) => ([])),
            blog: await blog(info.blog.api, info.blog.base).catch((err) => ({
                title: 'Error',
                desc: err,
                url: info.blog.base,
                created: new Date(),
            })),
        },
    };
}) satisfies LayoutLoad;