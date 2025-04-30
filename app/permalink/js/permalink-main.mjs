(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".btn[data-v-3c9d0845] {\n	margin-top: 10px;\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
/*! third party licenses: js/vendor.LICENSE.txt */
const appName = "permalink";
const appVersion = "1.0.0";
import { F as normalizeComponent, s as cancelableClient, V as Vue } from "./_plugin-vue2_normalizer-Bf4r4HSS.chunk.mjs";
const _sfc_main = {
  methods: {
    async shareLink() {
      const data = {
        link: "http://nextcloud.local/index.php/s/nNbbmBxrGoNTeCT"
      };
      try {
        const response = await cancelableClient.post("/ocs/v2.php/apps/permalink/api/link", data);
        console.log("Response:", response.data);
      } catch (e) {
        if (e.response && e.response.data && e.response.data.message) {
          alert(`Error: ${e.response.data.message}`);
        } else {
          alert("An error occurred while creating the link");
          console.error(e);
        }
      }
    },
    async getPermalink() {
      const link = encodeURIComponent("/Media/photo-1527668441211-67a036f77ab4.jpeg");
      try {
        const response = await cancelableClient.get(`/ocs/v2.php/apps/permalink/api/link?path=${link}`);
        console.log("Response:", response.data);
      } catch (e) {
        if (e.response && e.response.data && e.response.data.message) {
          alert(`Error: ${e.response.data.message}`);
        } else {
          alert("An error occurred while creating the link");
          console.error(e);
        }
      }
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("button", { staticClass: "btn btn-primary", on: { "click": _vm.shareLink } }, [_vm._v(" Create Share Link ")]), _c("button", { staticClass: "btn btn-secondary", on: { "click": _vm.getPermalink } }, [_vm._v(" Get PermaLink ")])]);
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
__component__.options.__file = "/home/bperraud/code/nc-permalink/app/permalink/src/components/Button.vue";
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
