<template>
	<li class="sharing-entry sharing-entry__link">
		<div class="sharing-entry__summary">
			<div class="sharing-entry__desc">
                <div class="list-item-content__wrapper">
                    <div class="list-item-content">
                        <NcAvatar
                              :is-no-user="true"
                              icon-class="avatardiv"
                              title="Permalink"
                            >
                              <template #icon>
                                <LinkVariantIcon fill-color="white" :size="18" />
                              </template>
                        </NcAvatar>
                        <div class="line-one">
                            <span class="line-one__title">
                                Lien de partage permanent
                            </span>
                        </div>
                    </div>

                </div>
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

		<NcActions class="sharing-entry__actions"
			:aria-label="t('permalink', 'Actions for permalink')"
			menu-align="right">
			<NcActionButton @click.prevent="onDelete">
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

import {
    NcAvatar
} from '@nextcloud/vue'

import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActions from '@nextcloud/vue/components/NcActions'

import { showSuccess } from '@nextcloud/dialogs'
import { generateUrl } from '@nextcloud/router'
import { t } from '@nextcloud/l10n'

import LinkVariantIcon from 'vue-material-design-icons/LinkVariant.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import ClipboardIcon from 'vue-material-design-icons/ContentCopy.vue'

import RequestMixin from '../mixins/RequestMixin.ts'

export default {

    components: {
        NcAvatar,
        NcActions,
        NcActionButton,
        CheckIcon,
        ClipboardIcon,
        CloseIcon,
        LinkVariantIcon,
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
                const response = await axios.delete(generateUrl('apps/permalink/api/link') + `?path=${link}`)
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

.avatardiv {
	background-color: #c40c0c !important;
}


.list-item__wrapper {
	position: relative;
	width: 100%;
}
// NcListItem

.list-item-content__wrapper {
  padding-left: 0; /* or reduce this value */
}

.list-item {
	display: block;
	position: relative;
	flex: 0 0 auto;
	justify-content: flex-start;
	border-radius: 32px;
	width: 100%;
	transition: background-color var(--animation-quick) ease-in-out;
	list-style: none;
	&-content__wrapper {
		display: flex;
		align-items: center;
		&--compact {
			height: 36px;
			.line-one,
			.line-two {
				margin-top: -4px;
				margin-bottom: -4px;
			}
		}
	}
	&-content {
		display: flex;
		flex: 1 1 auto;
		justify-content: space-between;
		&__main {
			flex: 1 1 auto;
			width: 0;
			margin-left: auto 0;
			&--oneline {
				display: flex;
			}
		}
		&__actions {
			flex: 0 0 auto;
			align-self: center;
			justify-content: center;
			margin-left: 4px;
		}
	}
	&__extra {
		margin-top: 4px;
	}
}

.line-one {
    margin-top: 5px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	white-space: nowrap;
	margin-left: 10px;
	overflow: hidden;
	&__title {
		overflow: hidden;
		flex-grow: 1;
		text-overflow: ellipsis;
		color: var(--color-main-text);
		font-weight: normal;
	}
	&__details {
		color: var(--color-text-maxcontrast);
		font-weight: normal;
          max-width: 200px;           /* Adjust to your needs */
          white-space: normal;        /* Allows line breaks */
          overflow-wrap: break-word;  /* Ensures long words wrap */
	}
}

.line-two {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	white-space: nowrap;
	&--bold {
		font-weight: bold;
	}
	&__subtitle {
		overflow: hidden;
		flex-grow: 1;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: var(--color-text-maxcontrast);
	}
	&__additional_elements {
		margin: 2px 4px 0 4px;
		display: flex;
		align-items: center;
	}
	&__indicator {
		margin: 0 5px;
	}
}

</style>
