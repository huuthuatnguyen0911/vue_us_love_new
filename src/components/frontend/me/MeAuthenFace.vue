<style></style>

<template>
  <div class="MeAuthenFace">
    <h1 class="title_text">Xác thực khuôn mặt</h1>
    <p class="action_text">Chụp ảnh selfie</p>

    <div class="boxExample">
      <p class="text_title_example">Ví dụ</p>

      <div class="row boxExampleContent">
        <div class="col-md-2">
          <div class="boxImageExample">
            <img
              src="@/assets/images/page/peple.jpg"
              alt=""
              class="imagePepleExample"
            />
          </div>
        </div>
        <div class="col-md-10">
          <ul class="listRules">
            <li class="itemRule">
              <fa :icon="['fas', 'check']" class="ic_check_rule" />
              <span class="text">Tự chụp với biểu cảm tự nhiên</span>
            </li>

            <li class="itemRule">
              <fa :icon="['fas', 'check']" class="ic_check_rule" />
              <span class="text"
                >Đảm bảo mặt của bạn được nhìn thấy và ở giữa, mắt của bạn phải
                mở</span
              >
            </li>

            <li class="itemRule">
              <fa :icon="['fas', 'xmark']" class="ic_check_rule" />
              <span class="text"
                >Không được dùng ảnh cắt từ chứng minh nhân dân.</span
              >
            </li>

            <li class="itemRule">
              <fa :icon="['fas', 'xmark']" class="ic_check_rule" />
              <span class="text"
                >Không được ẩn hoặc thay đổi bộ phần trên gương mặt bạn. ( Không
                sử dụng filter)</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="boxUploadImage backgroundMainItem">
      <label for="updateImageSelfie" class="innerUpdateImage">
        <div class="boxSelect" v-if="!imageSelfie">
          <fa :icon="['fas', 'camera']" class="ic_camera" />
          <p class="text">Tải ảnh lên</p>
        </div>
        <img :src="imageSelfie" alt="" v-else class="imageSelectSelfie" />
        <input
          type="file"
          id="updateImageSelfie"
          class="d-none"
          accept=".jpg, .jpeg, .png"
          @change="onSelectImageSelfie"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeAuthenFace",
  data() {
    return {
      imageSelfie: null,
    };
  },
  methods: {
    onSelectImageSelfie(event) {
      const file = event.target.files[0];
      this.imageSelfie = URL.createObjectURL(file);
      this.$emit("imageSelfie", file);
    },
  },
};
</script>
