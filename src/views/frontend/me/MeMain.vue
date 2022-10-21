<style></style>

<template>
  <DefaultFrontend_1>
    <div class="MeMainBox">
      <div class="headerMe">
        <div class="boxAvatar">
          <img :src="convert_image(avaterUser)" alt="" class="imgAvatar" />
          <label for="inputChangeAvatar">
            <fa :icon="['fas', 'camera']" class="ic_camera" />
            <input
              type="file"
              class="d-none"
              accept=".jpg, .jpeg, .png"
              id="inputChangeAvatar"
              @change="onChangeAvatar"
            />
          </label>
        </div>
        <div class="boxStatistical">
          <ul class="listStatistical">
            <li class="itemStatistical">
              <div class="colItemInne backgroundMainItem">
                <div class="boxInforLeft">
                  <p class="countNumber">20</p>
                  <p class="nameStatistics">Hoạt động</p>
                </div>
                <div class="boxInforRight">
                  <fa
                    :icon="['fas', 'child-reaching']"
                    class="ic_statistic orange"
                  />
                </div>
              </div>
            </li>

            <li class="itemStatistical">
              <div class="colItemInne backgroundMainItem">
                <div class="boxInforLeft">
                  <p class="countNumber">20</p>
                  <p class="nameStatistics">Quyên góp</p>
                </div>
                <div class="boxInforRight">
                  <fa
                    :icon="['fas', 'hand-holding-dollar']"
                    class="ic_statistic violet"
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="boxTabMe">
        <ul class="listTab">
          <li class="itemTab" v-for="item in listTabMe" :key="item.id">
            <div
              class="boxInnerTab"
              :class="{ active: item.component == currentComponent }"
              @click="currentComponent = item.component"
            >
              {{ item.name }}
            </div>
          </li>
        </ul>

        <keep-alive>
          <component :is="currentComponent" />
        </keep-alive>
      </div>
    </div>
  </DefaultFrontend_1>

  <NotifiView ref="componentNotifi" />
</template>

<script>
import DefaultFrontend_1 from "@/layouts/DefaultFrontend_1.vue";
import { mapState } from "vuex";
import ConvertImage from "@/utils/convertImage";
import MeInformation from "@/components/frontend/me/MeInformation.vue";
import MeAuthenAccount from "@/components/frontend/me/MeAuthenAccount.vue";
import { meService, isPending } from "@/services/meService";

export default {
  name: "MeMain",
  setup() {
    return { isPending };
  },
  components: { DefaultFrontend_1, MeInformation, MeAuthenAccount },
  data() {
    return {
      avaterUser: null,
      currentComponent: "MeInformation",
      listTabMe: [
        {
          id: 0,
          name: "Thông tin",
          component: "MeInformation",
        },

        {
          id: 1,
          name: "Xác minh",
          component: "MeAuthenAccount",
        },
      ],
    };
  },
  mounted() {
    this.intiDataMain();
  },
  methods: {
    intiDataMain() {
      this.avaterUser = this.dataUserCurrent.avatar;
    },
    async onChangeAvatar(event) {
      const file = event.target.files[0];

      const formDate = new FormData();
      formDate.append("image_avatar", file);

      const dataRef = await meService.updateAvatar(
        this.dataUserCurrent._id,
        formDate
      );

      if (dataRef.success) {
        this.avaterUser = dataRef.data.linkNewImage;
        this.$refs.componentNotifi.onCreateNotification({
          status: "success",
          message: "Đổi ảnh đại diện thành công",
          theme: "",
        });
      } else {
        this.$refs.componentNotifi.onCreateNotification({
          status: "destructive",
          message: "Đổi ảnh đại diện không thành công",
          theme: "",
        });
      }
    },
    convert_image: ConvertImage,
  },
  computed: {
    ...mapState(["dataUserCurrent"]),
  },
};
</script>
