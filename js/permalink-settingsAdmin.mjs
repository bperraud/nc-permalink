(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode(".form-error[data-v-e8c7e823] {\n  color: #c40c0c;\n  display: block;\n}\n.status-icon[data-v-e8c7e823] {\n  margin-left: 6px;\n}\n[data-v-e8c7e823] input#permalink-api-endpoint,[data-v-e8c7e823] input#jwt-secret-key {\n  width: 300px !important;\n}\n.input-with-icon[data-v-e8c7e823] {\n  display: flex;\n  align-items: center;\n}\n.input-with-icon .status-icon[data-v-e8c7e823] {\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n}"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
/*! third party licenses: js/vendor.LICENSE.txt */
const appName = "permalink";
const appVersion = "1.1.2";
import { n as normalizeComponent, c as cancelableClient, _, t as translate, V as VTooltip, C as CheckIcon, N as NcLoadingIcon, a as NcSettingsInputText, b as NcSettingsSection, s as showError, d as Vue } from "./style-CIX0O_73.chunk.mjs";
const _sfc_main$1 = {
  name: "AlertCircleIcon",
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
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon alert-circle-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$1 = [];
_sfc_render$1._withStripped = true;
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  null
);
__component__$1.options.__file = "/home/bperraud/code/nc-permalink/node_modules/vue-material-design-icons/AlertCircle.vue";
const AlertIcon = __component__$1.exports;
/*! third party licenses: js/vendor.LICENSE.txt */
var SettingsKey = /* @__PURE__ */ ((SettingsKey2) => {
  SettingsKey2["JwtSecretKey"] = "jwt_secret_key";
  SettingsKey2["PermalinkApiEndpoint"] = "permalink_api_endpoint";
  return SettingsKey2;
})(SettingsKey || {});
/*! third party licenses: js/vendor.LICENSE.txt */
var UpdateState = /* @__PURE__ */ ((UpdateState2) => {
  UpdateState2[UpdateState2["Idle"] = 0] = "Idle";
  UpdateState2[UpdateState2["Updating"] = 1] = "Updating";
  UpdateState2[UpdateState2["Completed"] = 2] = "Completed";
  UpdateState2[UpdateState2["Error"] = 3] = "Error";
  return UpdateState2;
})(UpdateState || {});
/*! third party licenses: js/vendor.LICENSE.txt */
const SettingsMixin = {
  data() {
    return {
      settings: null
    };
  },
  methods: {
    async fetchSettings() {
      try {
        const response = await cancelableClient.get(
          _("/apps/permalink/settings")
        );
        if (response.data) {
          this.settings = response.data;
        }
      } catch (e) {
        console.error(e.response);
      }
    },
    async getSettings() {
      if (this.settings) {
        return this.settings;
      } else {
        await this.fetchSettings();
        return this.settings;
      }
    },
    async getJwtSecret() {
      const settings = await this.getSettings();
      return settings && settings.jwtSecretKey ? settings.jwtSecretKey : "";
    },
    async getPermalinkApiEndpoint() {
      const settings = await this.getSettings();
      return settings && settings.permalinkApiEndpoint ? settings.permalinkApiEndpoint : "";
    }
  }
};
/*! third party licenses: js/vendor.LICENSE.txt */
const _sfc_main = {
  name: "AdminSettings",
  components: {
    NcSettingsSection,
    NcSettingsInputText,
    NcLoadingIcon,
    CheckIcon,
    AlertIcon
  },
  directives: {
    Tooltip: VTooltip
  },
  mixins: [SettingsMixin],
  data() {
    return {
      updating: {
        status: UpdateState.Idle,
        key: null
      },
      loading: true,
      jwtSecretKey: "",
      permalinkApiEndpoint: "",
      deleteConflicts: false
    };
  },
  computed: {
    UpdateState() {
      return UpdateState;
    },
    SettingsKey() {
      return SettingsKey;
    }
  },
  async mounted() {
    this.loading = true;
    this.jwtSecretKey = await this.getJwtSecret();
    this.permalinkApiEndpoint = await this.getPermalinkApiEndpoint();
    this.loading = false;
  },
  methods: {
    t: translate,
    setUpdate(key, status) {
      this.updating.status = status;
      this.updating.key = key;
    },
    async onSecretKeySubmit() {
      await this.saveSettings(SettingsKey.JwtSecretKey, this.jwtSecretKey);
    },
    async onApiEndpointSubmit() {
      await this.saveSettings(SettingsKey.PermalinkApiEndpoint, this.permalinkApiEndpoint);
    },
    async onDeleteConflictsChange(value) {
      await this.saveSettings(
        SettingsKey.DeleteRemovedShareConflicts,
        value ? "1" : "0"
      );
    },
    async saveSettings(key, value) {
      const data = {
        key,
        value
      };
      this.setUpdate(key, UpdateState.Updating);
      try {
        await cancelableClient.post(
          _("/apps/permalink/settings/save"),
          data
        );
        this.setUpdate(key, UpdateState.Completed);
      } catch (e) {
        if (e.response.data && e.response.data.message) {
          showError(translate("permalink", e.response.data.message));
        } else {
          showError(
            translate("permalink", "Error occurred while saving settings")
          );
          console.error(e.response);
        }
        this.setUpdate(key, UpdateState.Error);
      }
    }
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { attrs: { "id": "permalink-admin-settings" } }, [_c("NcSettingsSection", { attrs: { "name": _vm.t("permalink", "API Endpoint"), "description": _vm.t("permalink", "Base URL of the external Permalink API that handles link creation") } }, [_c("div", { staticClass: "input-with-icon" }, [_c("h3", [_vm.updating.key === _vm.SettingsKey.PermalinkApiEndpoint ? _c("span", { staticClass: "status-icon" }, [_vm.updating.status === _vm.UpdateState.Updating ? _c("NcLoadingIcon", { attrs: { "name": _vm.t("permalink", "Saving..."), "size": 20 } }) : _vm.updating.status === _vm.UpdateState.Completed ? _c("CheckIcon", { attrs: { "size": 20 } }) : _vm.updating.status === _vm.UpdateState.Error ? _c("AlertIcon", { attrs: { "size": 20 } }) : _vm._e()], 1) : _vm._e()]), _c("NcSettingsInputText", { attrs: { "id": "permalink-api-endpoint", "label": "", "value": _vm.permalinkApiEndpoint, "disabled": _vm.updating.status === _vm.UpdateState.Updating || _vm.loading }, on: { "update:value": function($event) {
    _vm.permalinkApiEndpoint = $event;
  }, "submit": _vm.onApiEndpointSubmit } })], 1)]), _c("NcSettingsSection", { attrs: { "name": _vm.t("permalink", "Jwt secret key"), "description": _vm.t("permalink", "Secret key used to sign JWT tokens for authenticating requests to the Permalink API. Must match the API's configuration") } }, [_c("div", { staticClass: "input-with-icon" }, [_c("h3", [_vm.updating.key === _vm.SettingsKey.JwtSecretKey ? _c("span", { staticClass: "status-icon" }, [_vm.updating.status === _vm.UpdateState.Updating ? _c("NcLoadingIcon", { attrs: { "name": _vm.t("permalink", "Saving..."), "size": 20 } }) : _vm.updating.status === _vm.UpdateState.Completed ? _c("CheckIcon", { attrs: { "size": 20 } }) : _vm.updating.status === _vm.UpdateState.Error ? _c("AlertIcon", { attrs: { "size": 20 } }) : _vm._e()], 1) : _vm._e()]), _c("NcSettingsInputText", { attrs: { "id": "jwt-secret-key", "label": "", "value": _vm.jwtSecretKey, "disabled": _vm.updating.status === _vm.UpdateState.Updating || _vm.loading }, on: { "update:value": function($event) {
    _vm.jwtSecretKey = $event;
  }, "submit": _vm.onSecretKeySubmit } })], 1)])], 1);
};
var _sfc_staticRenderFns = [];
_sfc_render._withStripped = true;
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "e8c7e823"
);
__component__.options.__file = "/home/bperraud/code/nc-permalink/src/components/AdminSettings.vue";
const AdminSettings = __component__.exports;
/*! third party licenses: js/vendor.LICENSE.txt */
console.debug("Permalink: SettingsAdmin init");
const View = Vue.extend(AdminSettings);
new View().$mount("#permalink-admin-settings");
//# sourceMappingURL=permalink-settingsAdmin.mjs.map
