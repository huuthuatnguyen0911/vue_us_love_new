<template>
  <div id="AnimalDetailMainInfo">
    <div class="boxMainContentInner">
      <div class="boxLeftMain">
        <ul class="listHandleSlide">
          <li class="btnHandleItem btnPrev">
            <fa
              :icon="['fas', 'angle-up']"
              class="ic_handle ic_prev"
              @click="prevSlide"
            />
          </li>
          <li
            class="itemDot"
            v-for="item in listComponents"
            :key="item.id"
            :class="{ active: item.name == currentComponent }"
          >
            <fa :icon="['fas', 'circle']" class="ic_dot" />
          </li>
          <li class="btnHandleItem btnNext" @click="nextSlide">
            <fa :icon="['fas', 'angle-down']" class="ic_handle ic_next" />
          </li>
        </ul>
      </div>
      <div class="boxRightMain">
        <Transition
          enter-active-class="animate__animated animate__fadeIn animate__fast"
          leave-active-class="animate__animated animate__fadeOut animate__fast"
        >
          <component
            :is="currentComponent"
            @emitShowReadMoreAnimal="handleShowReadMoreAnimal($event)"
            :dataAnimal="dataAnimal"
          ></component>
        </Transition>
      </div>
    </div>
  </div>

  <Transition
    enter-active-class="animate__animated animate__zoomIn animate__fast"
    leave-active-class="animate__animated animate__zoomOut animate__fast"
  >
    <AnimalDetailPopupVue
      :isShowPopupByName="isShowPopupByName"
      :dataShowPopup="dataShowPopup"
      @closePopup="handleClosePopup"
    />
  </Transition>
</template>

<script>
import AnimalDetailDescribeVue from "@/components/frontend/AnimalDetailDescribe.vue";
import AnimalDetailPopupVue from "./AnimalDetailPopup.vue";
import AnimalDetailFormInfoVue from "@/components/frontend/AnimalDetailFormInfo.vue";
import AnimalDetailImagesVue from "./AnimalDetailImages.vue";

export default {
  name: "AnimalDetailMainInfo",
  props: ["dataAnimal"],
  components: {
    AnimalDetailDescribeVue,
    AnimalDetailPopupVue,
    AnimalDetailFormInfoVue,
    AnimalDetailImagesVue,
  },
  data() {
    return {
      currentComponent: null,
      isShowPopupByName: "",
      dataShowPopup: null,
      indexCurrentComponent: 0,
      listComponents: [
        {
          id: 1,
          name: "AnimalDetailDescribeVue",
        },
        {
          id: 2,
          name: "AnimalDetailFormInfoVue",
        },
        {
          id: 3,
          name: "AnimalDetailImagesVue",
        },
      ],
    };
  },
  mounted() {
    this.currentComponent =
      this.listComponents[this.indexCurrentComponent].name;
  },
  methods: {
    handleShowReadMoreAnimal(event) {
      this.dataShowPopup = event;
      this.isShowPopupByName = "describe";
    },
    handleClosePopup() {
      this.dataShowPopu = null;
      this.isShowPopupByName = "";
    },
    prevSlide() {
      this.indexCurrentComponent--;
      if (this.indexCurrentComponent < 0) {
        this.indexCurrentComponent = this.listComponents.length - 1;
      }
      this.currentComponent =
        this.listComponents[this.indexCurrentComponent].name;
      console.log(this.listComponents[this.indexCurrentComponent].name);
    },
    nextSlide() {
      this.indexCurrentComponent++;
      if (this.indexCurrentComponent > this.listComponents.length - 1) {
        this.indexCurrentComponent = 0;
      }
      this.currentComponent =
        this.listComponents[this.indexCurrentComponent].name;
      console.log(this.listComponents[this.indexCurrentComponent].name);
    },
  },
};
</script>

<style></style>
