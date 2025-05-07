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
					<NcActionButton
						@click.prevent="onDelete">
						<template #icon>
							<CloseIcon :size="20" />
						</template>
						{{ t('files_sharing', 'Delete permalink') }}
					</NcActionButton>
				</NcActions>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-console */

import axios from '@nextcloud/axios'

import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActions from '@nextcloud/vue/components/NcActions'

import { showSuccess } from '@nextcloud/dialogs'

import CloseIcon from 'vue-material-design-icons/Close.vue'
import CheckIcon from 'vue-material-design-icons/CheckBold.vue'
import ClipboardIcon from 'vue-material-design-icons/ContentCopy.vue'

import RequestMixin from '../mixins/RequestMixin.ts'

export default {

    components: {
        NcActions,
        NcActionButton,
        CheckIcon,
        ClipboardIcon,
        CloseIcon,
    },

    mixins: [RequestMixin],

    props: {
        permalink: {
            type: String,
            default: '',
        },
        fileInfo: {
            type: Object,
            default: () => {},
            required: true,
        },
    },

    data() {
        return {
            copySuccess: true,
            copied: false,
        }
    },

    methods: {

        fullFilePath() {
            if (!this.fileInfo) return ''
            return this.fileInfo.path.endsWith('/')
                ? this.fileInfo.path + this.fileInfo.name
                : this.fileInfo.path + '/' + this.fileInfo.name
        },

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

        async onDelete() {
            const link = encodeURIComponent(this.fullFilePath())
            console.log('onDelete with link', link)
            try {
                const response = await axios.delete(`/ocs/v2.php/apps/permalink/api/link?path=${link}`)
                console.log('Response:', response)
                // this.refreshSidebar(this.fileInfo)
                this.$emit('refresh')
            } catch (e) {
                if (e.response && e.response.data && e.response.data.message) {
                    console.error(e.response.data)
                } else {
                    console.error(e)
                }
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
