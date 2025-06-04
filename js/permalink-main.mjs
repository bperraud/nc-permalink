(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".btn[data-v-d4e7d39f] {\n	margin-top: 10px;\n}\n.btn[data-v-103bb8db] {\n  margin-top: 10px;\n}\n.sharing-entry[data-v-103bb8db] {\n  display: flex;\n  align-items: center;\n  min-height: 44px;\n}\n.sharing-entry__summary[data-v-103bb8db] {\n  padding: 8px;\n  padding-inline-start: 10px;\n  display: flex;\n  justify-content: space-between;\n  flex: 1 0;\n  min-width: 0;\n}\n.sharing-entry__desc[data-v-103bb8db] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.2em;\n}\n.sharing-entry__desc p[data-v-103bb8db] {\n  color: var(--color-text-maxcontrast);\n}\n.sharing-entry__desc__title[data-v-103bb8db] {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.sharing-entry__actions[data-v-103bb8db] {\n  display: flex;\n  align-items: center;\n  margin-inline-start: auto;\n}\n.sharing-entry:not(.sharing-entry--share) .sharing-entry__actions .new-share-link[data-v-103bb8db] {\n  border-top: 1px solid var(--color-border);\n}\n.sharing-entry[data-v-103bb8db] .avatar-link-share {\n  background-color: var(--color-primary-element);\n}\n.sharing-entry .sharing-entry__action--public-upload[data-v-103bb8db] {\n  border-bottom: 1px solid var(--color-border);\n}\n.sharing-entry__loading[data-v-103bb8db] {\n  width: 44px;\n  height: 44px;\n  margin: 0;\n  padding: 14px;\n  margin-inline-start: auto;\n}\n.sharing-entry .action-item ~ .action-item[data-v-103bb8db],\n.sharing-entry .action-item ~ .sharing-entry__loading[data-v-103bb8db] {\n  margin-inline-start: 0;\n}\n.sharing-entry .icon-checkmark-color[data-v-103bb8db] {\n  opacity: 1;\n  color: var(--color-success);\n}\n.qr-code-dialog[data-v-103bb8db] {\n  display: flex;\n  width: 100%;\n  justify-content: center;\n}\n.qr-code-dialog__img[data-v-103bb8db] {\n  width: 100%;\n  height: auto;\n}\n.btn[data-v-3c9d0845] {\n	margin-top: 10px;\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
/*! third party licenses: js/vendor.LICENSE.txt */
const appName = "permalink";
const appVersion = "1.0.0";
import { aE as normalizeComponent, f as cancelableClient, _, aJ as showSuccess, aI as showError, aH as CheckIcon, J as NcActionButton, F as NcActions, aF as translate, V as Vue } from "./style-aflcjX6b.chunk.mjs";
/*! third party licenses: js/vendor.LICENSE.txt */
const RequestMixin = {
  methods: {
    refreshSidebar(fileInfo) {
      const shareTab = OCA.Files.Sidebar.state.tabs.find(
        (e) => e.id === "sharing"
      );
      if (shareTab) {
        shareTab.update(fileInfo);
        console.debug("Permalink: Updated share tab");
      } else {
        console.debug("Permalink: No share tab to update");
      }
    }
  }
};
const _sfc_main$4 = {
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
var _sfc_render$4 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("button", { staticClass: "btn btn-primary", on: { "click": function($event) {
    $event.preventDefault();
    return _vm.createPermalink.apply(null, arguments);
  } } }, [_vm._v(" " + _vm._s(_vm.permalink) + " ")])]);
};
var _sfc_staticRenderFns$4 = [];
_sfc_render$4._withStripped = true;
var __component__$4 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  "d4e7d39f"
);
__component__$4.options.__file = "/home/bperraud/code/nc-permalink/src/components/CreateButton.vue";
const CreateButton = __component__$4.exports;
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
var _sfc_render$3 = function render2() {
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
var _sfc_render$2 = function render3() {
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
    NcActions,
    NcActionButton,
    CheckIcon,
    ClipboardIcon,
    CloseIcon
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
var _sfc_render$1 = function render4() {
  var _vm = this, _c = _vm._self._c;
  return _c("li", { staticClass: "sharing-entry sharing-entry__link" }, [_c("div", { staticClass: "sharing-entry__summary" }, [_c("div", { staticClass: "sharing-entry__desc" }, [_c("p", [_vm._v(" " + _vm._s(_vm.permalink) + " ")])]), _c("div", { staticClass: "sharing-entry__actions" }, [_c("NcActions", { ref: "copyButton", staticClass: "sharing-entry__copy" }, [_c("NcActionButton", { attrs: { "aria-label": _vm.copyLinkTooltip(), "title": _vm.copyLinkTooltip(), "href": _vm.permalink }, on: { "click": function($event) {
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
var _sfc_staticRenderFns$1 = [];
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
    this.refreshSidebar(this.fileInfo);
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
        if (response.data.ocs.data.permalink) {
          this.permalink = response.data.ocs.data.permalink;
          this.activeButtonComponent = PermalinkVue;
        } else {
          this.permalink = translate("files_sharing", "Create Permalink");
          this.activeButtonComponent = CreateButton;
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
var _sfc_render = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_vm.activeButtonComponent ? _c(_vm.activeButtonComponent, { tag: "component", attrs: { "file-info": _vm.fileInfo, "permalink": _vm.permalink }, on: { "refresh": _vm.getPermalink } }) : _vm._e()], 1);
};
var _sfc_staticRenderFns = [];
_sfc_render._withStripped = true;
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "3c9d0845"
);
__component__.options.__file = "/home/bperraud/code/nc-permalink/src/components/Button.vue";
const ShareLinkButton = __component__.exports;
/*! third party licenses: js/vendor.LICENSE.txt */
Vue.prototype.OCA = window.OCA;
Vue.mixin({ methods: { t, n } });
let sectionInstance = null;
let props = null;
const View = Vue.extend(ShareLinkButton);
window.addEventListener("DOMContentLoaded", function() {
  if (OCA.Sharing && OCA.Sharing.ShareTabSections) {
    OCA.Sharing.ShareTabSections.registerSection((el, fileInfo) => {
      if (!el || !fileInfo) return;
      if (sectionInstance && document.contains(sectionInstance.$el) && props) {
        props.fileInfo = fileInfo;
      } else {
        if (sectionInstance) {
          sectionInstance.$destroy();
        }
        sectionInstance = new View({ props: { fileInfo } });
        props = Vue.observable({
          ...sectionInstance._props,
          fileInfo
        });
        sectionInstance._props = props;
        sectionInstance.$mount(el[0]);
      }
    });
  }
});
//# sourceMappingURL=permalink-main.mjs.map
