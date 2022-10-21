<style></style>

<template>
  <div class="ItemBlog bgBoxAdmin">
    <div class="row align-items-center">
      <div class="col-md-3">
        <div class="boxImage">
          <img
            :src="convrt_image(dataItemBlog.main_image)"
            alt=""
            class="imgBlog"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="boxInforBlog">
          <p class="textTitleBlog">{{ sub_string(dataItemBlog.title, 50) }}</p>
          <p
            class="textCotentBlog"
            v-html="sub_string(dataItemBlog.content, 320)"
          ></p>
          <div class="boxAuthor">
            <img
              :src="convrt_image(dataItemBlog.dataAuthor[0].avatar)"
              class="img__group"
            />
            <p class="name__group">{{ dataItemBlog.dataAuthor[0].name }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="boxInnerButtnHandle">
          <ul class="listBtnHandle">
            <li
              :class="`itemBtn green ${item.color}`"
              v-for="item in listBtnHandleCurrent"
              :key="item.id"
              @click="handleBarBlog(item.showName)"
            >
              <fa :icon="['fas', item.icon]" class="ic_handle" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubString from "@/utils/sub_string";
import { blogService } from "@/services/blogService";
import { mapState } from "vuex";
import ConvertImage from "@/utils/convertImage";

export default {
  name: "ItemBlog",
  props: ["dataItemBlog", "isShow"],
  data() {
    return {
      listBtnHandleCurrent: [],
      listBtnHandle: [
        {
          id: 0,
          color: "green",
          icon: "pen",
          showName: "edit",
        },
        {
          id: 1,
          color: "blue",
          icon: "eye",
          showName: "view",
        },
        {
          id: 2,
          color: "violet",
          icon: "comment",
          showName: "comment",
        },
        {
          id: 3,
          color: "orange",
          icon: "trash",
          showName: "delete",
        },
      ],
    };
  },
  mounted() {
    this.initDataMain();
  },
  methods: {
    initDataMain() {
      const typeIsShow = typeof this.isShow;

      if (typeIsShow == "object") {
        this.isShow.forEach((itemShow) => {
          this.listBtnHandle.forEach((item) => {
            if (item.showName == itemShow) {
              this.listBtnHandleCurrent.push(item);
            }
          });
        });
      } else if (typeIsShow == "string" && this.isShow == "full") {
        this.listBtnHandleCurrent = this.listBtnHandle;
      }
    },
    handleBarBlog(nameHandle) {
      if (nameHandle == "delete") {
        this.handleDeleteBlog(this.dataItemBlog._id);
      } else if (nameHandle == "edit") {
        this.handleEditBlog(this.dataItemBlog._id);
      } else if (nameHandle == "view") {
        this.handleViewBlog(this.dataItemBlog.slug);
      }
    },

    handleEditBlog(idBlog) {
      this.$emit("editDataBlog", idBlog);
    },

    handleViewBlog(slug) {
      this.$router.push({ name: "detail_blog", params: { slugBlog: slug } });
    },

    async handleDeleteBlog(idBlog) {
      const ref = await blogService.deleteBlogById(idBlog);

      if (ref.success) {
        this.$emit("restoreData");
      }
    },
    sub_string: SubString,
    convrt_image: ConvertImage,
  },
  computed: {
    ...mapState(["dataUserCurrent"]),
  },
};
</script>
