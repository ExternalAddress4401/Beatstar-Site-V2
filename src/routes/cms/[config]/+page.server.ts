import { getParsedCMSFile } from '@externaladdress4401/beatstar-protobuf-parser/server/CMSRequester';
import type { PageServerLoad } from './$types';
import { cmsTitleSchema } from '$lib/schemas/cmsTitleSchema';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (req) => {
	const name = req.params.config;
	const result = cmsTitleSchema.safeParse(name);
	if (result.error) {
		error(400, { message: 'Invalid CMS title' });
	}

	const cms = await getParsedCMSFile(result.data);

	return { cms: JSON.stringify(cms) };
};
