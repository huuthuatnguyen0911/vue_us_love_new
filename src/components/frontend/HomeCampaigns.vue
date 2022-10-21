<style></style>

<template>
  <div class="box__campaign__content backgroundMainItem">
    <p class="title">Các chiến dịch</p>
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
    <div class="box__slide__campaign">
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
          v-for="(item, index) in dataCampaign"
          :key="index"
        >
          <CardCampaign :dataItemCampaign="item" @show-popup="onShowPopup" />
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
import formatDate from "@/utils/formateDate";

import CardCampaign from "@/components/frontend/HomeItemCardCampaign.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "CampaignsHome",
  props: ["dataCampaign"],
  components: {
    Swiper,
    SwiperSlide,
    CardCampaign,
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
      dataListCampaign: [],
    };
  },

  mounted() {
    // this.initData();
    // this.getDataListCampaign();
  },

  methods: {
    ...mapMutations(["setStatusShowPopup", "setDataCurrentCampaign"]),
    initData() {
      this.dataTab = this.dataCampaign
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

    getDataListCampaign() {
      this.dataListCampaign = this.dataCampaign.filter(
        (item) =>
          item.category.toLowerCase() ==
          this.dataTab[this.currentTab].name.toLowerCase()
      );
    },

    onChageCampaign(index) {
      this.currentTab = index;
      this.getDataListCampaign();
    },

    onShowPopup(data) {
      if (data) {
        this.setStatusShowPopup(true);
        this.setDataCurrentCampaign(data);

        document.getElementsByTagName("body")[0].style.overflow = "hidden";
      }
    },
    basic_format_date: formatDate.basicFormat,
  },
  computed: {
    ...mapState(["statusShowPopup"]),
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
