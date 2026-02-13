import Vue from 'vue'
import ShareLinkButton from './components/Button.vue'

Vue.prototype.OCA = window.OCA
Vue.mixin({ methods: { t, n } })

let sectionInstance = null
const View = Vue.extend(ShareLinkButton)

function waitForValidElement(el, timeout = 2000, interval = 50) {
    return new Promise((resolve, reject) => {
        let elapsed = 0
        const check = () => {
            let target = null
            // Case 1: plain HTMLElement passed by NC
            if (el instanceof HTMLElement) {
                target = el
            }
            // Case 2: old behaviour: jQuery-like / NodeList
            if (!target && el && typeof el === 'object' && 'length' in el && el.length > 0 && el[0] instanceof HTMLElement) {
                target = el[0]
            }
            // Case 3: fallback: DOM lookup
            if (!target) {
                // target = document.querySelector('.sharingTab__additionalContent')
                target = document.querySelector('.sharing-tab-external-section-legacy')
            }
            if (target instanceof HTMLElement) {
                return resolve(target)
            }
            if ((elapsed += interval) >= timeout) {
                return reject(new Error('waitForTargetEl: no mount element found within timeout'))
            }
            setTimeout(check, interval)
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
