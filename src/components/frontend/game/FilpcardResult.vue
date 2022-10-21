<style></style>

<template>
  <div id="FilpcardResult">
    <h1>Chúc mừng {{ userName }} đã hoàn thành!</h1>
    <h3>
      Thời gian hoàn thành : <span>{{ timer }}</span>
    </h3>

    <div class="boxMainButton d-flex justify-content-center">
      <button class="btnGotoHome" @click="onGoToHome">Về trang chủ</button>
      <button class="btnStartAgain" @click="onStartAgain">Bắt đầu lại</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilpcardResult",
  props: {
    timer: {
      type: String,
    },
    userName: {
      type: String,
    },
  },
  methods: {
    onStartAgain() {
      this.$emit("onStartAgain");
    },
    onGoToHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>
