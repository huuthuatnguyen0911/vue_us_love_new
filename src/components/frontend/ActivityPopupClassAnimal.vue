<style></style>

<template>
  <Transition
    enter-active-class="animate__animated animate__zoomIn animate__faster"
    leave-active-class="animate__animated animate__zoomOut animate__faster"
  >
    <div
      id="ActivityPopupClassAnimal"
      v-if="statusShowPopup"
      @click.self="onClosePopup"
    >
      <div class="boxPopupInner">
        <div class="d-flex">
          <div class="boxLeft">
            <p class="header__title">
              {{ dataSendAnimalWithClass.classAnimal }}
            </p>

            <div class="boxInforAnimal">
              <p class="titleName">{{ dataSendAnimalWithClass.name }}</p>
              <p class="description">
                {{ sub_string(dataSendAnimalWithClass.description, 300) }}
              </p>
              <p class="inforAnimal">
                <span>Giống loài: </span>{{ dataSendAnimalWithClass.species }}
              </p>
              <p class="inforAnimal">
                <span>Môi trường sống: </span
                >{{ dataSendAnimalWithClass.habitat }}
              </p>
              <p class="inforAnimal">
                <span>Phân bố: </span>{{ dataSendAnimalWithClass.distribution }}
              </p>
              <p class="inforAnimal">
                <span>Số lượng: </span>{{ dataSendAnimalWithClass.quantity }}
              </p>
            </div>

            <div class="boxListAnimalClass">
              <swiper
                class="swiper swiperCustomClass"
                :modules="modules"
                :space-between="30"
                :slides-per-view="3"
                :centered-slides="true"
                :autoplay="{
                  delay: 1500,
                  disableOnInteraction: false,
                }"
              >
                <swiper-slide
                  class="slide slideCustomAnimalClass"
                  v-for="(item, index) in listAnimalWithClass"
                  :key="index"
                  @click="onEmitSetData(index)"
                >
                  <div class="animalCardBox">
                    <div class="d-flex">
                      <div class="leftCardAnimal">
                        <div class="boxMainShape">
                          <div class="shape"></div>
                        </div>
                      </div>
                      <div class="rightCardAnimal">
                        <img
                          :src="`${require('@/assets/images/page/animal/' +
                            item.main_img_not_bg)}`"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </swiper-slide>
                >
              </swiper>
            </div>
          </div>
          <div class="boxRight">
            <div class="boxRightInner">
              <!-- <div class="bgOverlay"></div> -->
              <img
                :src="`${require('@/assets/images/page/animal/' +
                  dataSendAnimalWithClass.main_img_not_bg)}`"
                alt=""
                class="mainImagAnimal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import SubString from "@/utils/sub_string";

export default {
  name: "ActivityPopupClassAnimal",
  setup() {
    return {
      modules: [Autoplay],
    };
  },
  props: ["statusShowPopup", "listAnimalWithClass", "dataSendAnimalWithClass"],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {};
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {},
    onClosePopup() {
      this.$emit("closePopup");
    },
    onEmitSetData(index) {
      this.$emit("indexSetDataCurrent", index);
    },
    sub_string: SubString,
  },
};
</script>
