<style></style>

<template>
  <div class="chart_blog">
    <div class="row">
      <div class="col-md-3">
        <div class="boxTopMostRead bgBoxAdmin">
          <p class="header__title">{{ $t("top_most_read") }}</p>
          <ul class="listTopBlog">
            <li v-if="listDataTopBlogs.length <= 0" class="text-center">
              Chưa có bài viết nào
            </li>
            <li
              class="itemTopBlog"
              v-for="item in listDataTopBlogs"
              :key="item._id"
              v-else
            >
              <div class="boxItemBlogs">
                <div class="boxNameBlogs">
                  <img
                    :src="convert_image(item.main_image)"
                    alt=""
                    class="imgBlog"
                  />
                  <router-link
                    :to="{
                      name: 'detail_blog',
                      params: { slugBlog: item.slug },
                    }"
                    class="linkBlog"
                  >
                    <p class="nameBlog">{{ sub_string(item.title, 15) }}</p>
                  </router-link>
                </div>
                <p class="countBlogs">{{ item.countEye }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <div class="boxStatisticsNumber">
          <div class="row">
            <div class="col-md-3">
              <div class="colItemInne bgBoxAdmin">
                <div class="boxInforLeft">
                  <p class="countNumber">{{ dataStatistic.totalBlog }}</p>
                  <p class="nameStatistics">{{ $t("blog") }}</p>
                </div>
                <div class="boxInforRight">
                  <fa
                    :icon="['fas', 'file-circle-plus']"
                    class="ic_statistic orange"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="colItemInne bgBoxAdmin">
                <div class="boxInforLeft">
                  <p class="countNumber">{{ dataStatistic.totalComments }}</p>
                  <p class="nameStatistics">{{ $t("comments") }}</p>
                </div>
                <div class="boxInforRight">
                  <fa :icon="['fas', 'comment']" class="ic_statistic violet" />
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="colItemInne bgBoxAdmin">
                <div class="boxInforLeft">
                  <p class="countNumber">{{ dataStatistic.totalReader }}</p>
                  <p class="nameStatistics">{{ $t("reader") }}</p>
                </div>
                <div class="boxInforRight">
                  <fa :icon="['fas', 'user']" class="ic_statistic blue" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="boxChartBlogs bgBoxAdmin">
          <BarChart :chartData="dataChart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import ConvertImage from "@/utils/convertImage";
import SubString from "@/utils/sub_string";

Chart.register(...registerables);

export default defineComponent({
  name: "ChartBlog",
  components: { BarChart },
  props: ["listDataTopBlogs", "dataStatistic", "dataChart"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    convert_image: ConvertImage,
    sub_string: SubString,
  },
});
</script>
