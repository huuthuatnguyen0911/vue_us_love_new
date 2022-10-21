<style></style>

<template>
  <AuthenDefault :bgColorMain="bg_color_main">
    <div id="box__main__register">
      <div class="box__register__right animate__animated animate__fadeInUp">
        <div class="box_text__header">
          <p class="header__first">BẮT ĐẦU MIỄN PHÍ</p>
          <p class="header__second">TẠO TÀI KHOẢN MỚI</p>
          <p class="header__thrid">
            Bạn đã là thành viên ?
            <span
              @click="
                {
                  this.$router.push({ name: 'login' });
                }
              "
              >Đăng nhập</span
            >
          </p>
        </div>
        <div
          class="box__register__image animate__animated animate__fadeInBottomLeft"
        >
          <router-link :to="{ name: 'home' }"
            ><img src="@/assets/images/page/animal_register.png" alt=""
          /></router-link>
        </div>
      </div>
      <div class="box__register__left">
        <div
          class="box__register__left__inner animate__animated animate__lightSpeedInRight"
        >
          <form @submit.prevent class="form__info">
            <div class="box_avater">
              <label
                for="inputFileAvater"
                v-if="dataFormRegister.fileAvater == null"
              >
                <fa :icon="['fas', 'user-plus']" />
                <input
                  id="inputFileAvater"
                  type="file"
                  accept=".jpg, .jpeg, .png, .mp4"
                  style="display: none"
                  @change="onChageAvater"
              /></label>

              <label for="inputFileAvater" v-else>
                <img
                  ref="imgeAvaterVal"
                  :src="currentAvt"
                  alt=""
                  class="img__avater" />
                <input
                  id="inputFileAvater"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  style="display: none"
                  @change="onChageAvater"
              /></label>
              <p class="text">Chọn ảnh đại diện</p>
            </div>

            <div class="form__input__group">
              <fa :icon="['fas', 'user']" class="icon_input" />
              <input
                type="text"
                placeholder="Họ tên"
                class="input__infor"
                autocomplete="off"
                v-model="dataFormRegister.fullName"
              />
            </div>

            <div class="box__form__main__group">
              <div class="form__input__group">
                <fa :icon="['fas', 'envelope']" class="icon_input" />
                <input
                  type="email"
                  placeholder="Nhập email"
                  class="input__infor"
                  autocomplete="off"
                  v-model="v$.dataFormRegister.email.$model"
                />
              </div>

              <div
                class="box__form__error"
                :class="{ error: v$.dataFormRegister.email.$errors.length }"
              >
                <ul
                  class="list__error"
                  v-for="error of v$.dataFormRegister.email.$errors"
                  :key="error.$uid"
                >
                  <li class="error-msg">{{ error.$message }}</li>
                </ul>
              </div>
            </div>

            <div class="row">
              <div class="col-md-7">
                <div class="form__input__group">
                  <fa :icon="['fas', 'cake-candles']" class="icon_input" />
                  <input
                    type="date"
                    placeholder="Ngày sinh"
                    class="input__infor"
                    autocomplete="off"
                    v-model="dataFormRegister.dob"
                  />
                </div>
              </div>
              <div class="col-md-5">
                <div class="form__input__group">
                  <fa :icon="['fas', 'hourglass']" class="icon_input" />
                  <input
                    type="text"
                    placeholder="Tuổi"
                    class="input__infor"
                    autocomplete="off"
                    v-model="dataFormRegister.age"
                  />
                </div>
              </div>
            </div>

            <div class="box__form__main__group">
              <div class="form__input__group">
                <fa :icon="['fas', 'key']" class="icon_input" />
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  class="input__infor"
                  autocomplete="off"
                  v-model="v$.dataFormRegister.password.$model"
                />
              </div>

              <div
                class="box__form__error"
                :class="{ error: v$.dataFormRegister.password.$errors.length }"
              >
                <ul
                  class="list__error"
                  v-for="error of v$.dataFormRegister.password.$errors"
                  :key="error.$uid"
                >
                  <li class="error-msg">{{ error.$message }}</li>
                </ul>
              </div>
            </div>

            <div class="box__form__main__group">
              <div class="form__input__group">
                <fa :icon="['fas', 'key']" class="icon_input" />
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  class="input__infor"
                  autocomplete="off"
                  v-model="v$.dataFormRegister.comfirm_pass.$model"
                />
              </div>
              <div
                class="box__form__error"
                :class="{
                  error: v$.dataFormRegister.comfirm_pass.$errors.length,
                }"
              >
                <ul
                  class="list__error"
                  v-for="error of v$.dataFormRegister.comfirm_pass.$errors"
                  :key="error.$uid"
                >
                  <li class="error-msg">{{ error.$message }}</li>
                </ul>
              </div>
            </div>

            <div class="form__btn__group">
              <div
                class="box__button"
                @click="onSubmitRegister"
                v-if="!isPending"
              >
                <div class="inner__slide">
                  <fa
                    :icon="['fas', 'angles-right']"
                    class="icon__slide__btn"
                  />
                </div>
                <a href="javascript:void(0)" class="btn__submit__register"
                  >Đăng kí thôi!</a
                >
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
  </AuthenDefault>

  <NotifiView ref="componentNotifi" />
