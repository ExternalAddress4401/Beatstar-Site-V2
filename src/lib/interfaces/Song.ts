import type { Difficulty } from '@prisma/client';

export interface Song {
	id: number;
	title: string;
	deluxe: boolean;
	bpm: number;
	difficulty: Difficulty;
	config: string;
}
