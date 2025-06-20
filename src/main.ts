import Vue from 'vue'
import ShareLinkButton from './components/Button.vue'

Vue.prototype.OCA = window.OCA
Vue.mixin({ methods: { t, n } })

let sectionInstance = null
const View = Vue.extend(ShareLinkButton)

window.addEventListener('DOMContentLoaded', function() {
    if (OCA.Sharing && OCA.Sharing.ShareTabSections) {
        OCA.Sharing.ShareTabSections.registerSection((el, fileInfo) => {
            if (!el || !fileInfo) return
            if (sectionInstance) {
                sectionInstance.$destroy()
                sectionInstance.$el.remove()
                sectionInstance = null
            }
            sectionInstance = new View({ propsData: { fileInfo } })
            sectionInstance.$mount()
            el[0].appendChild(sectionInstance.$el)
        })
    }
})
