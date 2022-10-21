<style></style>

<template>
  <AdminDefault1>
    <div class="boxMainBlogs" v-if="isCheckPage">
      <p
        class="header__title text-center"
        v-if="$route.params.idAuthor == 'all'"
      >
        Tất cả bài viết
      </p>

      <p class="header__title text-center" v-else>Bài viết của tôi</p>

      <ChartBlog
        :listDataTopBlogs="listDataTopBlogs"
        :dataStatistic="dataStatistic"
        :dataChart="dataChart"
      />

      <component
        :is="currentComponent"
        :dataBlogs="dataBlogs"
        @onScrollTop="onScrollTop"
        @onCreateNewBlog="onCreateNewBlog"
      />
    </div>

    <div class="boxShowError text-center" v-else>
      <p>Trang không tồn tại</p>
    </div>
  </AdminDefault1>
</template>

<script>
import AdminDefault1 from "@/layouts/admin_default_1.vue";
import ChartBlog from "@/components/admin/ChartBlog.vue";
import AllBlog from "@/components/admin/AllBlog.vue";
import MyBlogs from "@/components/admin/MyBlogs.vue";

import { mapState } from "vuex";
import { blogService } from "@/services/blogService";

export default {
  name: "AdminBlogs",
  components: { AdminDefault1, ChartBlog, AllBlog, MyBlogs },
  data() {
    return {
      currentComponent: "AllBlog",
      isCheckPage: true,

      listDataTopBlogs: [],
      dataStatistic: {
        totalBlog: 20,
        totalComments: 30,
        totalReader: 40,
      },
      dataChart: {
        labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
        datasets: [
          {
            label: "Bài viết",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ["#42c636"],
          },
        ],
      },
      dataBlogs: [],
    };
  },
  mounted() {
    this.countBlogWithYear();
  },
  methods: {
    initStart() {},
    async countBlogWithYear() {
      const date = new Date();
      const year = date.getFullYear();
      const dataRef = await blogService.countBlogByYear(year);

      console.log(dataRef);
      if (dataRef.status) {
        dataRef.data.forEach((item) => {
          this.dataChart.datasets[0].data[item._id - 1] = item.count;
        });
        // this.dataChart.datasets[0].data = data
      }
    },
    onScrollTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    onCreateNewBlog() {},
    async getBlogMostRead(idAuthor) {
      const dataBlogMostRead = await blogService.getBlogMostRead(idAuthor, 10);

      if (dataBlogMostRead.success) {
        this.listDataTopBlogs = dataBlogMostRead.data;
      }
    },
  },
  computed: {
    ...mapState(["dataUserCurrent"]),
  },
  watch: {
    "$route.params.idAuthor": {
      handler: function (idAuthor) {
        if (idAuthor == "all") {
          this.currentComponent = AllBlog;
          this.getBlogMostRead("all");
        } else if (idAuthor == this.dataUserCurrent.slug) {
          this.currentComponent = MyBlogs;
          this.getBlogMostRead(this.dataUserCurrent_id);
        } else {
          this.isCheckPage = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
