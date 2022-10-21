<template>
  <div
    id="AnimalView"
    v-if="!isPendingGetAnimal && dataAnimal"
    :style="{ backgroundImage: 'url(' + dataAnimal.imageEnv + ')' }"
  >
    <div class="drak_overlay"></div>
    <div class="InnerMainContent">
      <!-- <div class="boxMainContent"> -->
      <div class="boxFindAnimalMain">
        <div class="boxSearch">
          <fa :icon="['fas', 'magnifying-glass']" class="ic-search" />
          <input type="text" placeholder="Tìm kiếm" class="inputSearch" />
        </div>
      </div>

      <!-- <AnimalDetailMainInfoVue /> -->

      <AnimalDetailMainInfoVue :dataAnimal="dataAnimal" />

      <div class="boxImageMainAnimal">
        <img :src="dataAnimal.avatar" alt="" class="mainImage" />
      </div>

      <AnimalDetailBottomVue :dataAnimal="dataAnimal" />
    </div>
    <!-- </d iv> -->
  </div>

  <div class="boxLoading" v-else>Đang tải</div>
</template>

<script>
import AnimalDetailBottomVue from "@/components/frontend/AnimalDetailBottom.vue";
import AnimalDetailMainInfoVue from "@/components/frontend/AnimalDetailMainInfo.vue";
import { AnimalService, isPendingGetAnimal } from "@/services/AnimalService";

export default {
  name: "AnimalView",
  setup() {
    return { isPendingGetAnimal };
  },
  components: { AnimalDetailBottomVue, AnimalDetailMainInfoVue },
  data() {
    return {
      img_current: "",
      dataAnimal: null,
      testName: "thien",
    };
  },
  mounted() {
    this.initDataMain();
  },
  methods: {
    async initDataMain() {
      try {
        const dataRef = await AnimalService.getOneAnimalBySlug(
          this.$route.params.slug_animal
        );

        if (dataRef.status && dataRef.data) {
          this.dataAnimal = dataRef.data;
          this.proDataAnimal = this.dataAnimal;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    onShowImage(src) {
      this.img_current = src;
    },
    closeShowImage() {
      this.img_current = "";
    },
  },
};
</script>

<style></style>
