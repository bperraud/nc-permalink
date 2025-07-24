(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".btn[data-v-d4e7d39f] {\n	margin-top: 10px;\n}\n.btn[data-v-103bb8db] {\n  margin-top: 10px;\n}\n.sharing-entry[data-v-103bb8db] {\n  display: flex;\n  align-items: center;\n  min-height: 44px;\n}\n.sharing-entry__summary[data-v-103bb8db] {\n  padding: 8px;\n  padding-inline-start: 10px;\n  display: flex;\n  justify-content: space-between;\n  flex: 1 0;\n  min-width: 0;\n}\n.sharing-entry__desc[data-v-103bb8db] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.2em;\n}\n.sharing-entry__desc p[data-v-103bb8db] {\n  color: var(--color-text-maxcontrast);\n}\n.sharing-entry__desc__title[data-v-103bb8db] {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.sharing-entry__actions[data-v-103bb8db] {\n  display: flex;\n  align-items: center;\n  margin-inline-start: auto;\n}\n.sharing-entry:not(.sharing-entry--share) .sharing-entry__actions .new-share-link[data-v-103bb8db] {\n  border-top: 1px solid var(--color-border);\n}\n.sharing-entry[data-v-103bb8db] .avatar-link-share {\n  background-color: var(--color-primary-element);\n}\n.sharing-entry .sharing-entry__action--public-upload[data-v-103bb8db] {\n  border-bottom: 1px solid var(--color-border);\n}\n.sharing-entry__loading[data-v-103bb8db] {\n  width: 44px;\n  height: 44px;\n  margin: 0;\n  padding: 14px;\n  margin-inline-start: auto;\n}\n.sharing-entry .action-item ~ .action-item[data-v-103bb8db],\n.sharing-entry .action-item ~ .sharing-entry__loading[data-v-103bb8db] {\n  margin-inline-start: 0;\n}\n.sharing-entry .icon-checkmark-color[data-v-103bb8db] {\n  opacity: 1;\n  color: var(--color-success);\n}\n.qr-code-dialog[data-v-103bb8db] {\n  display: flex;\n  width: 100%;\n  justify-content: center;\n}\n.qr-code-dialog__img[data-v-103bb8db] {\n  width: 100%;\n  height: auto;\n}\n.avatardiv[data-v-103bb8db] {\n  background-color: #c40c0c !important;\n}\n.list-item__wrapper[data-v-103bb8db] {\n  position: relative;\n  width: 100%;\n}\n.list-item-content__wrapper[data-v-103bb8db] {\n  padding-left: 0; /* or reduce this value */\n}\n.list-item[data-v-103bb8db] {\n  display: block;\n  position: relative;\n  flex: 0 0 auto;\n  justify-content: flex-start;\n  border-radius: 32px;\n  width: 100%;\n  transition: background-color var(--animation-quick) ease-in-out;\n  list-style: none;\n}\n.list-item-content__wrapper[data-v-103bb8db] {\n  display: flex;\n  align-items: center;\n}\n.list-item-content__wrapper--compact[data-v-103bb8db] {\n  height: 36px;\n}\n.list-item-content__wrapper--compact .line-one[data-v-103bb8db],\n.list-item-content__wrapper--compact .line-two[data-v-103bb8db] {\n  margin-top: -4px;\n  margin-bottom: -4px;\n}\n.list-item-content[data-v-103bb8db] {\n  display: flex;\n  flex: 1 1 auto;\n  justify-content: space-between;\n}\n.list-item-content__main[data-v-103bb8db] {\n  flex: 1 1 auto;\n  width: 0;\n  margin-left: auto 0;\n}\n.list-item-content__main--oneline[data-v-103bb8db] {\n  display: flex;\n}\n.list-item-content__actions[data-v-103bb8db] {\n  flex: 0 0 auto;\n  align-self: center;\n  justify-content: center;\n  margin-left: 4px;\n}\n.list-item__extra[data-v-103bb8db] {\n  margin-top: 4px;\n}\n.line-one[data-v-103bb8db] {\n  margin-top: -2px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  white-space: nowrap;\n  margin-left: 10px;\n  overflow: hidden;\n}\n.line-one__title[data-v-103bb8db] {\n  overflow: hidden;\n  flex-grow: 1;\n  text-overflow: ellipsis;\n  color: var(--color-main-text);\n  font-weight: normal;\n}\n.line-one__details[data-v-103bb8db] {\n  color: var(--color-text-maxcontrast);\n  margin: 0 8px;\n  font-weight: normal;\n}\n.line-two[data-v-103bb8db] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  white-space: nowrap;\n}\n.line-two--bold[data-v-103bb8db] {\n  font-weight: bold;\n}\n.line-two__subtitle[data-v-103bb8db] {\n  overflow: hidden;\n  flex-grow: 1;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  color: var(--color-text-maxcontrast);\n}\n.line-two__additional_elements[data-v-103bb8db] {\n  margin: 2px 4px 0 4px;\n  display: flex;\n  align-items: center;\n}\n.line-two__indicator[data-v-103bb8db] {\n  margin: 0 5px;\n}\n.btn {\n	margin-top: 10px;\n}\n.sharingTab__additionalContent {\n    margin-top: 4px !important;\n}\n.sharingTab__additionalContent .sharing-entry__summary {\n    padding-inline-start: 0px !important;\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
/*! third party licenses: js/vendor.LICENSE.txt */
const appName = "permalink";
const appVersion = "1.1.1";
import { n as normalizeComponent, c as cancelableClient, _, e as showSuccess, s as showError, C as CheckIcon, f as NcActionButton, g as NcActions, h as NcAvatar, t as translate, d as Vue } from "./style-C1t3WylI.chunk.mjs";
/*! third party licenses: js/vendor.LICENSE.txt */
const RequestMixin = {
  methods: {
    refreshSidebar(fileInfo) {
      console.log("refreshSidebar");
      const shareTab = OCA.Files.Sidebar.state.tabs.find(
        (e) => e.id === "sharing"
      );
      if (shareTab) {
        shareTab.update(fileInfo);
        console.log("Permalink: Updated share tab");
      } else {
        console.log("Permalink: No share tab to update");
      }
    }
  }
};
const _sfc_main$5 = {
  mixins: [RequestMixin],
  props: {
    permalink: {
      type: String,
      default: ""
    },
    fileInfo: {
      type: Object,
      default: () => {
      },
      required: true
    }
  },
  computed: {
    fullFilePath() {
      if (!this.fileInfo) return "";
      return this.fileInfo.path.endsWith("/") ? this.fileInfo.path + this.fileInfo.name : this.fileInfo.path + "/" + this.fileInfo.name;
    }
  },
  methods: {
    async createPermalink() {
      const data = {
        path: this.fullFilePath
      };
      try {
        const response = await cancelableClient.post(_("apps/permalink/api/link"), data);
        console.log("Response:", response);
        showSuccess(t("permalink", "Permalink created"));
        this.refreshSidebar(this.fileInfo);
        this.$emit("refresh");
      } catch (e) {
        showError(t("permalink", "Error creating permalink"));
        if (e.response && e.response.data && e.response.data.message) {
          console.error(e.response.data);
        } else {
          console.error(e);
        }
      }
    }
  }
};
var _sfc_render$5 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("button", { staticClass: "btn btn-primary", on: { "click": function($event) {
    $event.preventDefault();
    return _vm.createPermalink.apply(null, arguments);
  } } }, [_vm._v(" " + _vm._s(_vm.permalink) + " ")])]);
};
var _sfc_staticRenderFns$5 = [];
_sfc_render$5._withStripped = true;
var __component__$5 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$5,
  _sfc_render$5,
  _sfc_staticRenderFns$5,
  false,
  null,
  "d4e7d39f"
);
__component__$5.options.__file = "/home/bperraud/code/nc-permalink/src/components/CreateButton.vue";
const CreateButton = __component__$5.exports;
const _sfc_main$4 = {
  name: "LinkVariantIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
};
var _sfc_render$4 = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon link-variant-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$4 = [];
_sfc_render$4._withStripped = true;
var __component__$4 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  null
);
__component__$4.options.__file = "/home/bperraud/code/nc-permalink/node_modules/vue-material-design-icons/LinkVariant.vue";
const LinkVariantIcon = __component__$4.exports;
const _sfc_main$3 = {
  name: "CloseIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
};
var _sfc_render$3 = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon close-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$3 = [];
_sfc_render$3._withStripped = true;
var __component__$3 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false,
  null,
  null
);
__component__$3.options.__file = "/home/bperraud/code/nc-permalink/node_modules/vue-material-design-icons/Close.vue";
const CloseIcon = __component__$3.exports;
const _sfc_main$2 = {
  name: "ContentCopyIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
};
var _sfc_render$2 = function render4() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon content-copy-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$2 = [];
_sfc_render$2._withStripped = true;
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  null
);
__component__$2.options.__file = "/home/bperraud/code/nc-permalink/node_modules/vue-material-design-icons/ContentCopy.vue";
const ClipboardIcon = __component__$2.exports;
const _sfc_main$1 = {
  components: {
    NcAvatar,
    NcActions,
    NcActionButton,
    CheckIcon,
    ClipboardIcon,
    CloseIcon,
    LinkVariantIcon
  },
  mixins: [RequestMixin],
  props: {
    permalink: {
      type: String,
      default: ""
    },
    fileInfo: {
      type: Object,
      default: () => {
      },
      required: true
    }
  },
  data() {
    return {
      copySuccess: true,
      copied: false
    };
  },
  methods: {
    fullFilePath() {
      if (!this.fileInfo) return "";
      return this.fileInfo.path.endsWith("/") ? this.fileInfo.path + this.fileInfo.name : this.fileInfo.path + "/" + this.fileInfo.name;
    },
    async copyLink() {
      try {
        console.log("Copied permalink : ", this.permalink);
        await navigator.clipboard.writeText(this.permalink);
        showSuccess(translate("permalink", "Link copied"));
        this.$refs.copyButton.$el.focus();
        this.copySuccess = true;
        this.copied = true;
      } catch (error) {
        this.copySuccess = false;
        this.copied = true;
        console.error(error);
      } finally {
        setTimeout(() => {
          this.copySuccess = false;
          this.copied = false;
        }, 4e3);
      }
    },
    async onDelete() {
      const link = encodeURIComponent(this.fullFilePath());
      console.log("onDelete with link", link);
      try {
        const response = await cancelableClient.delete(_("apps/permalink/api/link") + `?path=${link}`);
        console.log("Response:", response);
        showSuccess(translate("permalink", "Permalink deleted"));
        this.refreshSidebar(this.fileInfo);
        this.$emit("refresh");
      } catch (e) {
        if (e.response && e.response.data && e.response.data.message) {
          console.error(e.response.data);
        } else {
          console.error(e);
        }
      }
    },
    copyLinkTooltip() {
      if (this.copied) {
        if (this.copySuccess) {
          return "";
        }
        return translate("permalink", "Cannot copy, please copy the link manually");
      }
      return translate("permalink", "Copy permalink to clipboard");
    },
    actionsTooltip() {
      return translate("permalink", "Actions for permalink");
    }
  }
};
var _sfc_render$1 = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("li", { staticClass: "sharing-entry sharing-entry__link" }, [_c("div", { staticClass: "sharing-entry__summary" }, [_c("div", { staticClass: "sharing-entry__desc" }, [_c("div", { staticClass: "list-item-content__wrapper" }, [_c("div", { staticClass: "list-item-content" }, [_c("NcAvatar", { attrs: { "is-no-user": true, "icon-class": "avatardiv", "title": "Permalink" }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c("LinkVariantIcon", { attrs: { "fill-color": "white", "size": 18 } })];
  }, proxy: true }]) }), _vm._m(0)], 1)])]), _c("div", { staticClass: "sharing-entry__actions" }, [_c("NcActions", { ref: "copyButton", staticClass: "sharing-entry__copy" }, [_c("NcActionButton", { attrs: { "aria-label": _vm.copyLinkTooltip(), "title": _vm.copyLinkTooltip(), "href": _vm.permalink }, on: { "click": function($event) {
    $event.preventDefault();
    return _vm.copyLink.apply(null, arguments);
  } }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_vm.copied && _vm.copySuccess ? _c("CheckIcon", { staticClass: "icon-checkmark-color", attrs: { "size": 20 } }) : _c("ClipboardIcon", { attrs: { "size": 20 } })];
  }, proxy: true }]) })], 1)], 1)]), _c("NcActions", { staticClass: "sharing-entry__actions", attrs: { "aria-label": _vm.t("permalink", "Actions for permalink"), "menu-align": "right" } }, [_c("NcActionButton", { on: { "click": function($event) {
    $event.preventDefault();
    return _vm.onDelete.apply(null, arguments);
  } }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c("CloseIcon", { attrs: { "size": 20 } })];
  }, proxy: true }]) }, [_vm._v(" " + _vm._s(_vm.t("permalink", "Delete permalink")) + " ")])], 1)], 1);
};
var _sfc_staticRenderFns$1 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "line-one" }, [_c("span", { staticClass: "line-one__title" }, [_vm._v(" Permalink ")]), _c("span", { staticClass: "line-one__details" }, [_vm._v(" details ")])]);
}];
_sfc_render$1._withStripped = true;
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  "103bb8db"
);
__component__$1.options.__file = "/home/bperraud/code/nc-permalink/src/components/PermalinkView.vue";
const PermalinkVue = __component__$1.exports;
const _sfc_main = {
  components: {
    CreateButton,
    PermalinkVue
  },
  mixins: [RequestMixin],
  props: {
    fileInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeButtonComponent: null,
      permalink: ""
    };
  },
  mounted() {
    this.getPermalink();
  },
  methods: {
    fullFilePath() {
      if (!this.fileInfo) return "";
      return this.fileInfo.path.endsWith("/") ? this.fileInfo.path + this.fileInfo.name : this.fileInfo.path + "/" + this.fileInfo.name;
    },
    async getPermalink() {
      const link = encodeURIComponent(this.fullFilePath());
      try {
        const response = await cancelableClient.get(_("apps/permalink/api/link") + `?path=${link}`);
        console.log("Response:", response);
        const validStatus = [200, 100, 400];
        if (!validStatus.includes(response.data.ocs.meta.statuscode)) {
          const error = response.data.ocs.data.message ? response.data.ocs.data.message : response.data.ocs.data.detail;
          showError(translate("permalink", "Permalink: " + error));
        } else {
          if (response.data.ocs.data.permalink) {
            this.permalink = response.data.ocs.data.permalink;
            this.activeButtonComponent = "PermalinkVue";
          } else {
            this.permalink = translate("files_sharing", "Create Permalink");
            this.activeButtonComponent = "CreateButton";
          }
        }
      } catch (e) {
        if (e.response && e.response.data && e.response.data.message) {
          console.error(e.response.data);
        } else {
          console.error(e);
        }
      }
    }
  }
};
var _sfc_render = function render6() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c(_vm.activeButtonComponent, { tag: "component", attrs: { "file-info": _vm.fileInfo, "permalink": _vm.permalink }, on: { "refresh": _vm.getPermalink } })], 1);
};
var _sfc_staticRenderFns = [];
_sfc_render._withStripped = true;
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  null
);
__component__.options.__file = "/home/bperraud/code/nc-permalink/src/components/Button.vue";
const ShareLinkButton = __component__.exports;
/*! third party licenses: js/vendor.LICENSE.txt */
Vue.prototype.OCA = window.OCA;
Vue.mixin({ methods: { t, n } });
let sectionInstance = null;
const View = Vue.extend(ShareLinkButton);
function waitForValidElement(elGetter, timeout = 2e3, interval = 50) {
  return new Promise((resolve, reject) => {
    let elapsed = 0;
    const check = () => {
      const el = elGetter();
      if (el && el.length > 0 && el[0] instanceof HTMLElement) {
        resolve(el[0]);
      } else if ((elapsed += interval) >= timeout) {
        reject(new Error("Timeout: el[0] not available"));
      } else {
        setTimeout(check, interval);
      }
    };
    check();
  });
}
window.addEventListener("DOMContentLoaded", function() {
  if (OCA.Sharing && OCA.Sharing.ShareTabSections) {
    OCA.Sharing.ShareTabSections.registerSection((el, fileInfo) => {
      waitForValidElement(() => el).then((targetEl) => {
        el = targetEl;
        if (!el || !fileInfo) return;
        if (sectionInstance) {
          sectionInstance.$destroy();
          sectionInstance.$el.remove();
          sectionInstance = null;
        }
        sectionInstance = new View({ propsData: { fileInfo } });
        sectionInstance.$mount();
        el.appendChild(sectionInstance.$el);
      }).catch((err) => {
        console.warn("Could not find valid mount element:", err);
      });
    });
  }
});
//# sourceMappingURL=permalink-main.mjs.map
