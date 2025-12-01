import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const resource = url.searchParams.get('resource');
	const issuer = "https://auth.satr14.my.id";

	return new Response(
		JSON.stringify({
			subject: resource,
			links: [
				{
					rel: 'http://openid.net/specs/connect/1.0/issuer',
					href: issuer
				}
			]
		}),
		{
			headers: {
				'Content-Type': 'application/jrd+json',
				'Access-Control-Allow-Origin': '*'
			}
		}
	);
};
