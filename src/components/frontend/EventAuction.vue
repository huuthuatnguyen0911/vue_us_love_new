<style></style>

<template>
  <div class="box__auction__content backgroundMainItem">
    <p class="title">Các cuộc đấu giá</p>
    <!-- <ul class="list__tab">
      <li
        class="item__tab"
        v-for="(item, index) in dataTab"
        :key="item.id"
        :class="{ active: index == currentTab }"
        @click="onChageCampaign(index)"
      >
        {{ item.name }}
      </li>
    </ul> -->
    <div class="box__slide__auction">
      <swiper
        class="swiper"
        @swiper="onSwiper"
        :modules="modules"
        :space-between="30"
        :slides-per-view="3"
        :centered-slides="true"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
        }"
      >
        <!-- swiper-slide-active -->
        <swiper-slide
          class="slide"
          v-for="(item, index) in dataListAuction"
          :key="index"
        >
          <CardAuction :dataItemAuction="item" @show-popup="onShowPopup" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";

import CardAuction from "@/components/frontend/EventItemCardAuction.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "EventA",
  components: {
    Swiper,
    SwiperSlide,
    CardAuction,
  },
  setup() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
  data() {
    return {
      currentTab: 0,
      swiper: null,
      dataTab: [],
      dataListAuction: [],
    };
  },

  mounted() {
    this.initData();
    this.getDataListAuction();
  },

  methods: {
    ...mapMutations(["setStatusShowPopup", "setDataCurrentAuction"]),
    initData() {
      this.dataTab = this.dataAuction
        .map((item) => item.category)
        .filter((item, index, arr) => arr.indexOf(item) == index)
        .map((item, index) => {
          return {
            name: item,
            id: index,
          };
        });
    },

    onSwiper(swiper) {
      this.swiper = swiper;
    },

    getDataListAuction() {
      this.dataListAuction = this.dataAuction.filter(
        (item) =>
          item.category.toLowerCase() ==
          this.dataTab[this.currentTab].name.toLowerCase()
      );
    },

    onChageCampaign(index) {
      this.currentTab = index;
      this.getDataListAuction();
    },

    onShowPopup(data) {
      if (data) {
        this.setStatusShowPopup(true);
        this.setDataCurrentAuction(data);

        document.getElementsByTagName("body")[0].style.overflow = "hidden";
      }
    },
  },
  computed: {
    ...mapState(["dataAuction", "statusShowPopup"]),
  },
  watch: {
    statusShowPopup(newVal) {
      if (newVal) {
        this.swiper.autoplay.stop();
      } else {
        this.swiper.autoplay.start();
      }
    },
  },
};
</script>
