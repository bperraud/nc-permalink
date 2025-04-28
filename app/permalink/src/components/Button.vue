<template>
	<button class="btn btn-primary" @click="shareLink">
		Create Perma Link
	</button>
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
	},
}
</script>

<style scoped>
.btn {
  margin-top: 10px;
}
</style>
