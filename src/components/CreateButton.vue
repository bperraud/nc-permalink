<template>
	<div>
		<button class="btn btn-primary" @click.prevent="createPermalink">
            {{ t('permalink', 'Create Permalink') }}
		</button>
	</div>
</template>

<script>
/* eslint-disable no-console */

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import { showSuccess, showError } from '@nextcloud/dialogs'
import RequestMixin from '../mixins/RequestMixin.ts'

export default {

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

    computed: {
        fullFilePath() {
            if (!this.fileInfo) return ''
            return this.fileInfo.path.endsWith('/')
                ? this.fileInfo.path + this.fileInfo.name
                : this.fileInfo.path + '/' + this.fileInfo.name
        },
    },

    methods: {

        async createPermalink() {
            const data = {
                path: this.fullFilePath,
            }

            try {
                const response = await axios.post(generateUrl('apps/permalink/api/link'), data)
                console.log(response);
                showSuccess(t('permalink', 'Permalink created'))
                this.refreshSidebar(this.fileInfo)
                this.$emit('refresh')
            } catch (e) {
                showError(t('permalink', 'Error creating permalink'))
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
