<style></style>

<template>
  <div class="ReportForm">
    <div class="customRow">
      <div class="customCol leftInner backgroundMainItem">
        <p class="titleForm">Liên hệ với chúng tôi</p>
        <div class="itemInfor">
          <p class="title">{{ $t("address") + ":" }}</p>
          <p class="content">
            470, Trần Đại Nghĩa, Hòa Quý, Ngũ Hành Sơn, Đà Nẵng
          </p>
        </div>
        <div class="itemInfor">
          <p class="title">{{ $t("phoneNumber") + ":" }}</p>
          <p class="content">0383255001</p>
        </div>

        <div class="itemInfor">
          <p class="title">Email:</p>
          <p class="content">loveusanimal@gmail.com</p>
        </div>
      </div>
      <div class="customCol rightInner">
        <div
          class="boxShowSuccess animate__animated animate__tada"
          v-if="isShowSuccess"
        >
          <fa :icon="['fas', 'circle-check']" class="icCheckSuccess" />
          <p class="textSuccess">
            Cảm ơn bạn đã dũng cảm lên ánh hành vì xấu. Chúng tôi sẽ xác minh và
            khen thưởng bạn qua mail mà bạn đăng kí.
          </p>
          <button class="btnReturnReport" @click="onContinueReport">
            Tiếp tục báo cáo
          </button>
        </div>
        <div class="boxMainFormReport animate__animated animate__fadeIn" v-else>
          <p class="titleForm">Báo cáo hành vi xấu / động vật quý hiếm</p>

          <form action="javascript:void(0)" @submit.prevent>
            <div class="box__form__main__group">
              <div class="form__input__group">
                <fa :icon="['fas', 'envelope']" class="icon_input" />
                <input
                  type="email"
                  placeholder="Nhập email"
                  class="input__infor"
                  autocomplete="off"
                  v-model="v$.dataFromReport.email.$model"
                />
              </div>

              <div
                class="box__form__error"
                :class="{ error: v$.dataFromReport.email.$errors.length }"
              >
                <ul
                  class="list__error"
                  v-for="error of v$.dataFromReport.email.$errors"
                  :key="error.$uid"
                >
                  <li class="error-msg">{{ error.$message }}</li>
                </ul>
              </div>
            </div>

            <div class="form__input__group">
              <fa :icon="['fas', 'city']" class="icon_input" />
              <input
                type="text"
                placeholder="Thành phố"
                class="input__infor"
                autocomplete="off"
                v-model="dataFromReport.city"
              />
            </div>

            <div class="form__input__group">
              <fa :icon="['fas', 'city']" class="icon_input" />
              <input
                type="text"
                placeholder="Quận / huyện"
                class="input__infor"
                autocomplete="off"
                v-model="dataFromReport.district"
              />
            </div>

            <div class="form__input__group">
              <fa :icon="['fas', 'location-pin']" class="icon_input" />
              <input
                type="text"
                placeholder="Địa chỉ"
                class="input__infor"
                autocomplete="off"
                v-model="dataFromReport.address"
              />
            </div>

            <div class="form__input__group">
              <fa :icon="['fas', 'link']" class="icon_input" />
              <input
                type="text"
                placeholder="Liên kết tới bằng chứng, hoặc bằng chứng là video (Nếu có)"
                class="input__infor"
                autocomplete="off"
                v-model="dataFromReport.link"
              />
            </div>

            <div class="d-flex flex-row align-items-center mb-4">
              <div class="form__input__proof">
                <label for="inputFileProof" class="btnAddProof">
                  <fa :icon="['fas', 'plus']" />
                  <p class="text">Thêm Bằng chứng</p>
                  <input
                    id="inputFileProof"
                    type="file"
                    accept=".jpg, .jpeg, .png, .mp4, .mp3"
                    style="display: none"
                    multiple="multiple"
                    @change="onChageFileProof"
                  />
                </label>
              </div>
              <p>{{ dataFromReport.fileProof.length }} bằng chứng</p>
            </div>

            <div class="form__btn__group mt-3">
              <div
                class="box__button"
                @click="onHandleReport"
                v-if="!isPending"
              >
                <div class="inner__slide">
                  <fa
                    :icon="['fas', 'angles-right']"
                    class="icon__slide__btn"
                  />
                </div>
                <a href="javascript:void(0)" class="btn__submit">Gửi đi</a>
              </div>

              <div class="box_loading" v-else>
                <img
                  src="@/assets/images/icon/loading_icon.gif"
                  alt=""
                  class="icon_loading"
                />
                <p class="text_loading">Đang xử lý</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, helpers } from "@vuelidate/validators";
import { isPending, reportService } from "@/services/reportService";

export default {
  name: "ReportForm",
  setup: () => {
    return { v$: useVuelidate(), isPending };
  },
  data() {
    return {
      dataFromReport: {
        email: "",
        city: "",
        district: "",
        address: "",
        link: "",
        fileProof: [],
      },
      dataFromReportReset: {
        email: "",
        city: "",
        district: "",
        address: "",
        link: "",
        fileProof: [],
      },
      isShowSuccess: false,
    };
  },
  validations() {
    return {
      dataFromReport: {
        email: {
          email: helpers.withMessage("Định dạng email chưa đúng", email),
        },
      },
    };
  },
  methods: {
    onChageFileProof(event) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.dataFromReport.fileProof.push(event.target.files[i]);
      }
    },
    async onHandleReport() {
      let formData = new FormData();
      formData.append("email", this.dataFromReport.email);
      formData.append("city", this.dataFromReport.city);
      formData.append("district", this.dataFromReport.district);
      formData.append("address", this.dataFromReport.address);
      formData.append("link", this.dataFromReport.link);
      for (let i = 0; i < this.dataFromReport.fileProof.length; i++) {
        formData.append("fileProof[]", this.dataFromReport.fileProof[i]);
      }

      const resData = await reportService.sendReport(formData);
      if (resData.success) {
        this.isShowSuccess = !this.isShowSuccess;
      }
    },
    onContinueReport() {
      this.isShowSuccess = !this.isShowSuccess;
      this.dataFromReport = Object.assign(this.dataFromReportReset, {});
    },
  },
};
</script>
