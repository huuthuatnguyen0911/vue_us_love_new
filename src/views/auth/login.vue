<template>
  <AuthenDefault :bgColorMain="bg_color_main">
    <div class="box__main__login">
      <div class="box__login__right">
        <div
          class="box__login__right__inner animate__animated animate__lightSpeedInLeft"
        >
          <div class="header__box">
            <p class="header__hello">
              Chào bạn đến với <span class="name__page">Us Love</span>
            </p>
            <p class="header__title">
              Đăng nhập để tham gia các hoạt động thiện nguyện
            </p>
          </div>

          <div class="box__form__info">
            <form @submit.prevent class="form__info">
              <div class="box__form__main__group">
                <div class="form__input__group">
                  <fa :icon="['fas', 'envelope']" class="icon_input" />
                  <input
                    type="email"
                    placeholder="Nhập email"
                    class="input__infor"
                    autocomplete="off"
                    v-model="v$.dataFormLogin.email.$model"
                    required
                  />
                </div>

                <div
                  class="box__form__error"
                  :class="{ error: v$.dataFormLogin.email.$errors.length }"
                >
                  <ul
                    class="list__error"
                    v-for="error of v$.dataFormLogin.email.$errors"
                    :key="error.$uid"
                  >
                    <li class="error-msg">{{ error.$message }}</li>
                  </ul>
                </div>
              </div>

              <div class="form__input__group">
                <fa :icon="['fas', 'key']" class="icon_input" />
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  class="input__infor"
                  autocomplete="off"
                  v-model="dataFormLogin.password"
                  required
                />
              </div>

              <div class="form__btn__group">
                <div
                  class="box__button"
                  @click="onHandleLogin"
                  v-if="!isPending"
                >
                  <div class="inner__slide">
                    <fa
                      :icon="['fas', 'angles-right']"
                      class="icon__slide__btn"
                    />
                  </div>
                  <a href="javascript:void(0)" class="btn__submit">Đi thôi!</a>
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

            <div class="box__register">
              <p class="text">Chưa có tài khoản ?</p>
              <router-link :to="{ name: 'register' }" class="link__res"
                >Đăng kí</router-link
              >
            </div>

            <div class="box__hr">
              <p class="">Đăng nhập với</p>
            </div>

            <div class="login__other">
              <ul class="wrapper__list">
                <li class="icon facebook">
                  <span class="tooltip">Facebook</span>
                  <span>
                    <fa :icon="['fab', 'facebook-f']" class="icon_other" />
                  </span>
                </li>

                <li class="icon google">
                  <span class="tooltip">Google</span>
                  <span>
                    <fa :icon="['fab', 'google']" class="icon_other" />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="box__login__left">
        <div
          class="header__text__box animate__animated animate__fadeInTopRight animate__delay-2s"
        >
          <p class="slogan">" Rác thải nhựa đang giết chết sinh vật biển "</p>
          <!-- <p class="text__register">
            Bạn muốn tham gia cộng đồng của chúng tôi? <span>Đăng kí</span>
          </p> -->
        </div>

        <div
          class="box__image__fish animate__animated animate__fadeInUp animate__delay-2s"
        >
          <img
            src="@/assets/images/page/fish_1.png"
            alt=""
            @click="
              {
                this.$router.push({ name: 'home' });
              }
            "
          />
        </div>

        <div
          class="box__footer__wave animate__animated animate__fadeInUp animate__delay-1s"
        >
          <div class="box__wave">
            <svg
              class="waves"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shape-rendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g class="parallax">
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="0"
                  fill="rgba(103,222,240,0.6)"
                />
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="3"
                  fill="rgba(103,222,240,0.4)"
                />
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="5"
                  fill="rgba(103,222,240,0.2)"
                />
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="7"
                  fill="rgba(103,222,240,1)"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <NotifiView ref="componentNotifi" />
  </AuthenDefault>
</template>

<script>
import AuthenDefault from "@/layouts/authen_default.vue";
import { authService, isPending } from "@/services/authService";
import useVuelidate from "@vuelidate/core";
import { email, helpers } from "@vuelidate/validators";
import { mapActions } from "vuex";
import { loginMetamask } from "@/services/web3";

export default {
  name: "LoginPage",
  components: { AuthenDefault },
  setup: () => {
    return { v$: useVuelidate(), isPending };
  },
  data() {
    return {
      bg_color_main: "linear-gradient(105.88deg, #05DEFA 0%, #63FBD7 100%)",
      dataFormLogin: {
        email: "",
        password: "",
      },
    };
  },
  validations() {
    return {
      dataFormLogin: {
        email: {
          email: helpers.withMessage("Định dạng email chưa đúng", email),
        },
      },
    };
  },
  methods: {
    ...mapActions(["getDataUser"]),

    onShowNotifi(option) {
      this.$refs.componentNotifi.onCreateNotification(option);
    },

    async onHandleLogin() {
      if (this.dataFormLogin.email && this.dataFormLogin.password) {
        const resDataLogin = await authService.loginAccount(this.dataFormLogin);

        console.log(resDataLogin);

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
          // Log in to MetaMask
          const isMetamaskLoggedIn = await loginMetamask();
          if (!isMetamaskLoggedIn) {
            // alert("Please log in to MetaMask.");
          }
        } else {
          this.onShowNotifi({
            status: "destructive",
            message: "Đăng nhập không thành công",
            theme: "",
          });
          // console.log(resDataLogin);
        }
      } else {
        this.onShowNotifi({
          status: "destructive",
          message: "Vui lòng kiểm tra Email hoặc Mật khẩu",
          theme: "",
        });
        // console.log(resDataLogin);
      }
    },
  },
};
</script>

<style></style>
