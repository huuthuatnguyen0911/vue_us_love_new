<style></style>

<template>
  <div class="default__layout">
    <!-- <div class="test_overlay"></div> -->
    <div id="bg__overlay"></div>

    <div class="content__main">
      <div class="content__inner content__inner__left">
        <MenuDefault />
      </div>
      <div class="content__inner content__inner__middle flex-middle">
        <slot></slot>
      </div>
      <div class="content__inner content__inner__right">
        <RightDefault />
      </div>
    </div>
  </div>
</template>

<script>
import MenuDefault from "@/components/layouts/MenuDefault.vue";
import RightDefault from "@/components/layouts/RightDefault.vue";

export default {
  name: "DefaultFrontend_1",
  components: { MenuDefault, RightDefault },
};
</script>
