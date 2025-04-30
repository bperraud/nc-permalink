<template>
	<div>
		<button class="btn btn-primary" @click="shareLink">
			Create Share Link
		</button>
		<button class="btn btn-secondary" @click="getPermalink">
			Get PermaLink
		</button>
	</div>
</template>

<script>
/* eslint-disable no-console */

import axios from '@nextcloud/axios'

export default {
	methods: {

		async shareLink() {
			const data = {
				link: 'http://nextcloud.local/index.php/s/nNbbmBxrGoNTeCT',
			}

			try {
				const response = await axios.post('/ocs/v2.php/apps/permalink/api/link', data)
				// Handle success
				console.log('Response:', response.data)
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

		async getPermalink() {

			const link = encodeURIComponent('/Media/photo-1527668441211-67a036f77ab4.jpeg')

			try {
				const response = await axios.get(`/ocs/v2.php/apps/permalink/api/link?path=${link}`)
				// Handle success
				console.log('Response:', response.data)
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
