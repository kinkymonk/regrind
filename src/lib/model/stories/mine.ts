import z from "zod";

import { storyMediaSchema } from "./story-media";

export const storyStatusSchema = z.enum([
	"PENDING",
	"ACTIVE",
	"REJECTED",
	"EXPIRED",
]);

export const storyViewSchema = z.object({
	profileId: z.int(),
	timestamp: z.int(),
});

export const storyCaptionTextStatusSchema = z.enum([
	"AWAITING_MODERATION",
	"MODERATION_APPROVED",
	"MODERATION_FAILED",
]);

export const storyCaptionTextRejectReasonSchema = z.enum([
	"BULLYING",
	"SELF_HARM",
	"DRUG_PATTERNS",
	"HATE_SPEECH",
	"SOL_SEX",
	"SPAM_DISRUPT",
	"UNDERAGE",
]);

export const storyAudienceSchema = z.enum([
	"EVERYONE",
	"NEARBY",
	"FAVORITES",
	"MESSAGED",
	"ALBUM_SHARED",
]);

export const storyCaption = z.object({
	text: z.string().nullable(),
	textStatus: storyCaptionTextStatusSchema.nullable(),
	rejectReasons: z.array(storyCaptionTextRejectReasonSchema).nullable(),
});

export const storyMineSchema = z.object({
	id: z.int(),
	status: storyStatusSchema.nullable(),
	media: z.array(storyMediaSchema).nullable(),
	caption: storyCaption.nullable(),
	audience: z.array(storyAudienceSchema),
	createdAt: z.number().int(),
	posted: z.number().int(),
	expiration: z.number().int(),
	views: z.array(storyViewSchema).nullable(),
});

export const storiesMineV1ResponseSchema = z.object({
	stories: z.array(storyMineSchema).nullable(),
});

export const storiesV1PostSchema = z.object({
	text: z.string().optional(),
	audience: z.array(storyAudienceSchema),
	media: z.object({
		type: z.enum(["image_v1"]),
		data: z.object({ id: z.int().nonnegative() }),
	}),
});
