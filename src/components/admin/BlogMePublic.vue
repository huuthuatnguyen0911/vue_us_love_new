<style lang="scss" scoped></style>

<template>
  <div class="BlogMePublic">
    <div class="handleBarBlog">
      <div class="boxSearch bgBoxAdmin">
        <fa :icon="['fas', 'search']" class="ic_search" />
        <input type="text" class="inputSearch" :placeholder="$t('search')" />
      </div>

      <ul class="listHandle">
        <!-- <li class="itemHandle">
          <div class="boxBtnHandle bgBoxAdmin">
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

        <li class="itemHandle">
          <div class="boxBtnHandle bgBoxAdmin">
            <fa :icon="['fas', 'trash']" class="ic_handle" />
            <p class="textHandle">Thùng rác ({{ countBlog }})</p>
          </div>
        </li>
      </ul>
    </div>

    <ul class="listBlog">
      <li class="itemblog" v-for="item in dataBlogs" :key="item.id">
        <ItemBlog
          :dataItemBlog="item"
          :isShow="listShow"
          @restoreData="restoreDataBlog"
          @editDataBlog="onEditDataBlog($event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ItemBlog from "@/components/admin/ItemBlog.vue";
import { blogService } from "@/services/blogService";
import { mapState } from "vuex";

export default {
  name: "BlogMePublic",
  components: { ItemBlog },

  data() {
    return {
      listShow: "full",
      dataBlogs: [],
      countBlog: 0,
    };
  },
  mounted() {
    this.initDataMain();
    this.countDeletedBlog();
  },
  methods: {
    async initDataMain() {
      const dataBlog = await blogService.getBlogPublicMeById(
        this.dataUserCurrent._id
      );

      if (dataBlog.success) {
        this.dataBlogs = dataBlog.data;
      }
    },
    restoreDataBlog() {
      this.initDataMain();
      this.countDeletedBlog();
    },
    async countDeletedBlog() {
      const dataCountBlog = await blogService.countDocumentsDeletedWithID(
        this.dataUserCurrent._id
      );

      if (dataCountBlog.success) {
        this.countBlog = dataCountBlog.data.countDelete;
      }
    },
    onEditDataBlog(event) {
      this.$emit("onEditItemBlog", event);
    },
  },
  computed: {
    ...mapState(["dataUserCurrent"]),
  },
};
</script>
