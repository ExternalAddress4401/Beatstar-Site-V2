import type { PageServerLoad } from './$types';
import { prisma } from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const songs = await prisma.song.findMany();
	return { songs };
};
