import type { Handle } from '@sveltejs/kit';
import info, { daysUntilBirthday, getTimeIn } from '$lib';

export const handle: Handle = async ({ event, resolve }) => {
    const days = daysUntilBirthday(info.birthday);
    const time = getTimeIn(info.timezone);

    if (!event.request.headers.get('user-agent')?.includes('curl')) return await resolve(event); 
    else return new Response(`\
\x1b[2J\x1b[3J\x1b[H
\x1b[1m${info.subtitle}\x1b[0m
${info.description}

\x1b[1m${days || 'Today'}\x1b[0m ${ days ? 'day' + (days === 1 ? '' : 's') + ' until my birthday.' : 'is my birthday!' } \
Its \x1b[1m${time}\x1b[0m in ${info.timezone}.

\x1b[3m${info.skills.join('\x1b[0m, \x1b[3m')}\x1b[0m

${Object.entries(info.links).map(([key, value]) => `- \x1b[1m${key}\x1b[0m: \x1b[4m${value}\x1b[0m`).join('\n')}

\x1b[1m\ github\x1b[0m: ${info.github}
\x1b[1m\ discord\x1b[0m: ${info.discord}
\x1b[1m\ blog\x1b[0m: ${info.blog.main}

\x1b[2;3m${info.title} - ${event.request.headers.get('user-agent')} version ;)\x1b[0m\n`);
};