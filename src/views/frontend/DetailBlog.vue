<style></style>

<template>
  <DefaultFrontend_1>
    <div class="DetailBlog" v-if="isShow">
      <div class="headerBlog">
        <div class="icon" @click="$router.go(-1)">
          <fa :icon="['fas', 'angle-left']" class="ic_back" />
        </div>
        <div class="boxTitle">
          <h3 class="textTitle">{{ dataBlogDetail.title }}</h3>
          <p class="text_author">
            Tác giả:
            <span class="name">{{ dataBlogDetail.dataAuthor[0].name }}</span>
          </p>
        </div>
      </div>

      <div class="contentBlog">
        <div class="boxMainImage">
          <img
            :src="convert_image(dataBlogDetail.main_image)"
            alt=""
            class="imgMainBlog"
          />
        </div>
        <div class="boxContentMain" v-html="dataBlogDetail.content"></div>
      </div>

      <div class="boxFooterBlog">
        <hr class="boxHr" />

        <div class="boxListTag">
          <p class="nameTag">{{ $t("tag") }}:</p>
          <ul class="listTags">
            <li
              class="itemTag"
              v-for="(tag, index) in dataBlogDetail.list_category"
              :key="index"
            >
              <router-link :to="{ name: 'home' }">
                <p class="titleTag">{{ tag }}</p>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="boxComment">
          <p class="titleBox">{{ $t("comments") }} ({{ countComment }})</p>
          <form action="javascript:void(0)" @submit.prevent class="formComment">
            <div class="formGroup">
              <textarea
                name="comment"
                class="txtComment"
                placeholder="Để lại nhận xét của bạn ở đây..."
                v-model="commentContent"
              ></textarea>
            </div>

            <div class="boxBtnSend" @click="sendComment">
              <fa :icon="['fas', 'paper-plane']" class="ic_sendComment" />
            </div>
          </form>

          <div class="boxListComment">
            <ul class="listComments">
              <li v-if="dataComments == null">
                <p>Không có bình luận nào</p>
              </li>

              <li
                class="itemComment"
                v-else
                v-for="(comment, index) in dataComments"
                :key="index"
              >
                <div class="boxItemComment">
                  <img
                    :src="convert_image(comment.dataParentUser[0].avatar)"
                    alt=""
                    class="imageUserComment"
                  />
                  <div class="boxContentCommentUser">
                    <div class="boxNameUser">
                      <p class="textNameUser">
                        {{ comment.dataParentUser[0].name }}
                      </p>
                      <p class="dateComment">
                        {{ format_date(comment.createdAt) }}
                      </p>
                    </div>
                    <p class="content">{{ comment.content }}</p>

                    <!-- <div class="boxHandleComment">
                      <div class="handlerComment">
                        <fa
                          :icon="['fas', 'thumbs-up']"
                          class="ic_handle ic_like"
                          :class="{ active: checkLike }"
                          @click="onHandleLike"
                        />
                        <span class="">36</span>
                      </div>
                      <div class="handlerComment">
                        <fa
                          :icon="['fas', 'thumbs-down']"
                          class="ic_handle ic_dislike"
                          :class="{ active: checkDislike }"
                          @click="onHandleDislike"
                        />
                        <span class="">36</span>
                      </div>
                    </div> -->
                  </div>
                </div>

                <div
                  class="boxItemChildrenComment"
                  v-for="(childComment, index) in comment.listChildrenComments"
                  :key="index"
                >
                  <img
                    :src="
                      convert_image(
                        filterChildrenComment(
                          comment.dataChildrentrUser,
                          childComment.commentator_id
                        ).avatar
                      )
                    "
                    alt=""
                    class="imageUserComment"
                  />
                  <div class="boxContentCommentUser">
                    <div class="boxNameUser">
                      <p class="textNameUser">
                        {{
                          filterChildrenComment(
                            comment.dataChildrentrUser,
                            childComment.commentator_id
                          ).name
                        }}
                      </p>
                      <p class="dateComment">
                        {{ format_date(childComment.createdAt) }}
                      </p>
                    </div>
                    <p class="content">{{ childComment.content }}</p>

                    <!-- <div class="boxHandleComment">
                      <div class="handlerComment">
                        <fa
                          :icon="['fas', 'thumbs-up']"
                          class="ic_handle ic_like"
                          :class="{ active: checkLike }"
                          @click="onHandleLike"
                        />
                        <span class="">36</span>
                      </div>
                      <div class="handlerComment">
                        <fa
                          :icon="['fas', 'thumbs-down']"
                          class="ic_handle ic_dislike"
                          :class="{ active: checkDislike }"
                          @click="onHandleDislike"
                        />
                        <span class="">36</span>
                      </div>
                    </div> -->
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="errorBox" v-else>
      <p class="">Bài viết không tồn tại</p>
    </div>
  </DefaultFrontend_1>

  <NotifiView ref="componentNotifi" />
