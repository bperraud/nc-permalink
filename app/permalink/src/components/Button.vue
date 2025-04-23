// src/components/ShareLinkButton.vue
<template>
	<button class="btn btn-primary" @click="shareLink">
		Create Share Link
	</button>
</template>

<script>
export default {
	methods: {
		shareLink() {
			alert('Create Perma Link Button Clicked')
		},
	},
}
</script>

<style scoped>
.btn {
  margin-top: 10px;
}
</style>
