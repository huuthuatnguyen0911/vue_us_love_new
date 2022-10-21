<template>
  <div id="ActivityListAnimal" class="">
    <p class="header__title">Danh sách động vật</p>

    <div class="boxMainContentShow" v-if="listDataAnimal.length">
      <div class="boxMainContent">
        <div class="boxHeaderMain">
          <div class="d-flex justify-content-end align-items-center">
            <input
              type="text"
              placeholder="Môi trường , lớp, loài"
              class="input__search"
            />
          </div>
        </div>

        <div class="boxSlideShowAnimal">
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
                  v-for="item in listDataAnimal"
                  :key="item._id"
                  @click="onSendAnimal(item)"
                >
                  <div class="boxInnerItemAnimal">
                    <img :src="item.listImage[0]" alt="" class="imgAnimal" />
                  </div>
                </swiper-slide>
              </swiper>
            </div>
            <div class="rightInner">
              <div class="backgroundMainItem">
                <div class="boxInnerInfor">
                  <div class="row align-items-center">
                    <div class="col-md-7">
                      <div class="boxLeftInner">
                        <p class="titleName">{{ currentAnimal.name }}</p>
                        <p class="description">
                          {{ sub_string(currentAnimal.sub_des, 300) }}
                        </p>
                        <p class="inforAnimal">
                          <span>Tên khoa học: </span
                          >{{ currentAnimal.name_science }}
                        </p>
                        <p class="inforAnimal">
                          <span>Họ: </span>{{ currentAnimal.surname }}
                        </p>
                        <p class="inforAnimal">
                          <span>Môi trường sống: </span
                          >{{ convert_habitat(currentAnimal.habitat) }}
                        </p>
                        <p class="inforAnimal">
                          <span>Phân bố: </span>{{ currentAnimal.distribution }}
                        </p>
                        <p class="inforAnimal">
                          <span>Số lượng: </span
                          >{{ currentAnimal.number_individuals }} cá thể
                        </p>
                        <p class="inforAnimal">
                          <span>Lớp: </span>{{ currentAnimal.order }}
                        </p>

                        <div class="btnSeenInforAnimal">
                          <!-- <button
                            class="btnSeen btnSeenClass"
                            @click="onShowPopupClassAnimal"
                          >
                            Xem theo lớp
                          </button> -->
                          <button
                            class="btnSeen btnSeenDetail"
                            @click="showDetailAnimal(currentAnimal.slug)"
                          >
                            Xem Chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="boxRightInner">
                        <img
                          :src="currentAnimal.listImage[0]"
                          alt=""
                          class="imgMain"
                          ref="imageCurrentAnimal"
                        />
                        <div class="boxSlideImageAnimal">
                          <!-- :autoplay="{
                            delay: 1500,
                            disableOnInteraction: false,
                          }" -->
                          <swiper
                            class="swiper swiperCustomAnimal"
                            :modules="modules"
                            :space-between="20"
                            :slides-per-view="3"
                            :centered-slides="true"
                          >
                            <swiper-slide
                              class="slide slideCustomAnimal"
                              v-for="(item, index) in currentAnimal.listImage"
                              :key="index"
                              @click="onChangeImageCurrentAnimal(index)"
                            >
                              <img :src="item" alt="" />
                            </swiper-slide>
                          </swiper>
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
    </div>

    <activity-popup-class-animal
      :statusShowPopup="statusShowPopup"
      :listAnimalWithClass="listAnimalWithClass"
      :dataSendAnimalWithClass="dataSendAnimalWithClass"
      @closePopup="onClosePopup"
      @indexSetDataCurrent="indexSetDataCurrent($event)"
    />
  </div>
</template>

<script>
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import SubString from "@/utils/sub_string";
import ActivityPopupClassAnimal from "@/components/frontend/ActivityPopupClassAnimal.vue";
import { mapState } from "vuex";
import { AnimalService } from "@/services/AnimalService";
import { convertHabitat } from "@/utils/ConvertAnimal";

export default {
  name: "ActivityListAnimal",
  setup() {
    return {
      modules: [Autoplay, Navigation],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    ActivityPopupClassAnimal,
  },
  data() {
    return {
      listDataAnimal: [],
      statusShowPopup: false,
      listAnimalWithClass: [],
      dataSendAnimalWithClass: null,
      currentAnimal: {},
    };
  },
  mounted() {
    this.initGetDataAnimal();
  },
  methods: {
    async initGetDataAnimal() {
      try {
        const dataRef = await AnimalService.getAllAnimal(10);

        if (dataRef.status) {
          this.listDataAnimal = dataRef.data;
          this.currentAnimal = this.listDataAnimal[0];
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    onSendAnimal(animal) {
      this.currentAnimal = animal;
    },
    onClosePopup() {
      this.statusShowPopup = false;
      document.getElementsByTagName("body")[0].style.overflow = "unset";
    },
    onShowPopupClassAnimal() {
      this.statusShowPopup = true;
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      this.listAnimalWithClass = this.dataListAnimal.filter((e) => {
        return e.classAnimal == this.currentAnimal.classAnimal;
      });
      this.dataSendAnimalWithClass = this.listAnimalWithClass[0];
    },
    onChangeImageCurrentAnimal(index) {
      this.$refs.imageCurrentAnimal.src = this.currentAnimal.listImage[index];
    },
    indexSetDataCurrent(event) {
      this.dataSendAnimalWithClass = this.listAnimalWithClass[event];
    },
    showDetailAnimal(slug) {
      this.$router.push({
        name: "detail_animal",
        params: { slug_animal: slug },
      });
    },
    sub_string: SubString,
    convert_habitat: convertHabitat,
  },
  computed: {
    ...mapState(["dataListAnimal"]),
  },
};
</script>
