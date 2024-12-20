import { createSongs } from './seeds/songs';

async function main() {
	await createSongs();
}

main();
