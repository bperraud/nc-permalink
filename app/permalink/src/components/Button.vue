// src/components/ShareLinkButton.vue
<template>
  <button @click="shareLink" class="btn btn-primary">Create Share Link</button>
</template>

<script>
export default {
  methods: {
    shareLink() {
      alert('Create Perma Link Button Clicked');
    }
  }
};
</script>

<style scoped>
.btn {
  margin-top: 10px;
}
</style>

