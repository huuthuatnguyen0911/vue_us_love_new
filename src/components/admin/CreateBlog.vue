<style></style>

<template>
  <div class="CreateBlog">
    <div class="boxHandleBlog">
      <ul class="listHandle">
        <li class="itemhandle" v-if="dataEditBlog.status == 'edit'">
          <div
            class="boxBtnHandle bgBoxAdmin"
            :class="{
              disabled:
                dataFormBlog.title == '' ||
                dataFormBlog.content == '' ||
                dataFormBlog.main_image == '',
            }"
            @click="onUpdateBlog(false)"
          >
            <fa :icon="['fas', 'pen-ruler']" class="ic_handle" />
            <p class="textHandle">Lưu nháp</p>
          </div>
        </li>

        <li class="itemhandle" v-else>
          <div
            class="boxBtnHandle bgBoxAdmin"
            :class="{
              disabled:
                dataFormBlog.title == '' ||
                dataFormBlog.content == '' ||
                dataFormBlog.main_image == '',
            }"
            @click="onCreateBlog(false)"
          >
            <fa :icon="['fas', 'pen-ruler']" class="ic_handle" />
            <p class="textHandle">Lưu nháp</p>
          </div>
        </li>

        <li class="itemhandle" v-if="dataEditBlog.status == 'edit'">
          <div
            class="boxBtnHandle btnPost bgBoxAdmin"
            :class="{
              disabled:
                dataFormBlog.title == '' ||
                dataFormBlog.content == '' ||
                dataFormBlog.main_image == '',
            }"
            @click="onUpdateBlog(true)"
          >
            <fa :icon="['fas', 'paper-plane']" class="ic_handle" />
            <p class="textHandle">Cập nhật</p>
          </div>
        </li>

        <li class="itemhandle" v-else>
          <div
            class="boxBtnHandle btnPost bgBoxAdmin"
            :class="{
              disabled:
                dataFormBlog.title == '' ||
                dataFormBlog.content == '' ||
                dataFormBlog.main_image == '',
            }"
            @click="onCreateBlog(true)"
          >
            <fa :icon="['fas', 'paper-plane']" class="ic_handle" />
            <p class="textHandle">Đăng bài</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="formCreateBog">
      <form action="javascript:void(0)" @submit.prevent class="formMain">
        <div class="boxform bgBoxAdmin">
          <input
            type="text"
            placeholder="Tiêu đề"
            class="inputForm"
            v-model="dataFormBlog.title"
          />
        </div>
        <div class="boxform bgBoxAdmin">
          <ul
            class="listCategoryUl"
            v-if="dataFormBlog.list_category.length > 0"
          >
            <li
              class="itemCategory"
              v-for="(item, index) in dataFormBlog.list_category"
              :key="index"
            >
              <p class="textCategory">{{ item }}</p>
              <fa
                :icon="['fas', 'xmark']"
                class="ic_category"
                @click="onRemoveCategory(index)"
              />
            </li>
          </ul>

          <input
            type="text"
            placeholder="Gắn thẻ bài viết của bạn. Nhiều nhất 5 thẻ. Ít nhất 1 thẻ"
            class="inputForm"
            v-model="itemCategory"
            @keyup.enter="onAddCategory"
            v-if="dataFormBlog.list_category.length != 5"
          />
        </div>

        <div class="boxBtnAddAvt">
          <label for="inputAvtBlogs" class="bgBoxAdmin btnAddImage">
            <p class="text">Thêm ảnh đại diện</p>
            <input
              type="file"
              name=""
              id="inputAvtBlogs"
              class="inputAvtBlog"
              accept=".jpg, .jpeg, .png"
              @change="onAddAvt"
            />
          </label>

          <img
            :src="convert_image(currentAvtBlog)"
            alt=""
            class="imgAvt"
            v-if="currentAvtBlog != ''"
          />
          <p class="showEntry" v-else>Chưa có ảnh đại diện</p>
        </div>

        <div class="boxEditor bgBoxAdmin">
          <QuillEditor
            theme="snow"
            toolbar="full"
            contentType="html"
            placeholder="Viết bài của bạn ở đây..."
            v-model:content="dataFormBlog.content"
            ref="qillEidtor"
          />
        </div>
      </form>
    </div>
  </div>

  <NotifiView ref="componentNotifi" />
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { blogService, isPending } from "@/services/blogService";
import { mapState } from "vuex";
import ConvertImage from "@/utils/convertImage";

