import type { LayoutLoad } from './$types';
import info from '$lib';

export const ssr = true;
export const csr = true;
export const load = (async ({ url }) => {
    return {
        ...info,
        url: url.pathname,
    };
}) satisfies LayoutLoad;