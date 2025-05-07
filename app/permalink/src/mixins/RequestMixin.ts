import '@nextcloud/dialogs/style.css'

export default {
    methods: {
        refreshSidebar(fileInfo: unknown): void {
            const shareTab = OCA.Files.Sidebar.state.tabs.find(
                (e) => e.id === 'sharing',
            )
            if (shareTab) {
                shareTab.update(fileInfo)
                console.debug('CfgShareLinks: Updated share tab')
            } else {
                console.debug('CfgShareLinks: No share tab to update')
            }
        },
    },
}
