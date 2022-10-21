<style lang="scss"></style>

<template>
  <Transition
    enter-active-class="animate__animated animate__zoomIn animate__faster"
    leave-active-class="animate__animated animate__zoomOut animate__faster"
  >
    <div
      class="box__popup__campaign__content"
      v-if="statusShowPopup"
      @click.self="onClosePopup"
    >
      <div class="box__content__inner row">
        <div class="col-md-6 col-sm-12">
          <div class="box__item__grid box__item__left">
            <p class="title">
              {{ dataCurrentCampaign.name }}
            </p>
            <p class="description">
              {{ dataCurrentCampaign.description }}
            </p>
            <div class="row box__timeline">
              <div class="col-md-6">
                <div class="col__inner--left">
                  <p class="box__user">
                    Người tham gia: <span class="quantity_user">134</span>
                  </p>
                  <ul class="list__join__user">
                    <li class="item__join__user">
                      <img src="@/assets/images/img_avatar.png" alt="" />
                      <p class="name">Adeyinka Johnson</p>
                    </li>
                    <li class="item__join__user">
                      <img src="@/assets/images/img_avatar.png" alt="" />
                      <p class="name">Adeyinka Johnson</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6">
                <div class="col__inner--right">
                  <p class="infor__text">
                    <span class="title">Thể loại: </span
                    >{{ dataCurrentCampaign.category }}
                  </p>

                  <p class="infor__text">
                    <span class="title">Thời gian: </span
                    >{{ dataCurrentCampaign.date }}
                  </p>

                  <p class="infor__text">
                    <span class="title">Địa điểm: </span
                    >{{ dataCurrentCampaign.location }}
                  </p>

                  <p class="infor__text">
                    <span class="title">Tổ chức: </span
                    >{{ dataCurrentCampaign.organizer }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="box__item__grid box__item__right">
            <img
              :src="dataCurrentCampaign.img"
              alt=""
              class="img__main__campaign"
            />

            <div class="row align-items-center">
              <div class="col-md-8">
                <div class="box__main__time">
                  <p class="thu">{{ dataCurrentCampaign.thu }}</p>
                  <div class="d-flex align-items-center">
                    <p class="date">{{ dataCurrentCampaign.date }}</p>
                    <p class="time">{{ dataCurrentCampaign.time }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <button class="btn__join__campaign">Tham gia ngay</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="btn__close__popup" @click="onClosePopup">
        <fa :icon="['fas', 'xmark']" class="icon__close" />
      </div>
    </div>
  </Transition>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "PopupCampaign",
  props: ["status_show_popup"],
  methods: {
    ...mapMutations(["setStatusShowPopup", "setDataCurrentCampaign"]),
    onClosePopup() {
      this.setStatusShowPopup(false);
      this.setDataCurrentCampaign(null);
      document.getElementsByTagName("body")[0].style.overflow = "unset";
    },
  },
  computed: {
    ...mapState(["statusShowPopup", "dataCurrentCampaign"]),
  },
};
</script>
