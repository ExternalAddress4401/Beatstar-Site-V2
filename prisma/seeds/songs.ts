import {
	LangConfig,
	LangConfigProto,
	ProtobufReader,
	SongConfig,
	SongConfigProto
} from '@externaladdress4401/beatstar-protobuf-parser';
import { getCMSFile } from '@externaladdress4401/beatstar-protobuf-parser/server/CMSRequester';
import { Song } from '../../src/lib/interfaces/Song';
import { prisma } from '../../src/lib/prisma';
import { Difficulty } from '@prisma/client';

export async function createSongs() {
	const songReader = new ProtobufReader(await getCMSFile('SongConfig')).parse(
		SongConfigProto
	) as SongConfig;
	const langReader = new ProtobufReader(await getCMSFile('LangConfig')).parse(
		LangConfigProto
	) as LangConfig;

	const songs: Song[] = [];

	const difficulties: Record<number, Difficulty> = {
		1: 'EXTREME',
		3: 'HARD',
		4: 'NORMAL'
	};

	for (const b of songReader.Beatmaps) {
		const songId = b.Song_id;
		const beatmapEntry = songReader.BeatmapVariants.find((el) => el.Song_id === songId);
		const songEntry = songReader.Songs.find((el) => el.id === songId);
		if (!songEntry || !beatmapEntry) {
			continue;
		}
		const langEntry = langReader.translations.find((el) => el.id === songEntry.SongTitleLocId);
		if (!langEntry) {
			continue;
		}
		const song = {
			id: songId,
			title: langEntry.translations[0].value,
			deluxe: beatmapEntry.hasOwnProperty('BeatmapType') ? beatmapEntry.BeatmapType == 1 : false,
			bpm: songEntry.BPM,
			difficulty: difficulties[beatmapEntry.Difficulty_id] ?? null,
			config: JSON.stringify({
				SongTemplate: {
					BaseColor: songEntry.BaseColor,
					DarkColor: songEntry.DarkColor,
					ColorGradient: songEntry.ColorGradient,
					CheckpointOutlineColour: songEntry.CheckpointOutlineColour,
					ColorGradientInGame: songEntry.ColorGradientInGame,
					StreakConfig: songEntry.StreakConfig,
					TrackIntensityGlow: songEntry.TrackIntensityGlow,
					VFXColor: songEntry.VFXColor,
					VFXAlternativeColor: songEntry
				}
			})
		};
		songs.push(song);
	}

	await prisma.song.createMany({
		data: songs
	});
}
