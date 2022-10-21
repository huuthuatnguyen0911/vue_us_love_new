<style></style>

<template>
  <div class="boxShowSuccess animate__animated animate__tada">
    <fa :icon="['fas', 'circle-check']" class="icCheckSuccess" />
    <p class="textSuccess">
      Thông tin chiến dịch của bạn đã được gửi để quản lí kiểm duyệt. Thông tin
      chúng tôi sẽ gửi cho bạn qua email. Cảm ơn bạn đã sử dụng
    </p>
    <button class="btnReturnReport" @click="$router.push({ name: 'home' })">
      Về trang chủ
    </button>
  </div>
</template>

<script>
export default {};
</script>
