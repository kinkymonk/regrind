import z from "zod";

export const storyMediaStateSchema = z.enum([
	"PENDING",
	"APPROVED",
	"REJECTED",
	"DELETED",
]);

export const storyMediaSchema = z.object({
	mediaId: z.int(),
	thumbnailUrl: z.url(),
	fullImageUrl: z.url(),
	state: storyMediaStateSchema.nullable(),
	reason: z.string().nullable().optional(),
	isRejectAutomated: z.boolean().nullable().optional(),
	shouldBlur: z.boolean(),
	isNsfw: z.boolean(),
});
