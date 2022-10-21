<style></style>

<template>
  <div id="layout__authen__default" :style="{ background: bgColorMain }">
    <slot />
  </div>
</template>

<script>
export default {
  name: "LayoutAuthenDefault",
  props: ["bgColorMain"],
};
</script>
