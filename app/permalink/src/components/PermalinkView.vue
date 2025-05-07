<template>
	<div class="sharing-entry__summary">
		<div class="sharing-entry__desc">
			<p>
				{{ permalink }}
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

				<NcActions
					class="sharing-entry__actions"
					:aria-label="t('files_sharing', 'Actions for permalink')"
					menu-align="right"
					:open.sync="open">
					<template v-if="share">
						<NcActionButton
							:disabled="saving"
							@click.prevent="onDelete">
							<template #icon>
								<CloseIcon :size="20" />
							</template>
							{{ t('files_sharing', 'Unshare') }}
						</NcActionButton>
					</template>
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
			return t('files_sharing', 'Copy permalink to clipboard')
		},

        		/**
           * Tooltip message for actions button
           *
           * @return {string}
           */
		actionsTooltip() {
			return t('files_sharing', 'Actions for permalink')
		},

	},
}
</script>

<style scoped>
.btn {
	margin-top: 10px;
}
</style>
