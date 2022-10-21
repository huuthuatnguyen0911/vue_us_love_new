<style></style>

<template>
  <div class="PageNotFound">
    <div class="bg__overlay_one"></div>

    <div class="boxMainInner">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="boxNumber">
            <span class="number_1">40</span>
            <span class="number_2">4</span>
          </div>

          <div class="content">
            <p class="title_inner">OOPSY... TRANG KHÔNG TỒN TẠI</p>
            <p class="text_inner">
              Chúng tôi gợi ý cho bạn tới trang chủ trong khi chúng tôi khắc
              phục sự cố
            </p>
          </div>

          <button
            class="btn_back_to_home"
            @click="$router.push({ name: 'home' })"
          >
            Quay lại trang chủ
          </button>
        </div>
        <div class="col-md-6">
          <div class="imageBox">
            <img
              src="@/assets/images/page/image_page_not_found.png"
              alt=""
              class="image_page"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>
