<template>
	<div id="permalink-admin-settings">
		<NcSettingsSection
			:name="t('permalink', 'API Endpoint')"
			:description="t('permalink', 'Base URL of the external Permalink API that handles link creation')">
			<div>
				<h3>
					<span
						v-if="updating.key === SettingsKey.PermalinkApiEndpoint"
						class="status-icon">
						<NcLoadingIcon
							v-if="updating.status === UpdateState.Updating"
							:name="t('permalink', 'Saving...')"
							:size="20" />
						<CheckIcon
							v-else-if="updating.status === UpdateState.Completed"
							:size="20" />
						<AlertIcon
							v-else-if="updating.status === UpdateState.Error"
							:size="20" />
					</span>
				</h3>
				<NcSettingsInputText
					id="permalink-api-endpoint"
					label=""
					:value.sync="permalinkApiEndpoint"
					:disabled="updating.status === UpdateState.Updating || loading"
					@submit="onApiEndpointSubmit" />
			</div>
		</NcSettingsSection>
		<NcSettingsSection
			:name="t('permalink', 'Jwt secret key')"
			:description="t('permalink', 'Secret key used to sign JWT tokens for authenticating requests to the Permalink API. Must match the API\'s configuration')">
			<div>
				<h3>
					<span
						v-if="updating.key === SettingsKey.MinTokenLength"
						class="status-icon">
						<NcLoadingIcon
							v-if="updating.status === UpdateState.Updating"
							:name="t('permalink', 'Saving...')"
							:size="20" />
						<CheckIcon
							v-else-if="updating.status === UpdateState.Completed"
							:size="20" />
						<AlertIcon
							v-else-if="updating.status === UpdateState.Error"
							:size="20" />
					</span>
				</h3>
				<NcSettingsInputText
					id="jwt-secret-key"
					label=""
					:value.sync="jwtSecretKey"
					:disabled="updating.status === UpdateState.Updating || loading"
					@submit="onSecretKeySubmit" />
			</div>
		</NcSettingsSection>
	</div>
</template>

<script lang="ts">
import axios from '@nextcloud/axios'
import { showError } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
import {
    NcLoadingIcon,
    NcSettingsInputText,
    NcSettingsSection,
    Tooltip,
} from '@nextcloud/vue'
import AlertIcon from 'vue-material-design-icons/AlertCircle.vue'

import CheckIcon from 'vue-material-design-icons/Check.vue'
import { SettingsKey } from '../enums/SettingsKey.ts'
import { UpdateState } from '../enums/UpdateState.ts'

import SettingsMixin from '../mixins/SettingsMixin.ts'

import '@nextcloud/dialogs/style.css'

export default {
    name: 'AdminSettings',

    components: {
        NcSettingsSection,
        NcSettingsInputText,
        NcLoadingIcon,
        CheckIcon,
        AlertIcon,
    },

    directives: {
        Tooltip,
    },

    mixins: [SettingsMixin],

    data() {
        return {
            updating: {
                status: UpdateState.Idle,
                key: null,
            },
            loading: true,
            jwtSecretKey: '',
            permalinkApiEndpoint: '',
            deleteConflicts: false,
        }
    },

    computed: {
        UpdateState() {
            return UpdateState
        },
        SettingsKey() {
            return SettingsKey
        },
    },

    async mounted() {
        this.loading = true

        this.jwtSecretKey = await this.getJwtSecret()
        this.permalinkApiEndpoint = await this.getPermalinkApiEndpoint()

        this.loading = false
    },

    methods: {
        t,
        setUpdate(key, status) {
            this.updating.status = status
            this.updating.key = key
        },
        async onSecretKeySubmit() {
            await this.saveSettings(SettingsKey.JwtSecretKey, this.jwtSecretKey)
        },
        async onApiEndpointSubmit() {
            await this.saveSettings(SettingsKey.PermalinkApiEndpoint, this.permalinkApiEndpoint)
        },
        async onDeleteConflictsChange(value) {
            await this.saveSettings(
                SettingsKey.DeleteRemovedShareConflicts,
                value ? '1' : '0',
            )
        },
        async saveSettings(key, value) {
            const data = {
                key,
                value,
            }

            this.setUpdate(key, UpdateState.Updating)
            try {
                await axios.post(
                    generateUrl('/apps/permalink/settings/save'),
                    data,
                )
                this.setUpdate(key, UpdateState.Completed)
            } catch (e) {
                if (e.response.data && e.response.data.message) {
                    showError(t('permalink', e.response.data.message))
                } else {
                    showError(
                        t('permalink', 'Error occurred while saving settings'),
                    )
                    console.error(e.response)
                }
                this.setUpdate(key, UpdateState.Error)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.form-error {
	color: #c40c0c;
	display: block;
}

.status-icon {
	display: inline-block;
	margin-left: 6px;
}

::v-deep(input#permalink-api-endpoint),
::v-deep(input#jwt-secret-key) {
	width: 300px !important;
}

</style>
