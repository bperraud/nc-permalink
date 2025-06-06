import Vue from 'vue'
import ShareLinkButton from './components/Button.vue'

Vue.prototype.OCA = window.OCA
Vue.mixin({ methods: { t, n } })

let sectionInstance = null
let props = null
const View = Vue.extend(ShareLinkButton)

window.addEventListener('DOMContentLoaded', function() {
    if (OCA.Sharing && OCA.Sharing.ShareTabSections) {

        OCA.Sharing.ShareTabSections.registerSection((el, fileInfo) => {
            if (!el || !fileInfo) return

            if (sectionInstance && document.contains(sectionInstance.$el) && props) {
                props.fileInfo = fileInfo
            } else {
                if (sectionInstance) {
                    sectionInstance.$destroy()
                }

                sectionInstance = new View({ props: { fileInfo } })

                props = Vue.observable({
                    ...sectionInstance._props,
                    fileInfo,
                })
                sectionInstance._props = props

                sectionInstance.$mount(el[0])
            }
        })
    }
})
