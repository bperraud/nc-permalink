<template>
	<div>
		<button class="btn btn-primary" @click="createPermalink">
			{{ permalink }}
		</button>
	</div>
</template>

<script>
/* eslint-disable no-console */

import axios from '@nextcloud/axios'
import { showSuccess } from '@nextcloud/dialogs'

export default {

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
                const response = await axios.post('/ocs/v2.php/apps/permalink/api/link', data)
                console.log('Response:', response)
                showSuccess(t('permalink', 'Permalink created'));
                this.$emit('refresh')
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
