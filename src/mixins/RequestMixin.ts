import '@nextcloud/dialogs/style.css'

/* eslint-disable no-console */
export default {
    methods: {
        refreshSidebar(fileInfo: unknown): void {
            const shareTab = OCA.Files.Sidebar.state.tabs.find(
                (e) => e.id === 'sharing',
            )
            if (shareTab) {
                shareTab.update(fileInfo)
            } else {
                console.log('Permalink: No share tab to update')
            }
        },
    },
}
