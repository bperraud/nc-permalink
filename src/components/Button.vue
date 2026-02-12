<template>
	<div>
		<component :is="activeButtonComponent"
			:file-info="fileInfo"
			:permalink="permalink"
			@refresh="getPermalink" />
	</div>
</template>

<script>
/* eslint-disable no-console */

import { t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
import { showError } from '@nextcloud/dialogs'

import axios from '@nextcloud/axios'

import CreateButton from './CreateButton.vue'
import PermalinkVue from './PermalinkView.vue'
import RequestMixin from '../mixins/RequestMixin.ts'

export default {

    components: {
        CreateButton,
        PermalinkVue,
    },

    mixins: [RequestMixin],

    props: {
        fileInfo: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            activeButtonComponent: null,
            permalink: '',
        }
    },

    mounted() {
        this.getPermalink()
    },

    methods: {

        fullFilePath() {
            if (!this.fileInfo) return ''
            return this.fileInfo.path.endsWith('/')
                ? this.fileInfo.path + this.fileInfo.name
                : this.fileInfo.path + '/' + this.fileInfo.name
        },

        async getPermalink() {
            const link = encodeURIComponent(this.fullFilePath())

            try {
                const response = await axios.get(generateUrl('apps/permalink/api/link') + `?path=${link}`)
                if (response.data.permalink) {
                    this.permalink = response.data.permalink
                    this.activeButtonComponent = 'PermalinkVue'
                } else {
                    this.activeButtonComponent = 'CreateButton'
                }
            } catch (e) {
                if (e.response?.data?.message) {
                    console.error(e.response.data)
                    showError(t('permalink', 'Permalink: ' + e.response.data.message))
                } else {
                    console.error(e)
                }
            }
        },

    },
}
</script>

<style>
.btn {
	margin-top: 10px;
}

.sharing-tab-external-section-legacy.sharingTab__additionalContent {
    margin-top: 4px !important;
}

.sharingTab__additionalContent .sharing-entry__summary {
    padding-inline-start: 0px !important;
}
</style>
