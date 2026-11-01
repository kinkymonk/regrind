import z from "zod";

import { rightNowStatusSchema } from "../right-now";

export const storiesInboxV1QuerySchema = z.object({
	pageNumber: z.int().nonnegative(),
	pageSize: z.int().nonnegative(),
});

export const storyPosterSchema = z.object({
	profileId: z.int().nonnegative().nullable(),
	displayName: z.string().nullable(),
	mediaHash: z.string().nullable(),
	onlineUntil: z.int().nonnegative().nullable(),
	unseenStories: z.boolean(),
	isFavorite: z.boolean(),
	rightNowStatus: rightNowStatusSchema.nullable(),
});

export const storiesInboxV1ResponseSchema = z.object({
	posters: z.array(storyPosterSchema),
});

export type StoriesInboxQuery = z.infer<typeof storiesInboxV1QuerySchema>;
export type StoryPoster = z.infer<typeof storyPosterSchema>;
