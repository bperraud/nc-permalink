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
                const validStatus = [200, 100, 400]
                if (!validStatus.includes(response.data.ocs.meta.statuscode)) {
                    const error = response.data.ocs.data.message
                        ? response.data.ocs.data.message
                        : response.data.ocs.data.detail
                    showError(t('permalink', 'Permalink: ' + error))
                } else {
                    if (response.data.ocs.data.permalink) {
                        this.permalink = response.data.ocs.data.permalink
                        this.activeButtonComponent = 'PermalinkVue'
                    } else {
                        this.activeButtonComponent = 'CreateButton'
                    }
                }
            } catch (e) {
                if (e.response && e.response.data && e.response.data.message) {
                    console.error(e.response.data)
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
