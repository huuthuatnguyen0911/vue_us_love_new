<style></style>

<template>
  <div class="box__blog__main" v-if="dataBlogMostRead != null">
    <p class="header__title">Blog động vật</p>
    <div class="blog__main row backgroundMainItem align-items-center">
      <div class="col-md-6">
        <div class="d-flex flex-column">
          <div class="box__header__main__blog d-flex align-items-center">
            <p class="status">Đọc nhiều</p>
            <p class="time">{{ format_date(dataBlogMostRead.createdAt) }}</p>
          </div>
        </div>
        <p class="title__blog__main">
          {{ sub_string(dataBlogMostRead.title, 80) }}
        </p>
        <div class="boxContent">
          <p
            class="text__blog"
            v-html="sub_string(dataBlogMostRead.content, 250)"
          ></p>
          <router-link
            :to="{
              name: 'detail_blog',
              params: { slugBlog: dataBlogMostRead.slug },
            }"
            class="link__read__more"
            >Đọc tiếp</router-link
          >
        </div>
      </div>
      <div class="col-md-6">
        <div class="box__image__main">
          <img
            :src="convert_image(dataBlogMostRead.main_image)"
            alt=""
            class="img__blog__main"
          />
        </div>
      </div>
    </div>

    <div class="list__blog__box">
      <swiper
        class="swiper swiper__custom"
        :modules="modules"
        :slides-per-view="2"
        :grid="{ rows: 2 }"
        :space-between="20"
        navigation
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
      >
        <swiper-slide class="slide" v-for="blog in dataTopBlog" :key="blog.id">
          <router-link
            :to="{
              name: 'detail_blog',
              params: { slugBlog: blog.slug },
            }"
          >
            <div class="box__blog__item backgroundMainItem">
              <div class="row align-items-center">
                <div class="col-md-7">
                  <p class="title">
                    {{ sub_string(blog.title, 18) }}
                  </p>
                  <p
                    class="description"
                    v-html="sub_string(blog.content, 90)"
                  ></p>
                  <p class="time">
                    {{ format_date(blog.createdAt) }}
                  </p>
                </div>
                <div class="col-md-5">
                  <div class="box__img__item__blog">
                    <img :src="convert_image(blog.main_image)" alt="" />
                    <!-- <div class="box__status">{{ blog.status }}</div> -->
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>

  <div class="" v-else>
    <p class="text-center">chua co du lieu</p>
  </div>
</template>

<script>
import { Pagination, Navigation, Grid, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SubString from "@/utils/sub_string";
import FormatDate from "@/utils/fortmatDate";
import ConvertImage from "@/utils/convertImage";
import { mapState } from "vuex";

export default {
  name: "BlogHome",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Navigation, Grid, Autoplay],
    };
  },
  data() {
    return {
      descriptionBlog:
        " They are threatened by habitat loss following large–scale deforestation and commercial poaching for the wildlife trade They are threatened by habitat loss following large–scale deforestation and commercial poaching for the wildlife trade      ",
    };
  },
  methods: {
    sub_string: SubString,
    format_date: FormatDate,
    convert_image: ConvertImage,
  },
  computed: {
    ...mapState(["dataBlogMostRead", "dataTopBlog"]),
  },
};
</script>
