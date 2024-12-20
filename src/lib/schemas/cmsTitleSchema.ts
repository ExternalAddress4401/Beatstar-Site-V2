import { z } from 'zod';

export const cmsTitleSchema = z.enum([
	'GameConfig',
	'LangConfig',
	'AssetsPatchConfig',
	'AudioConfig',
	'ScalingConfig',
	'NotificationConfig',
	'FontFallbackConfig',
	'SongConfig'
]);
