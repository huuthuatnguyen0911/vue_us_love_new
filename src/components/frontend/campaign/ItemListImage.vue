<template>
  <div id="ItemListImage">
    <div class="row row-custom" v-if="dataListImages.length">
      <div
        class="col-md-3 col-custom"
        v-for="(item, index) in dataListImages"
        :key="index"
      >
        <img
          :src="convert_image(item)"
          alt=""
          class="imgDonate"
          @click="onShowPopupImage"
        />
      </div>
    </div>

    <p class="text-center" v-else>Chưa cập nhật ảnh</p>

    <Transition
      enter-active-class="animate__animated animate__zoomIn animate__faster"
      leave-active-class="animate__animated animate__zoomOut animate__faster"
    >
      <div
        class="popupImageDonate"
        v-if="isShowPopup"
        @click.self="
          {
            isShowPopup = false;
          }
        "
      >
        <div class="boxShowImage">
          <img :src="linkImage" alt="" class="imageShowCurrent" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import ConvertImage from "@/utils/convertImage";

export default {
  name: "ItemListImage",
  props: ["dataListImages"],
  data() {
    return {
      isShowPopup: false,
      linkImage: "",
    };
  },
  methods: {
    onShowPopupImage(event) {
      this.linkImage = event.target.src;
      this.isShowPopup = true;
    },
    convert_image: ConvertImage,
  },
};
</script>

<style></style>
