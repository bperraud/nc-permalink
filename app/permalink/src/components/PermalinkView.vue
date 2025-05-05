<template>
	<div class="sharing-entry__summary">
		<div class="sharing-entry__desc">
			<span class="sharing-entry__title" :title="title">
				titre
			</span>
			<p v-if="subtitle">
				sous-titre
			</p>
		</div>

		<div class="sharing-entry__actions">
			<!-- clipboard -->
			<div>
				<NcActions ref="copyButton" class="sharing-entry__copy">
					<NcActionButton :aria-label="copyLinkTooltip()"
						:title="copyLinkTooltip()"
						:href="permalink"
						@click.prevent="copyLink">
						<template #icon>
							<CheckIcon v-if="copied && copySuccess"
								:size="20"
								class="icon-checkmark-color" />
							<ClipboardIcon v-else :size="20" />
						</template>
					</NcActionButton>
				</NcActions>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-console */

import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActions from '@nextcloud/vue/components/NcActions'

import { showSuccess } from '@nextcloud/dialogs'

import CheckIcon from 'vue-material-design-icons/CheckBold.vue'
import ClipboardIcon from 'vue-material-design-icons/ContentCopy.vue'

export default {

	components: {
		NcActions,
		NcActionButton,
		CheckIcon,
		ClipboardIcon,
	},

	props: {
		permalink: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			copySuccess: true,
			copied: false,
		}
	},

	computed: {

		title() {
			return 'titre'
		},

		subtitle() {
			return 'subtitle'
		},
	},

	methods: {

		async copyLink() {
			try {
				console.log('Copied permalink : ', this.permalink)
				await navigator.clipboard.writeText(this.permalink)
				showSuccess(t('files_sharing', 'Link copied'))
				// focus and show the tooltip
				this.$refs.copyButton.$el.focus()
				this.copySuccess = true
				this.copied = true
			} catch (error) {
				this.copySuccess = false
				this.copied = true
				console.error(error)
			} finally {
				setTimeout(() => {
					this.copySuccess = false
					this.copied = false
				}, 4000)
			}
		},

		copyLinkTooltip() {
			if (this.copied) {
				if (this.copySuccess) {
					return ''
				}
				return t('files_sharing', 'Cannot copy, please copy the link manually')
			}
			return t('files_sharing', 'Copy public link of "{title}" to clipboard', { title: this.title })
		},

	},
}
</script>

<style scoped>
.btn {
	margin-top: 10px;
}
</style>