export default {
  name: "CreateBlog",
  setup() {
    return { isPending };
  },
  components: { QuillEditor },
  inject: ["dataEditBlog"],

  mounted() {
    this.onInitEdit();
  },

  data() {
    return {
      optionNotifi: {
        status: "",
        message: "",
        theme: "",
      },
      itemCategory: "",
      currentAvtBlog: "",

      dataFormBlog: {
        title: "",
        main_image: "",
        content: "",
        list_category: [],
        status: false,
      },
      dataFormResetBlog: {
        title: "",
        main_image: "",
        content: "",
        list_category: [],
        status: false,
      },
    };
  },
  methods: {
    async onInitEdit() {
      if (this.dataEditBlog.idBlog != "" || this.dataEditBlog.status != "") {
        const dataEditBlog = await blogService.getBlogWithId(
          this.dataEditBlog.idBlog
        );
        if (dataEditBlog.success) {
          this.dataFormBlog = {
            title: dataEditBlog.data.title,
            // content: dataEditBlog.data.content,
            list_category: dataEditBlog.data.list_category,
          };
          this.$refs.qillEidtor.setHTML(dataEditBlog.data.content);
          this.currentAvtBlog = dataEditBlog.data.main_image;
        }
      }
    },

    onShowNotifi(option) {
      this.optionNotifi = option;
      this.$refs.componentNotifi.onCreateNotification(this.optionNotifi);
    },

    resetFormBlog() {
      this.dataFormBlog = Object.assign({}, this.dataFormResetBlog);
      this.currentAvtBlog = "";
      this.$refs.qillEidtor.setHTML("");
    },

    onAddAvt(event) {
      const file = event.target.files[0];
      this.dataFormBlog.main_image = file;
      this.currentAvtBlog = URL.createObjectURL(file);
    },

    onRemoveCategory(index) {
      this.dataFormBlog.list_category.splice(index, 1);
    },

    onAddCategory() {
      if (
        this.itemCategory != "" &&
        this.dataFormBlog.list_category.length < 5
      ) {
        this.dataFormBlog.list_category.push(this.itemCategory);
        this.itemCategory = "";
      }
    },

    async onCreateBlog(status) {
      if (
        this.dataFormBlog.title != "" ||
        this.dataFormBlog.content != "" ||
        this.dataFormBlog.main_image != ""
      ) {
        let formDataBlog = new FormData();
        formDataBlog.append("main_image", this.dataFormBlog.main_image);
        formDataBlog.append("title", this.dataFormBlog.title);
        formDataBlog.append("content", this.dataFormBlog.content);
        formDataBlog.append("status", status);
        formDataBlog.append("authorId", this.$store.state.dataUserCurrent._id);

        this.dataFormBlog.list_category.forEach((data) => {
          formDataBlog.append("list_category[]", data);
        });

        const data = await blogService.createBlog(formDataBlog);

        if (data.success) {
          this.onShowNotifi({
            status: "success",
            message: "Tạo bài viết thành công",
            theme: "admin",
          });
          this.resetFormBlog();
        } else {
          this.onShowNotifi({
            status: "destructive",
            message: "Tạo bài viết không thành công",
            theme: "admin",
          });
        }
      }
    },

    async onUpdateBlog(status) {
      if (
        this.dataFormBlog.title != "" ||
        this.dataFormBlog.content != "" ||
        this.dataFormBlog.main_image != ""
      ) {
        let formDataBlog = new FormData();
        formDataBlog.append("main_image", this.dataFormBlog.main_image);
        formDataBlog.append("title", this.dataFormBlog.title);
        formDataBlog.append("content", this.dataFormBlog.content);
        formDataBlog.append("status", status);

        this.dataFormBlog.list_category.forEach((data) => {
          formDataBlog.append("list_category[]", data);
        });

        const updateData = await blogService.updateBlogWithId(
          this.dataEditBlog.idBlog,
          formDataBlog
        );

        if (updateData.success) {
          this.onShowNotifi({
            status: "success",
            message: "Chỉnh sửa bài viết thành công",
            theme: "admin",
          });
          this.resetFormBlog();
          this.$emit("onCreateNewBlog");
        } else {
          this.onShowNotifi({
            status: "destructive",
            message: "Chỉnh sửa bài viết không thành công",
            theme: "admin",
          });
        }
      }
    },
    convert_image: ConvertImage,
  },
  computed: {
    ...mapState(["dataUserCurrent"]),
  },
  watch: {},
};
</script>
