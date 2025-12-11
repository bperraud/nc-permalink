// import Vue from 'vue'
// import ShareLinkButton from './components/Button.vue'

// Vue.prototype.OCA = window.OCA //global namespace
// Vue.mixin({ methods: { t, n } }) //global mixin that adds t and n (translation helpers) method to every component

// let sectionInstance = null
// const View = Vue.extend(ShareLinkButton)

// function waitForValidElement(elGetter, timeout = 2000, interval = 50) {
//     return new Promise((resolve, reject) => {
//         let elapsed = 0
//         const check = () => {
//             const el = elGetter()
//             if (el && el.length > 0 && el[0] instanceof HTMLElement) {
//                 resolve(el[0])
//             } else if ((elapsed += interval) >= timeout) {
//                 reject(new Error('Timeout: el[0] not available'))
//             } else {
//                 setTimeout(check, interval)
//             }
//         }
//         check()
//     })
// }

// window.addEventListener('DOMContentLoaded', function() {
//     if (OCA.Sharing && OCA.Sharing.ShareTabSections) {
//         OCA.Sharing.ShareTabSections.registerSection((el, fileInfo) => {
//             waitForValidElement(() => el)
//                 .then((targetEl) => {
//                     el = targetEl;
//                     if (!el || !fileInfo) return

//                     if (sectionInstance) {
//                         sectionInstance.$destroy()
//                         sectionInstance.$el.remove()
//                         sectionInstance = null
//                     }
//                     sectionInstance = new View({ propsData: { fileInfo } })
//                     sectionInstance.$mount()
//                     el.appendChild(sectionInstance.$el)
//                 })
//                 .catch((err) => {
//                     console.warn('Could not find valid mount element:', err)
//                 })
//         })
//     }
// })
//
import Vue from 'vue'
import ShareLinkButton from './components/Button.vue'

console.log('[permalink] script loaded')

// global namespace + translations
Vue.prototype.OCA = window.OCA // global namespace
Vue.mixin({ methods: { t, n } }) // global mixin that adds t and n (translation helpers) method to every component

let sectionInstance = null
const View = Vue.extend(ShareLinkButton)

function waitForValidElement(elGetter, timeout = 2000, interval = 50) {
    console.log('[permalink] waitForValidElement called. timeout =', timeout, 'interval =', interval)

    return new Promise((resolve, reject) => {
        let elapsed = 0

        const check = () => {
            let el
            try {
                el = elGetter()
            } catch (e) {
                console.error('[permalink] elGetter threw', e)
                return reject(e)
            }

            const isHTMLElement = el instanceof HTMLElement
            const hasLength = el && typeof el.length === 'number'
            const firstIsHTMLElement = hasLength && el[0] instanceof HTMLElement

            console.log('[permalink] waitForValidElement check:', {
                elapsed,
                el,
                isHTMLElement,
                hasLength,
                firstIsHTMLElement,
                length: hasLength ? el.length : undefined,
            })

            // NEW: also accept plain HTMLElement (in case API changed)
            if (isHTMLElement) {
                console.log('[permalink] waitForValidElement: got plain HTMLElement')
                return resolve(el)
            }

            if (firstIsHTMLElement) {
                console.log('[permalink] waitForValidElement: got array-like, returning el[0]')
                return resolve(el[0])
            }

            if ((elapsed += interval) >= timeout) {
                console.warn('[permalink] waitForValidElement timeout, el was:', el)
                return reject(new Error('Timeout: el[0] not available'))
            }

            setTimeout(check, interval)
        }

        check()
    })
}

window.addEventListener('DOMContentLoaded', function() {
    console.log('[permalink] DOMContentLoaded fired')

    if (!window.OCA) {
        console.warn('[permalink] OCA is not defined on window')
        return
    }

    console.log('[permalink] OCA keys:', Object.keys(window.OCA))

    if (!OCA.Sharing) {
        console.warn('[permalink] OCA.Sharing is not available')
        return
    }

    console.log('[permalink] OCA.Sharing keys:', Object.keys(OCA.Sharing))

    if (!OCA.Sharing.ShareTabSections) {
        console.warn('[permalink] OCA.Sharing.ShareTabSections is not available')
        return
    }

    console.log(
        '[permalink] ShareTabSections object:',
        OCA.Sharing.ShareTabSections,
        'registerSection =',
        OCA.Sharing.ShareTabSections.registerSection
    )

    try {
        OCA.Sharing.ShareTabSections.registerSection((el, fileInfo) => {
            console.log('[permalink] registerSection callback called', {
                el,
                elType: typeof el,
                elInstanceOfHTMLElement: el instanceof HTMLElement,
                elHasLength: el && typeof el.length === 'number',
                elLength: el && typeof el.length === 'number' ? el.length : undefined,
                fileInfo,
            })

            // guard: if fileInfo is missing we bail early
            if (!fileInfo) {
                console.warn('[permalink] registerSection: fileInfo missing, aborting')
                return
            }

            waitForValidElement(() => el)
                .then((targetEl) => {
                    console.log('[permalink] waitForValidElement resolved with:', targetEl, 'instanceof HTMLElement =', targetEl instanceof HTMLElement)
                    el = targetEl

                    if (!el) {
                        console.warn('[permalink] resolved el is falsy, aborting')
                        return
                    }

                    if (sectionInstance) {
                        console.log('[permalink] destroying previous sectionInstance')
                        try {
                            sectionInstance.$destroy()
                        } catch (e) {
                            console.error('[permalink] error during $destroy', e)
                        }
                        try {
                            sectionInstance.$el.remove()
                        } catch (e) {
                            console.error('[permalink] error removing $el', e)
                        }
                        sectionInstance = null
                    }

                    console.log('[permalink] creating new View instance with fileInfo:', fileInfo)
                    sectionInstance = new View({ propsData: { fileInfo } })

                    try {
                        sectionInstance.$mount()
                        console.log('[permalink] sectionInstance mounted, $el =', sectionInstance.$el)
                    } catch (e) {
                        console.error('[permalink] error during $mount', e)
                        return
                    }

                    try {
                        el.appendChild(sectionInstance.$el)
                        console.log('[permalink] sectionInstance appended into el')
                    } catch (e) {
                        console.error('[permalink] error appending $el to el', e)
                    }
                })
                .catch((err) => {
                    console.warn('Could not find valid mount element:', err)
                })
        })

        console.log('[permalink] registerSection call completed (callback registered)')
    } catch (e) {
        console.error('[permalink] error calling ShareTabSections.registerSection', e)
    }
})

