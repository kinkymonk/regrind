<script lang="ts">
	import EyeSlashIcon from "phosphor-svelte/lib/EyeSlashIcon";

	import { Button } from "$lib/components/ui/button";

	let { onSendView }: { onSendView: () => Promise<void> } = $props();

	let sending = $state(false);
</script>

<Button
	size="icon-lg"
	onclick={async () => {
		if (sending) return;
		sending = true;
		await onSendView();
		sending = false;
	}}
	variant="secondary"
	aria-label="Record profile view"
	class="size-12 border-border"
	disabled={sending}
>
	<EyeSlashIcon class="size-6" />
</Button>
