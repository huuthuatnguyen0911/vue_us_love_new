<style></style>

<template>
  <div class="MeAuthenIndentityCard">
    <h1 class="title_text">Xác thực chứng minh nhân dân</h1>
    <p class="action_text">Tải ảnh CMND hoặc CCCD</p>

    <div class="row boxCardImage">
      <div class="col-md-3">
        <div class="boxCard">
          <div class="boxImageEx">
            <img
              src="@/assets/images/page/cmnd.png"
              alt=""
              class="img_card case_1"
            />
          </div>
          <fa :icon="['fas', 'circle-check']" class="ic_check_good" />
          <p class="text">Tốt</p>
        </div>
      </div>

      <div class="col-md-3">
        <div class="boxCard">
          <div class="boxImageEx">
            <img
              src="@/assets/images/page/cmnd.png"
              alt=""
              class="img_card case_2"
            />
          </div>
          <fa :icon="['fas', 'circle-xmark']" class="ic_check_error" />
          <p class="text">Không cắt</p>
        </div>
      </div>

      <div class="col-md-3">
        <div class="boxCard">
          <div class="boxImageEx">
            <img
              src="@/assets/images/page/cmnd.png"
              alt=""
              class="img_card case_3"
            />
          </div>
          <fa :icon="['fas', 'circle-xmark']" class="ic_check_error" />
          <p class="text">Không mờ</p>
        </div>
      </div>

      <div class="col-md-3">
        <div class="boxCard">
          <div class="boxImageEx">
            <img
              src="@/assets/images/page/cmnd.png"
              alt=""
              class="img_card case_4"
            />
          </div>
          <fa :icon="['fas', 'circle-xmark']" class="ic_check_error" />
          <p class="text">Không bị lóa</p>
        </div>
      </div>
    </div>

    <ul class="listRules">
      <li class="itemRule">
        <fa :icon="['fas', 'check']" class="ic_check_rule" />
        <span class="text">Thẻ do chính phủ cấp.</span>
      </li>

      <li class="itemRule">
        <fa :icon="['fas', 'check']" class="ic_check_rule" />
        <span class="text">Thể có kích thước đầy đủ.</span>
      </li>

      <li class="itemRule">
        <fa :icon="['fas', 'check']" class="ic_check_rule" />
        <span class="text">Đặt tài liệu trên nền một màu.</span>
      </li>

      <li class="itemRule">
        <fa :icon="['fas', 'check']" class="ic_check_rule" />
        <span class="text">Hình ảnh có màu, đủ ánh sáng, có thể đọc được.</span>
      </li>

      <li class="itemRule">
        <fa :icon="['fas', 'xmark']" class="ic_check_rule" />
        <span class="text">Không có hình ảnh đen trắng.</span>
      </li>
      <li class="itemRule">
        <fa :icon="['fas', 'xmark']" class="ic_check_rule" />
        <span class="text"
          >Không có tài liệu đã qua chỉnh sửa hoặc hết hạn.</span
        >
      </li>
    </ul>

    <div class="row">
      <div class="col-md-6">
        <div class="boxUploadImage backgroundMainItem">
          <label for="updateImagePre" class="innerUpdateImage">
            <div class="boxSelect" v-if="!imagePreCard">
              <fa :icon="['fas', 'camera']" class="ic_camera" />
              <p class="text">Ảnh CMND/CCCD mặt trước</p>
            </div>
            <img :src="imagePreCard" alt="" v-else class="imageSelectSelfie" />
            <input
              type="file"
              id="updateImagePre"
              class="d-none"
              accept=".jpg, .jpeg, .png"
              @change="onSelectImagePreCard"
            />
          </label>
        </div>
      </div>
      <div class="col-md-6">
        <div class="boxUploadImage backgroundMainItem">
          <label for="updateImageAfter" class="innerUpdateImage">
            <div class="boxSelect" v-if="!imageAfterCard">
              <fa :icon="['fas', 'camera']" class="ic_camera" />
              <p class="text">Ảnh CMND/CCCD mặt sau</p>
            </div>
            <img
              :src="imageAfterCard"
              alt=""
              v-else
              class="imageSelectSelfie"
            />
            <input
              type="file"
              id="updateImageAfter"
              class="d-none"
              accept=".jpg, .jpeg, .png"
              @change="onSelectImageAfterCard"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeAuthenIndentityCard",
  data() {
    return {
      imagePreCard: null,
      imageAfterCard: null,
    };
  },
  methods: {
    onSelectImagePreCard(event) {
      const file = event.target.files[0];
      this.imagePreCard = URL.createObjectURL(file);
      this.$emit("imagePreCard", file);
    },

    onSelectImageAfterCard(event) {
      const file = event.target.files[0];
      this.imageAfterCard = URL.createObjectURL(file);
      this.$emit("imageAfterCard", file);
    },
  },
};
</script>
