<template>
	<NcAppContent>
		<div id="permalink">
			<h1>Hello world!</h1>
		</div>
	</NcAppContent>
</template>

<script>
import NcAppContent from '@nextcloud/vue/dist/Components/NcAppContent.js'

export default {
	name: 'App',
	components: {
		NcAppContent,
	},
}
</script>

<style scoped lang="scss">
#permalink {
	display: flex;
	justify-content: center;
	margin: 16px;
}
</style>
