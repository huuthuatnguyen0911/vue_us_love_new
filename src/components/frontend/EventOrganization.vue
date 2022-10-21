<template>
  <div id="EventListOrganization" class="">
    <p class="header__title1">Danh sách các tổ chức từ thiện</p>
    <div class="boxMainContent">
      <div class="boxHeaderMain">
        <div class="d-flex justify-content-end align-items-center">
          <input
            type="text"
            placeholder="Tìm tổ chức bảo vệ"
            class="input__search"
          />
        </div>
      </div>

      <div class="boxSlideShowOrganization">
        <div class="d-flex align-items-center">
          <div class="leftInner">
            <swiper
              class="swiper swiperCustom"
              :modules="modules"
              direction="vertical"
              :space-between="30"
              :slides-per-view="3"
              :centered-slides="true"
              :autoplay="{
                delay: 1500,
                disableOnInteraction: false,
              }"
            >
              <swiper-slide
                class="slide slideCustom"
                v-for="(item, index) in dataListOrganization"
                :key="item.id"
                @click="onSendOrganization(index)"
              >
                <div class="boxInnerItemOrganization">
                  <img :src="item.listImage[0]" alt="" class="imgAnimal" />
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="rightInner">
            <div class="backgroundMainItem">
              <div class="boxInnerInfor">
                <div class="row align-items-center">
                  <div class="col-md-12">
                    <div class="boxLeftInner">
                      <p class="titleName">{{ currentOrganization.name }}</p>
                      <p class="inforOrganization">
                        <span>Cá nhân | Tổ chức thành lập : </span
                        >{{ currentOrganization.establish }}
                      </p>
                      <p class="inforOrganization">
                        <span>Ngày thành lập: </span
                        >{{ currentOrganization.founding }}
                      </p>
                      <p class="inforOrganization">
                        <span>Trụ sở chính: </span
                        >{{ currentOrganization.headquarters }}
                      </p>
                      <p class="inforOrganization">
                        <span>Phân bố: </span
                        >{{ currentOrganization.distribution }}
                      </p>
                      <!-- <p class="inforOrganization">
                        <span>Lớp: </span>{{ currentOrganization.classAnimal }}
                      </p> -->
                      <p class="inforOrganization">
                        <span>Hoạt động: </span
                        >{{ sub_string(currentOrganization.activity, 430) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import SubString from "@/utils/sub_string";

import { mapState } from "vuex";

export default {
  name: "EventOrganization",
  setup() {
    return {
      modules: [Autoplay, Navigation],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      //   statusShowPopup: false,

      currentOrganization: {
        listImage: [],
        name: "",
        activity: "",
        main_img_not_bg: "",
        establish: "",
        founding: "",
        headquarters: "",
        distribution: "",
      },
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.currentOrganization = this.dataListOrganization[0];
    },
    onSendOrganization(index) {
      this.currentOrganization = this.dataListOrganization[index];
    },
    onClosePopup() {
      this.statusShowPopup = false;
      document.getElementsByTagName("body")[0].style.overflow = "unset";
    },

    onChangeImagecurrentOrganization(index) {
      this.$refs.imagecurrentOrganization.src =
        this.currentOrganization.listImage[index];
    },

    sub_string: SubString,
  },
  computed: {
    ...mapState(["dataListOrganization"]),
  },
};
</script>
