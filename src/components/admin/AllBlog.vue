<style></style>

<template>
  <div class="boxHandlerBlog">
    <div class="handleBarBlog">
      <div class="boxSearch bgBoxAdmin">
        <fa :icon="['fas', 'search']" class="ic_search" />
        <input type="text" class="inputSearch" :placeholder="$t('search')" />
      </div>

      <ul class="listHandle">
        <!-- <li class="itemHandle">
          <div class="boxBtnHandle bgBoxAdmin" @click="onCreateNewBlog">
            <fa :icon="['fas', 'plus']" class="ic_handle" />
            <p class="textHandle">Thêm blog mới</p>
          </div>
        </li> -->

        <li class="itemHandle">
          <div class="boxBtnHandle bgBoxAdmin">
            <fa :icon="['fas', 'filter']" class="ic_handle" />
            <p class="textHandle">Lọc</p>
          </div>
        </li>

        <!-- <li class="itemHandle">
          <div class="boxBtnHandle bgBoxAdmin">
            <fa :icon="['fas', 'trash']" class="ic_handle" />
            <p class="textHandle">Thùng rác</p>
          </div>
        </li> -->

        <li class="itemHandle" v-if="handleShowBtn" @click="onChangePage">
          <div class="boxBtnHandle bgBoxAdmin">
            <fa :icon="['fas', 'user']" class="ic_handle" />
            <p class="textHandle">Bài viết của tôi</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="boxShowAllBlog">
      <ul class="listBlog">
        <li class="itemblog" v-for="item in dataBlogs" :key="item.id">
          <ItemBlog :dataItemBlog="item" :isShow="listShow" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ItemBlog from "@/components/admin/ItemBlog.vue";
import { mapState } from "vuex";
import { blogService } from "@/services/blogService";

export default {
  name: "AllBlog",
  components: { ItemBlog },
  data() {
    return {
      listShow: ["view", "comment"],
      dataBlogs: [],
    };
  },
  mounted() {
    this.initDataMain();
  },
  methods: {
    async initDataMain() {
      const dataBlogs = await blogService.getAllBlogs();

      if (dataBlogs.success) {
        this.dataBlogs = dataBlogs.data;
      }
    },

    onChangePage() {
      this.$router.push({ path: "/admin/blogs/" + this.dataUserCurrent.slug });
      this.$emit("onScrollTop");
    },
  },
  computed: {
    ...mapState(["dataUserCurrent"]),

    handleShowBtn() {
      if (this.$route.params.idAuthor == "all") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