</template>

<script>
import DefaultFrontend_1 from "@/layouts/DefaultFrontend_1.vue";
import { blogService } from "@/services/blogService";
import { commentService } from "@/services/commentService";
import ConvertImage from "@/utils/convertImage";
import FormatDate from "@/utils/fortmatDate";

export default {
  name: "DetailBlog",
  components: { DefaultFrontend_1 },
  data() {
    return {
      isShow: true,
      optionNotifi: {
        status: "",
        message: "",
        theme: "",
      },
      dataBlogDetail: {
        _id: "",
        title: "",
        main_image: "",
        list_category: [],
        content: "",
        countEye: "",
        createdAt: "",
        slug: "",
        dataAuthor: [
          {
            _id: "",
            avatar: "",
            name: "",
          },
        ],
      },
      dataComments: null,
      countComment: "0",
      commentContent: "",
      checkLike: false,
      checkDislike: false,
    };
  },

  mounted() {
    this.initDataMain();
  },
  created() {},
  methods: {
    async initDataMain() {
      document.title = this.titlePage;
      const dataBLogDetial = await blogService.getBlogDetailWithSlug(
        this.$route.params.slugBlog
      );

      console.log(dataBLogDetial);

      if (dataBLogDetial.success) {
        if (dataBLogDetial.data == null) {
          this.isShow = false;
        } else {
          this.dataBlogDetail = dataBLogDetial.data[0];
          this.getAllCommentOfBlog();
        }
      }
    },
    onShowNotifi(option) {
      this.optionNotifi = option;
      this.$refs.componentNotifi.onCreateNotification(this.optionNotifi);
    },
    onHandleLike() {
      this.checkLike = !this.checkLike;
      if (this.checkLike) {
        this.checkDislike = false;
      }
    },

    onHandleDislike() {
      this.checkDislike = !this.checkDislike;
      if (this.checkDislike) {
        this.checkLike = false;
      }
    },

    async sendComment() {
      console.log(this.$store.state.dataUserCurrent);

      if (this.$store.state.dataUserCurrent != null) {
        if (this.commentContent != "") {
          const formComment = {
            commentator_id: this.$store.state.dataUserCurrent._id,
            blog_id: this.dataBlogDetail._id,
            content: this.commentContent,
          };

          const dataComment = await commentService.sendComment(formComment);

          if (dataComment.success) {
            this.onShowNotifi({
              status: "success",
              message: "Cảm ơn bạn đã bình luận",
              theme: "",
            });
            this.commentContent = "";
            this.getAllCommentOfBlog();
          } else {
            this.onShowNotifi({
              status: "destructive",
              message: "Bình luận không thành công",
              theme: "",
            });
          }
        } else {
          this.onShowNotifi({
            status: "warning",
            message: "Bạn phải viết gì đó!",
            theme: "",
          });
        }
      }
    },

    async getAllCommentOfBlog() {
      const dataComment = await commentService.getAllCommentsWithIdBlog(
        this.dataBlogDetail._id
      );

      if (dataComment.success) {
        if (dataComment.data) {
          this.dataComments = dataComment.data.dataComment;
          this.countComment = dataComment.data.countComment;
        }
      }
    },

    filterChildrenComment(dataChildrentrUser, commentatorId) {
      let dataUser = {};

      dataChildrentrUser.filter((item) => {
        if (item._id == commentatorId) {
          dataUser = item;
        }
      });

      return dataUser;
    },

    convert_image: ConvertImage,
    format_date: FormatDate,
  },
  computed: {
    titlePage() {
      const routeName = this.$route.meta.title;
      const params = this.$route.params.slugBlog;
      const title = `${this.$t(routeName)} - ${params}`;
      return title;
    },

    // dataChildComment() {},
  },
};
</script>