</template>

<script>
import AuthenDefault from "@/layouts/authen_default.vue";

import useVuelidate from "@vuelidate/core";
import { email, sameAs, minLength, helpers } from "@vuelidate/validators";
import { isPending, authService } from "@/services/authService";
import { mapActions } from "vuex";

export default {
  name: "RegisterPage",
  setup: () => {
    return { v$: useVuelidate(), isPending };
  },
  components: { AuthenDefault },
  data() {
    return {
      bg_color_main:
        "linear-gradient(150deg, rgba(98, 210, 141, 0.88) 0%, rgba(234, 245, 45, 0.79) 100%)",

      dataFormRegister: {
        fileAvater: null,
        fullName: "",
        email: "",
        dob: "",
        age: "",
        password: "",
        comfirm_pass: "",
      },

      currentAvt: "",
    };
  },
  validations() {
    return {
      dataFormRegister: {
        email: {
          email: helpers.withMessage("Định dạng email chưa đúng", email),
        },
        password: {
          minLength: helpers.withMessage(
            ({ $params }) => `Phải có ít nhất ${$params.min} kí tự`,
            minLength(8)
          ),
        },
        comfirm_pass: {
          sameAsPassword: helpers.withMessage(
            () => `Chưa khớp với mật khẩu`,
            sameAs(this.dataFormRegister.password)
          ),
        },
      },
    };
  },
  methods: {
    ...mapActions(["getDataUser"]),

    onShowNotifi(option) {
      this.$refs.componentNotifi.onCreateNotification(option);
    },

    onChageAvater(event) {
      const file = event.target.files[0];
      this.dataFormRegister.fileAvater = file;
      this.currentAvt = URL.createObjectURL(file);
    },

    parseDateYear(str) {
      let data = new Date(str);
      return data.getFullYear();
    },
    datediff(first, second) {
      return Math.round(second - first);
    },
    async onSubmitRegister() {
      let formData = new FormData();
      formData.append("image", this.dataFormRegister.fileAvater);
      formData.append("name", this.dataFormRegister.fullName);
      formData.append("email", this.dataFormRegister.email);
      formData.append("dob", this.dataFormRegister.dob);
      formData.append("age", this.dataFormRegister.age);
      formData.append("password", this.dataFormRegister.password);

      let resData = await authService.registerAccount(formData);
      console.log(resData);
      if (resData.success) {
        const resDataLogin = await authService.loginAccount({
          email: this.dataFormRegister.email,
          password: this.dataFormRegister.password,
        });

        if (resDataLogin.success) {
          localStorage.setItem("loveUseToken", resDataLogin.token);
          // this.$router.push({ name: "home" });
          authService.initAuthHeader();
          let userData = await this.getDataUser();
          if (userData.role == "user") {
            this.$router.push({ name: "home" });
          } else if (userData.role == "admin") {
            this.$router.push({ path: "/admin/blogs/all" });
          } else {
            this.$router.push({ name: "login" });
          }
        } else {
          this.onShowNotifi({
            status: "destructive",
            message: "Đăng ký không thành công",
            theme: "",
          });
        }
      }
    },
  },

  watch: {
    "dataFormRegister.dob": {
      handler(newValue) {
        this.dataFormRegister.age = this.datediff(
          Number(this.parseDateYear(newValue)),
          Number(new Date().getFullYear())
        );
      },
    },
  },
};
</script>
