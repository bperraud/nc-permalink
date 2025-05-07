import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import type { AppSettings } from '../interfaces/responses/AppSettings'

export default {
    data() {
        return {
            settings: null,
        }
    },

    methods: {
        async fetchSettings(): Promise<void> {
            try {
                const response = await axios.get(
                    generateUrl('/apps/permalink/settings'),
                )
                if (response.data) {
                    this.settings = response.data
                }
            } catch (e) {
                console.error(e.response)
            }
        },
        async getSettings(): Promise<AppSettings | null> {
            if (this.settings) {
                return this.settings
            } else {
                await this.fetchSettings()
                return this.settings
            }
        },
        async getJwtSecret(): Promise<string> {
            const settings = await this.getSettings()
            return settings && settings.jwtSecretKey
                ? settings.jwtSecretKey
                : ''
        },
        async getPermalinkApiEndpoint(): Promise<string> {
            const settings = await this.getSettings()
            return settings && settings.permalinkApiEndpoint
                ? settings.permalinkApiEndpoint
                : ''
        },
    },
}
