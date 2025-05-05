<template>
	<div>
		<button class="btn btn-secondary" @click="getPermalink">
			Get PermaLink
		</button>
		<component :is="activeButtonComponent"
			v-if="activeButtonComponent"
			:file-info="fileInfo"
			:permalink="permalink" />
	</div>
</template>

<script>
/* eslint-disable no-console */

import axios from '@nextcloud/axios'

import CreateButton from './CreateButton.vue'
import PermalinkVue from './PermalinkView.vue'

export default {

	components: {
		CreateButton,
		PermalinkVue,
	},

	props: {
		fileInfo: {
			type: Object,
			default: () => {},
			required: true,
		},
	},

	data() {
		return {
			activeButtonComponent: null,
			permalink: '',
		}
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

		async getPermalink() {
			const link = encodeURIComponent(this.fullFilePath)

			console.log('fileInfo:', this.fileInfo)
			console.log('call to getPermalink with link', link)

			try {
				const response = await axios.get(`/ocs/v2.php/apps/permalink/api/link?path=${link}`)
				// Handle success
				console.log('Response:', response.data)

				console.log('response permalink:', response.data.ocs.data.permalink)

				if (response.data.ocs.data.permalink) {
					this.permalink = response.data.ocs.data.permalink
					this.activeButtonComponent = PermalinkVue
				} else {
					this.activeButtonComponent = CreateButton
				}
				// this.activeButtonComponent =''

			} catch (e) {
				// Handle error
				if (e.response && e.response.data && e.response.data.message) {
					alert(`Error: ${e.response.data.message}`)
					console.error(e)
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
