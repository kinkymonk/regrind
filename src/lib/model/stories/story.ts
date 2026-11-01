import z from "zod";

import { storyMediaSchema } from "./story-media";

export const storySchema = z.object({
	id: z.int(),
	profileId: z.int(),
	displayName: z.string().nullable(),
	mediaHash: z.string().nullable(),
	onlineUntil: z.int().nullable(),
	distanceMeters: z.number().nullable(),
	media: z.array(storyMediaSchema).nullable(),
	caption: z.string().nullable(),
	posted: z.number().int().nullable(),
	expiration: z.number().int().nullable(),
	viewed: z.boolean(),
});

export const storyIdV1ResponseSchema = z.object({
	story: storySchema.nullable(),
});

export const storiesProfileV1ResponseSchema = z.object({
	stories: z.array(storySchema).nullable(),
});
