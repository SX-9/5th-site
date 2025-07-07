import type { Handle } from '@sveltejs/kit';
import info from '$lib';

export const handle: Handle = async ({ event, resolve }) => !event.request.headers.get('user-agent')?.includes('curl') ? await resolve(event) : new Response(`\
\
\x1b[1m${info.subtitle}\x1b[0m
${info.description}

\x1b[2;3m${info.title} - ${event.request.headers.get('user-agent')} version ;)\x1b[0m\n\
\
`);
