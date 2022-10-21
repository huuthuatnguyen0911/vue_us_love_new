<template>
  <DefaultFrontend_1>
    <div
      id="BlogPage"
      class="animate__animated animate__fadeIn"
      v-if="!isPendingIndex && dataBlogOfAuthor && dataBlogMostRead"
    >
      <div class="boxHeaderPage">
        <div class="row rowHeaderCustom">
          <div class="col-md-4">
            <div class="boxLeft">
              <div
                class="boxBlogShow small"
                v-for="item in dataHeaderLeft"
                :key="item._id"
              >
                <router-link
                  :to="{
                    name: 'detail_blog',
                    params: { slugBlog: item.slug },
                  }"
                  class="linkBlog"
                >
                  <div
                    class="boxImage"
                    :style="{
                      backgroundImage:
                        'url(' + convert_image(item.main_image) + ')',
                    }"
                  ></div>
                  <div class="boxContent">
                    <p class="titleBlog">
                      {{ item.title }}
                    </p>
                    <p class="timeBlog">{{ formate_date(item.createdAt) }}</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="boxRightBlog">
              <router-link
                :to="{
                  name: 'detail_blog',
                  params: { slugBlog: dataHeaderRight.slug },
                }"
                class="linkBlog"
              >
                <div
                  class="boxImageBlog"
                  :style="{
                    backgroundImage:
                      'url(' + convert_image(dataHeaderRight.main_image) + ')',
                  }"
                ></div>
                <div class="boxContent">
                  <p class="titleBlog">
                    {{ dataHeaderRight.title }}
                  </p>
                  <p class="timeBlog">
                    {{ formate_date(dataHeaderRight.createdAt) }}
                  </p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="boxListBlogAuthor mt_40">
        <p class="titleBlog">Theo tác giả</p>
        <div class="row rowAuthorCustom mt_20">
          <div class="col-md-6">
            <router-link
              :to="{
                name: 'detail_blog',
                params: { slugBlog: dataBlogOfAuthor.slug },
              }"
              class="linkBlog"
            >
              <div class="boxBlogMain">
                <div
                  class="boxImg"
                  :style="{
                    backgroundImage:
                      'url(' + convert_image(dataBlogOfAuthor.main_image) + ')',
                  }"
                ></div>
                <div class="boxContent">
                  <p class="titleBlog">{{ dataBlogOfAuthor.title }}</p>
                  <p class="timeBlog">
                    {{ formate_date(dataBlogOfAuthor.createdAt) }}
                  </p>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-md-6">
            <div class="boxRightAuthor">
              <div
                class="itemAuthor"
                v-for="item in dataListAuthor"
                :key="item._id"
              >
                <img :src="convert_image(item.avatar)" alt="" class="avatar" />
                <p class="nameAuthor">{{ item.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="boxMostRead mt_40">
        <p class="titleBlog">Đọc nhiều nhất</p>
        <!-- <router-link :to="{ name: 'home' }" class="linkBlog"> -->
        <div class="boxMainBlog mt_20">
          <div
            class="boxImage"
            :style="{
              backgroundImage:
                'url(' + convert_image(dataBlogMostRead[0].main_image) + ')',
            }"
          ></div>
          <div class="boxContentMain">
            <p class="titleBlog">{{ dataBlogMostRead[0].title }}</p>
            <p class="timeBlog">
              {{ formate_date(dataBlogMostRead[0].createdAt) }}
            </p>

            <div class="slideBlogBox">
              <swiper
                class="swiper"
                :modules="modules"
                :slidesPerView="2"
                :spaceBetween="20"
                :autoplay="{
                  delay: 2000,
                  disableOnInteraction: false,
                }"
              >
                <swiper-slide
                  class="slide"
                  v-for="item in dataBlogMostRead"
                  :key="item._id"
                >
                  <router-link
                    :to="{
                      name: 'detail_blog',
                      params: { slugBlog: item.slug },
                    }"
                    class="linkBlog"
                  >
                    <div class="boxItemBlog">
                      <img
                        :src="convert_image(item.main_image)"
                        alt=""
                        class="imgBlog"
                      />
                      <div class="boxContent">
                        <p class="title">{{ item.title }}</p>
                        <p class="time">
                          {{ formate_date(item.createdAt) }}
                        </p>
                      </div>
                    </div>
                  </router-link>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
        <!-- </router-link> -->
      </div>

      <div class="boxNewBlogs mt_40">
        <p class="titleBlog">Mới nhất</p>
        <ul class="listBlogNew mt_20">
          <li class="itemBlogNew" v-for="item in dataNewBlogs" :key="item._id">
            <router-link
              :to="{
                name: 'detail_blog',
                params: { slugBlog: item.slug },
              }"
            >
              <div class="boxContentBlog">
                <div class="row">
                  <div class="col-md-4">
                    <div class="boxImageBlog">
                      <img
                        :src="convert_image(item.main_image)"
                        alt=""
                        class="imgBlog"
                      />
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="boxRigtInner">
                      <p class="title">{{ item.title }}</p>
                      <p
                        class="description"
                        v-html="sub_string(item.content, 130)"
                      ></p>
                      <p class="boxInforAuthor">
                        <span class="nameAuthor">{{
                          item.dataAuthor[0].name
                        }}</span>
                        <span>
                          {{ formate_date(item.createdAt) }}
                        </span>
                        <span class="btnRead">Đọc thêm</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div></router-link
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="text-center" v-else>
      <div class="lds-ripple dark">
        <div></div>
        <div></div>
      </div>
    </div>
  </DefaultFrontend_1>
</template>

<script>
import DefaultFrontend_1 from "@/layouts/DefaultFrontend_1.vue";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { isPendingIndex, blogService } from "@/services/blogService";
import formatDate from "@/utils/formateDate";
import ConvertImage from "@/utils/convertImage";
import SubString from "@/utils/sub_string";

export default {
  name: "BlogView",
  setup() {
    return {
      modules: [Autoplay],
      isPendingIndex,
    };
  },
  components: {
    DefaultFrontend_1,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      dataHeaderLeft: null,
      dataHeaderRight: [],
      dataBlogOfAuthor: null,
      dataListAuthor: null,
      dataBlogMostRead: null,
      dataNewBlogs: null,
      dataAllIndex: null,
    };
  },
  created() {
    this.intiDatamain();
  },
  mounted() {},
  methods: {
    async intiDatamain() {
      const dataRef = await blogService.getBlogsIndex();

      if (dataRef.success) {
        this.dataAllIndex = dataRef.data;
        this.initMountedDom();
      }
    },

    initMountedDom() {
      this.dataHeaderLeft = this.dataAllIndex.sortDescBlogs.slice(0, 2);
      this.dataHeaderRight = this.dataAllIndex.sortDescBlogs.slice(2, 3)[0];
      this.dataBlogOfAuthor = this.dataAllIndex.datablogOfAuthorMostRead[0];
      this.dataBlogMostRead = this.dataAllIndex.blogModelReads;
      this.dataNewBlogs = this.dataAllIndex.sortDescBlogs;

      if (this.dataAllIndex.authors) {
        let arrTemp = [];
        this.dataAllIndex.authors.forEach((item) => {
          arrTemp.push(item.dataAuthor[0]);
        });
        this.dataListAuthor = [
          ...new Map(arrTemp.map((item, key) => [item[key], item])).values(),
        ];
      }
    },

    formate_date: formatDate.convertToWeek,
    convert_image: ConvertImage,
    sub_string: SubString,
  },
};
</script>
