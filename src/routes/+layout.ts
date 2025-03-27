import type { LayoutLoad } from './$types';
import info from '$lib';

export const ssr = true;
export const csr = true;
export const load = (async () => {
    return {
        ...info,
    };
}) satisfies LayoutLoad;