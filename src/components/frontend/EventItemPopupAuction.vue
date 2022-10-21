<style lang="scss"></style>

<template>
  <Transition
    enter-active-class="animate__animated animate__zoomIn animate__faster"
    leave-active-class="animate__animated animate__zoomOut animate__faster"
  >
    <div
      class="box__popup__auction__content"
      v-if="statusShowPopup"
      @click.self="onClosePopup"
    >
      <div class="box__content__inner row">
        <!-- <div class="title__header">
          <p class="title">Chi tiết buổi đấu giá</p>
        </div> -->
        <div class="col-md-6 col-sm-12">
          <div class="box__item__grid box__item__left">
            <p class="title">
              {{ dataCurrentAuction.name }}
            </p>
            <p class="description">
              <span>_ Mục đích buổi đấu giá: </span>
              {{ dataCurrentAuction.description }}
            </p>
            <p class="description">
              <span>_ Hiện vật đấu giá bao gồm: </span>
              {{ dataCurrentAuction.auctionartifacts }}
            </p>
            <div class="row box__timeline">
              <div class="col-md-12">
                <div class="col__inner--left">
                  <p class="box__user">
                    Người tham gia: <span class="quantity_user">134</span>
                  </p>
                  <!-- <ul class="list__join__user">
                    <li class="item__join__user">
                      <img src="@/assets/images/img_avatar.png" alt="" />
                      <p class="name">Adeyinka Johnson</p>
                    </li>
                    <li class="item__join__user">
                      <img src="@/assets/images/img_avatar.png" alt="" />
                      <p class="name">Adeyinka Johnson</p>
                    </li>
                    <li class="item__join__user">
                      <img src="@/assets/images/img_avatar.png" alt="" />
                      <p class="name">Adeyinka Johnson</p>
                    </li>
                  </ul> -->
                </div>
              </div>
              <div class="col-md-12">
                <div class="col__inner--right">
                  <p class="infor__text">
                    <fa :icon="['fas', 'user-circle']" class="icon_input" />
                    <span class="title">Người tổ chức: </span
                    >{{ dataCurrentAuction.organizer }}
                  </p>

                  <p class="infor__text">
                    <fa :icon="['fas', 'phone-square']" class="icon_input" />
                    <span class="title">Số điện thoại: </span
                    >{{ dataCurrentAuction.phonenumber }}
                  </p>

                  <p class="infor__text">
                    <fa :icon="['fas', 'usd']" class="icon_input" />
                    <span class="title">Mức giá khởi điểm: </span
                    >{{ dataCurrentAuction.startingprice }}$
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="box__item__grid box__item__right">
            <img
              :src="dataCurrentAuction.img"
              alt=""
              class="img__main__auction"
            />

            <div class="row align-items-center">
              <div class="col-md-8">
                <div class="box__main__time">
                  <p class="time">
                    <!-- <img
                      class="imagetime"
                      src="@/assets/images/page/clock.png"
                      alt=""
                    /> -->
                    <fa :icon="['fas', 'clock']" class="icon_input" />
                    {{ dataCurrentAuction.time }} |
                    {{ dataCurrentAuction.date }}
                  </p>
                  <div class="d-flex align-items-center">
                    <p class="location">
                      <fa :icon="['fas', 'map-marker']" class="icon_input" />{{
                        dataCurrentAuction.location
                      }}
                    </p>
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
  name: "PopupAuction",
  props: ["status_show_popup"],
  methods: {
    ...mapMutations(["setStatusShowPopup", "setDataCurrentAuction"]),
    onClosePopup() {
      this.setStatusShowPopup(false);
      this.setDataCurrentAuction(null);
      document.getElementsByTagName("body")[0].style.overflow = "unset";
    },
  },
  computed: {
    ...mapState(["statusShowPopup", "dataCurrentAuction"]),
  },
};
</script>
