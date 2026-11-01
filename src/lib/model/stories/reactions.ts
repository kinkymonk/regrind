import z from "zod";

export const storyReactionV1Schema = z.object({
	id: z.int(),
	type: z.string(),
	value: z.string(),
});

export const storyReactionsV1ResponseSchema = z.object({
	reactions: z.array(storyReactionV1Schema),
});
