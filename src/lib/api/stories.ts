import { fetchRest } from "$lib/api/transport";
import {
	type StoriesInboxQuery,
	storiesInboxV1QuerySchema,
	storiesInboxV1ResponseSchema,
	type StoryPoster,
} from "$lib/model/stories/inbox";
import { storiesMineV1ResponseSchema } from "$lib/model/stories/mine";
import { storyReactionsV1ResponseSchema } from "$lib/model/stories/reactions";
import {
	storiesProfileV1ResponseSchema,
	storyIdV1ResponseSchema,
} from "$lib/model/stories/story";
import { urlSearchParamsCodec } from "$lib/util/url-search-params";

export async function getStoriesInbox(
	query: StoriesInboxQuery,
): Promise<StoryPoster[]> {
	const response = await fetchRest(
		"/v1/stories/inbox?" +
			new URLSearchParams(
				urlSearchParamsCodec(storiesInboxV1QuerySchema).encode(query),
			).toString(),
	).then((res) => res.jsonParsed(storiesInboxV1ResponseSchema));

	return response.posters;
}

export async function getMyStories() {
	const response = await fetchRest("/v1/stories/mine").then((res) =>
		res.jsonParsed(storiesMineV1ResponseSchema),
	);

	return response.stories;
}

export async function getStoryWithId(storyId: number) {
	const response = await fetchRest(`/v1/stories/${storyId}`).then((res) =>
		res.jsonParsed(storyIdV1ResponseSchema),
	);

	return response.story;
}

export async function deleteStoryWithId(storyId: number) {
	await fetchRest(`/v1/stories/${storyId}`, { method: "DELETE" }).then(
		(res) => res.assertOk(),
	);
}

export async function recordStoryView(storyId: number) {
	await fetchRest(`/v1/stories/${storyId}/views`, { method: "POST" }).then(
		(res) => res.assertOk(),
	);
}

export async function getReactions() {
	const response = await fetchRest("/v1/stories/reactions").then((res) =>
		res.jsonParsed(storyReactionsV1ResponseSchema),
	);

	return response.reactions;
}

export async function getProfileStories(profileId: number) {
	const response = await fetchRest(`/v1/stories/profiles/${profileId}`).then(
		(res) => res.jsonParsed(storiesProfileV1ResponseSchema),
	);

	return response.stories;
}
