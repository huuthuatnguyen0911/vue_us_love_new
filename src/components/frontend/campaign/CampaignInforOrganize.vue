<style></style>

<template>
  <div class="CampaignInforOrganize">
    <!-- <p class="titleText">Thông tin tổ chức</p>
    <p class="CO_description">
      Để có thể xác minh chiến dịch và tăng độ uy tín của chiến dịch của bạn.
      Chúng tôi cần bạn nhập thông tin tổ chức hiện tại của bạn.
    </p> -->

    <form action="javascript:void(0)" @submit.prevent class="formInforInput">
      <div class="box_avater">
        <label for="inputFileAvater" v-if="dataOrganize.CO_avatar == null">
          <fa :icon="['fas', 'user-plus']" />
          <input
            id="inputFileAvater"
            type="file"
            accept=".jpg, .jpeg, .png, .mp4"
            style="display: none"
            @change="onChageAvater"
        /></label>

        <label for="inputFileAvater" v-else>
          <img :src="currentAvtOrganize" alt="" class="img__avater" />
          <input
            id="inputFileAvater"
            type="file"
            accept=".jpg, .jpeg, .png"
            style="display: none"
            @change="onChageAvater"
        /></label>
        <p class="text">Ảnh đại diện tổ chức</p>
      </div>

      <div class="row boxLineForm">
        <div class="col-md-6">
          <div class="formGroup">
            <p class="nameInput">Tên tổ chức</p>
            <input
              type="text"
              class="inputText"
              v-model="dataOrganize.CO_name"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="formGroup">
            <p class="nameInput">Liên kết tới tổ chức</p>
            <input
              type="text"
              class="inputText"
              v-model="dataOrganize.CO_link"
            />
          </div>
        </div>
      </div>

      <div class="row boxLineForm">
        <div class="col-md-6">
          <div class="formGroup">
            <p class="nameInput">SĐT liên hệ</p>
            <input
              type="text"
              class="inputText"
              v-model="dataOrganize.CO_phone"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="formGroup">
            <p class="nameInput">Địa chỉ</p>
            <input
              type="text"
              class="inputText"
              v-model="dataOrganize.CO_location"
            />
          </div>
        </div>
      </div>

      <div class="boxLineForm">
        <div class="formGroup">
          <p class="nameInput">Mô tả</p>
          <textarea
            class="textareaInput"
            v-model="dataOrganize.CO_description"
          ></textarea>
        </div>
      </div>
    </form>
  </div>

  <div class="boxButtonHandle">
    <button
      class="btnContinue"
      @click="onEmitInforOrganize"
      :disabled="
        dataOrganize.CO_avatar == null ||
        dataOrganize.CO_name == '' ||
        dataOrganize.CO_link == '' ||
        dataOrganize.CO_phone == '' ||
        dataOrganize.CO_location == '' ||
        dataOrganize.CO_description == ''
      "
    >
      Tiếp theo
    </button>
  </div>
</template>

<script>
export default {
  name: "CampaignInforOrganize",
  data() {
    return {
      currentAvtOrganize: null,
      dataOrganize: {
        CO_avatar: null,
        CO_name: "",
        CO_link: "",
        CO_phone: "",
        CO_location: "",
        CO_description: "",
      },
    };
  },
  methods: {
    onChageAvater(event) {
      const file = event.target.files[0];
      this.dataOrganize.CO_avatar = file;
      this.currentAvtOrganize = URL.createObjectURL(file);
    },
    onEmitInforOrganize() {
      this.$emit("dataOrganize", this.dataOrganize);
    },
  },
  computed: {},
};
</script>
