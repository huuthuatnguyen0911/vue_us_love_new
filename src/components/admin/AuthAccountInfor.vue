<template>
  <div id="AuthAccountInfor">
    <div class="boxImageAuth">
      <div class="row">
        <div class="col-md-6">
          <div class="boxImageInit">
            <fa
              :icon="['fas', 'image']"
              class="ic_image"
              v-if="!dataItemAccount"
            />

            <img
              id="ImageShowSelfie"
              :src="convert_image(dataItemAccount.selfie_image)"
              alt=""
              class="imageShow"
              v-else
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="boxImageInit">
            <fa
              :icon="['fas', 'image']"
              class="ic_image"
              v-if="!dataItemAccount"
            />

            <swiper
              class="swiper swiper__custom"
              :modules="modules"
              :slides-per-view="1"
              navigation
              v-else
            >
              <swiper-slide class="slide">
                <img
                  id="ImageShowIdentity_0"
                  :src="convert_image(dataItemAccount.identity_card[0])"
                  alt=""
                  class="imageShow"
                />
              </swiper-slide>

              <swiper-slide class="slide">
                <img
                  id="ImageShowIdentity_1"
                  :src="convert_image(dataItemAccount.identity_card[1])"
                  alt=""
                  class="imageShow"
                />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>

    <div class="boxInforAccount" v-if="dataItemAccount">
      <p class="title_main">Thông tin tài khoản</p>

      <form
        action="javascript:void(0)"
        @submit.prevent
        class="formInforAccount"
      >
        <div class="row">
          <div class="col-md-4">
            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                class="inputForm"
                :value="dataItemAccount.dataUser.name"
                disabled
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                :value="dataItemAccount.dataUser.email"
                class="inputForm"
                disabled
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                :value="
                  moment(dataItemAccount.dataUser.dob).format('DD-MM-YYYY')
                "
                class="inputForm"
                disabled
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                :value="dataItemAccount.dataUser.phone"
                class="inputForm"
                disabled
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                :value="dataItemAccount.dataUser.address"
                class="inputForm"
                disabled
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                :value="dataItemAccount.dataUser.activity_point"
                class="inputForm"
                disabled
              />
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="boxHandleAuth" v-if="dataItemAccount">
      <button
        class="successfully"
        :disabled="isDisableBtn"
        @click="onSubmitAuthAccount('confirm')"
      >
        Xác nhận
      </button>
      <button
        class="cancelation"
        :disabled="isDisableBtn"
        @click="onSubmitAuthAccount('unconfirm')"
      >
        Hủy bỏ
      </button>
    </div>
  </div>

  <NotifiView ref="componentNotifi" />
</template>

<script>
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";

import moment from "moment";
import ConvertImage from "@/utils/convertImage";
import {
  authAccountService,
  isPendingConfirm,
} from "@/services/authAccountService";

export default {
  name: "AuthAccountInfor",
  setup() {
    return {
      modules: [Navigation],
      isPendingConfirm,
    };
  },
  props: ["isDisableBtn", "dataItemAccount", "isSetShow"],
  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      isShow: false,
    };
  },
  mounted() {
    this.initGlassImage();
  },
  methods: {
    initGlassImage() {
      this.ImageMagnify("ImageShowSelfie", 2);
      this.ImageMagnify("ImageShowIdentity_0", 2);
      this.ImageMagnify("ImageShowIdentity_1", 2);
    },
    ImageMagnify(idImage, zoom) {
      let img, glass, w, h, bw;
      img = document.getElementById(idImage);
      if (img) {
        glass = document.createElement("div");
        glass.setAttribute("class", "img-magnifier-glass");
        img.parentElement.insertBefore(glass, img);
        glass.style.backgroundImage = `url('${img.src}')`;
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = `${img.width * zoom}px ${
          img.height * zoom
        }px`;
        bw = 3;
        w = glass.offsetWidth / 2;
        h = glass.offsetHeight / 2;

        glass.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("mouseout", () => {
          glass.style.display = "none";
        });

        glass.addEventListener("touchmove", moveMagnifier);
        img.addEventListener("touchmove", moveMagnifier);
      }

      function moveMagnifier(e) {
        let pos, x, y;
        e.preventDefault();
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;

        if (x > img.width - w / zoom) {
          x = img.width - w / zoom;
        }
        if (x < w / zoom) {
          x = w / zoom;
        }
        if (y > img.height - h / zoom) {
          y = img.height - h / zoom;
        }
        if (y < h / zoom) {
          y = h / zoom;
        }

        glass.style.left = x - w + "px";
        glass.style.top = y - h + "px";

        glass.style.backgroundPosition =
          "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
        glass.style.display = "block";
      }

      function getCursorPos(e) {
        var a,
          x = 0,
          y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
      }
    },

    async onSubmitAuthAccount(status) {
      const dataConfirm = await authAccountService.confirmAuthAccount(
        this.dataItemAccount.idUser,
        status
      );

      console.log(dataConfirm);

      if (dataConfirm.success) {
        if (dataConfirm.code == "update_success") {
          this.$refs.componentNotifi.onCreateNotification({
            status: "success",
            message: "Xác thực thành công",
            theme: "",
          });
        } else if (dataConfirm.code == "delete_success") {
          this.$refs.componentNotifi.onCreateNotification({
            status: "success",
            message: "Hủy xác thực thành công",
            theme: "",
          });
        }
      } else {
        this.$refs.componentNotifi.onCreateNotification({
          status: "destructive",
          message: "Xác thực không thành công",
          theme: "",
        });
      }

      this.$emit("onReloadAfterAuth", {
        status: this.dataItemAccount.status,
      });
    },
    convert_image: ConvertImage,
    moment: moment,
  },
  computed: {
    placeholder() {
      return !this.dataItemAccount ? "---" : "";
    },
  },
  watch: {
    dataItemAccount() {
      setTimeout(() => {
        this.initGlassImage();
      }, 1000);
    },
  },
};
</script>

<style></style>
