import Vue from 'vue'
import ShareLinkButton from './components/Button.vue'

Vue.prototype.OCA = window.OCA
Vue.mixin({ methods: { t, n } })

let sectionInstance = null
const View = Vue.extend(ShareLinkButton)

function waitForValidElement(elGetter, timeout = 2000, interval = 50) {
    return new Promise((resolve, reject) => {
        let elapsed = 0
        const check = () => {
            const el = elGetter()
            if (el && el.length > 0 && el[0] instanceof HTMLElement) {
                resolve(el[0])
            } else if ((elapsed += interval) >= timeout) {
                reject(new Error('Timeout: el[0] not available'))
            } else {
                setTimeout(check, interval)
            }
        }
        check()
    })
}

window.addEventListener('DOMContentLoaded', function() {
    if (OCA.Sharing && OCA.Sharing.ShareTabSections) {
        OCA.Sharing.ShareTabSections.registerSection((el, fileInfo) => {
            waitForValidElement(() => el)
                .then((targetEl) => {
                    el = targetEl;
                    if (!el || !fileInfo) return

                    if (sectionInstance) {
                        sectionInstance.$destroy()
                        sectionInstance.$el.remove()
                        sectionInstance = null
                    }
                    sectionInstance = new View({ propsData: { fileInfo } })
                    sectionInstance.$mount()
                    el.appendChild(sectionInstance.$el)
                })
                .catch((err) => {
                    console.warn('Could not find valid mount element:', err)
                })
        })
    }
})
