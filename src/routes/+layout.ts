import type { LayoutLoad } from './$types';
import info, { blog, discord, github } from '$lib';

export const ssr = true;
export const csr = false;
export const load = (async () => {
    return {
        ...info,
    };
}) satisfies LayoutLoad;