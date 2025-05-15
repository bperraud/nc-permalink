<template>
	<li class="sharing-entry sharing-entry__link">
		<div class="sharing-entry__summary">
			<div class="sharing-entry__desc">
				<p>
					{{ permalink }}
				</p>
			</div>
			<!-- clipboard -->
			<div class="sharing-entry__actions">
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

		<NcActions
			class="sharing-entry__actions"
			:aria-label="t('permalink', 'Actions for permalink')"
			menu-align="right">
			<NcActionButton
				@click.prevent="onDelete">
				<template #icon>
					<CloseIcon :size="20" />
				</template>
				{{ t('permalink', 'Delete permalink') }}
			</NcActionButton>
		</NcActions>
	</li>
</template>

<script>
/* eslint-disable no-console */

import axios from '@nextcloud/axios'

import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActions from '@nextcloud/vue/components/NcActions'

import { showSuccess } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'

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
                showSuccess(t('permalink', 'Link copied'))
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
                showSuccess(t('permalink', 'Permalink deleted'))
                this.refreshSidebar(this.fileInfo)
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
                return t('permalink', 'Cannot copy, please copy the link manually')
            }
            return t('permalink', 'Copy permalink to clipboard')
        },

        actionsTooltip() {
            return t('permalink', 'Actions for permalink')
        },

    },
}
</script>

<style lang="scss" scoped>
.btn {
	margin-top: 10px;
}

.sharing-entry {
	display: flex;
	align-items: center;
	min-height: 44px;

	&__summary {
		padding: 8px;
		padding-inline-start: 10px;
		display: flex;
		justify-content: space-between;
		flex: 1 0;
		min-width: 0;
	}

		&__desc {
			display: flex;
			flex-direction: column;
			line-height: 1.2em;

			p {
				color: var(--color-text-maxcontrast);
			}

			&__title {
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}

		&__actions {
			display: flex;
			align-items: center;
			margin-inline-start: auto;
		}

	&:not(.sharing-entry--share) &__actions {
		.new-share-link {
			border-top: 1px solid var(--color-border);
		}
	}

	:deep(.avatar-link-share) {
		background-color: var(--color-primary-element);
	}

	.sharing-entry__action--public-upload {
		border-bottom: 1px solid var(--color-border);
	}

	&__loading {
		width: 44px;
		height: 44px;
		margin: 0;
		padding: 14px;
		margin-inline-start: auto;
	}

	// put menus to the left
	// but only the first one
	.action-item {

		~.action-item,
		~.sharing-entry__loading {
			margin-inline-start: 0;
		}
	}

	.icon-checkmark-color {
		opacity: 1;
		color: var(--color-success);
	}
}

// styling for the qr-code container
.qr-code-dialog {
	display: flex;
	width: 100%;
	justify-content: center;

	&__img {
		width: 100%;
		height: auto;
	}
}
</style>
