<template>
	<div>
		<component :is="activeButtonComponent"
			v-if="activeButtonComponent"
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
        this.refreshSidebar(this.fileInfo)
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
                console.log('Response:', response)

                const validStatus = [200, 100, 400]

                if (!validStatus.includes(response.data.ocs.meta.statuscode)) {
                    showError(t('permalink', 'Permalink: ' + response.data.ocs.data.detail))
                } else {
                    if (response.data.ocs.data.permalink) {
                        this.permalink = response.data.ocs.data.permalink
                        this.activeButtonComponent = PermalinkVue
                    } else {
                        this.permalink = t('files_sharing', 'Create Permalink')
                        this.activeButtonComponent = CreateButton
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

<style scoped>
.btn {
	margin-top: 10px;
}
</style>
