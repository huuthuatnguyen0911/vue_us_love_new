<template>
  <div class="popupShowInfo" @click.self="closePopup" v-if="isShowPopupByName">
    <div class="boxInnerPopup">
      <div class="boxMainDescribe" v-if="isShowPopupByName == 'describe'">
        <p class="nameAnimal">{{ dataShowPopup.name }}</p>
        <div class="contentBox" v-html="dataShowPopup.description"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isShowPopupByName", "dataShowPopup"],
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style></style>
