<style></style>

<template>
  <div id="beginStartView">
    <BeginVideo
      v-if="isShowVideo"
      :isShowVideo="isShowVideo"
      @onBackPage="handleBackPage"
      @onEmitNextPromise="handleNextPromise"
    />
    <BeginFirst
      :isShowFirst="isShowFirst"
      @onPlayVideo="handlePlayVideo"
      @onEmitNextPromise="handleNextPromise"
    />
    <BeginPromise
      v-if="isShowPromise"
      @onBackPage="handleBackPage"
      :isShowPromise="isShowPromise"
    />
  </div>
</template>

<script>
import BeginFirst from "@/components/BeginView/BeginFirst.vue";
import BeginVideo from "@/components/BeginView/BeginVideo.vue";
import BeginPromise from "@/components/BeginView/BeginPromise.vue";
import handleBegin from "@/utils/handleBegin";

export default {
  name: "BeginStartView",
  components: { BeginFirst, BeginVideo, BeginPromise },
  data() {
    return {
      isShowFirst: true,
      isShowVideo: false,
      isShowPromise: false,
    };
  },
  beforeCreate() {
    if (handleBegin.getBegin()) {
      // console.log(handleBegin.getBegin());
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    handlePlayVideo() {
      this.isShowVideo = true;
      this.isShowFirst = false;
      this.isShowPromise = false;
    },
    handleBackPage() {
      this.isShowVideo = false;
      this.isShowFirst = true;
      this.isShowPromise = false;
    },
    handleNextPromise() {
      this.isShowVideo = false;
      this.isShowFirst = false;
      this.isShowPromise = true;
    },
  },
};
</script>
