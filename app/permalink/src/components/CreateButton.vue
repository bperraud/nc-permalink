<template>
	<div>
		<button class="btn btn-primary" @click="createPermalink">
			Create Share Link
		</button>
	</div>
</template>

<script>
/* eslint-disable no-console */

import axios from '@nextcloud/axios'

export default {

	props: {
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
				// Handle success
				console.log('Response:', response)
			} catch (e) {
				// Handle error
				if (e.response && e.response.data && e.response.data.message) {
					alert(`Error: ${e.response.data.message}`)
				} else {
					alert('An error occurred while creating the link')
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
