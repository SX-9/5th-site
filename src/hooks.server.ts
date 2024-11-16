import type { Handle } from '@sveltejs/kit';
import figlet from 'figlet';
import info from '$lib';

export const handle: Handle = async ({ event, resolve }) => {
    if (!event.request.headers.get('user-agent')?.includes('curl')) return await resolve(event); 
    else return new Response(`\
${info.title} - curl version

${await figlet.text(info.name.toUpperCase(), {
    font: "Standard",
    // @ts-expect-error
}).catch(() => info.name.toUpperCase())}

${info.description}
`);
};