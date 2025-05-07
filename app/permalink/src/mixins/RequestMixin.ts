import '@nextcloud/dialogs/style.css'

export default {
    methods: {
        refreshSidebar(fileInfo: unknown): void {
            const shareTab = OCA.Files.Sidebar.state.tabs.find(
                (e) => e.id === 'sharing',
            )
            if (shareTab) {
                shareTab.update(fileInfo)
                console.debug('Permalink: Updated share tab')
            } else {
                console.debug('Permalink: No share tab to update')
            }
        },
    },
}
