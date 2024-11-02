import type { LayoutServerLoad } from './$types';
import info, { blog, discord, github } from '$lib';

export const ssr = true;
export const load = (async () => {
    return {
        ...info,
        fetched: {
            discord: await discord(info.discord),
            github: await github(7, info.github),
            blog: await blog(info.blog.api, info.blog.base),
        },
    };
}) satisfies LayoutServerLoad;