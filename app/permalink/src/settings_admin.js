import Vue from 'vue'
import AdminSettings from './components/AdminSettings.vue'

console.debug('Permalink: SettingsAdmin init')

const View = Vue.extend(AdminSettings)
new View().$mount('#permalink-admin-settings')
