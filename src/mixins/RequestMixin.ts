import '@nextcloud/dialogs/style.css'

import { emit } from '@nextcloud/event-bus'

export default {
    methods: {
        refreshSidebar(fileInfo) {
            emit('files:sidebar:reload', { fileInfo })
        },
    },
}
