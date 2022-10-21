<style>
:root {
  --animate-delay: 0.5s;
}
</style>

<template>
  <Transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div id="BeginVideo" v-if="isShowVideo">
      <video class="video_begin" ref="videoNatural" @ended="onEventVideoFinish">
        <source
          src="https://firebasestorage.googleapis.com/v0/b/app-love-u.appspot.com/o/bao_ve_dong_vat.mp4?alt=media&token=cad74d7e-3675-4c8c-a574-61f35bc97add"
          type="video/mp4"
        />
      </video>

      <div
        class="boxOverPlayOnVideo"
        :style="[
          isShowButtonPlay ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : '',
        ]"
      >
        <div class="boxOverPlayOnVideo__inner" @click.self="onHandleVideo">
          <Transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <div class="boxShowContentMain" v-if="isShowButtonPlay">
              <div class="boxContent" @click="onPlayVideo">
                <div class="boxBtnPlay">
                  <fa :icon="['fas', 'play']" class="btnPlay" />
                  <div class="overLayButtonPlay"></div>
                </div>
              </div>
            </div>
          </Transition>

          <div class="boxBackPage">
            <div
              class="boxBackPage__inner animate__animated animate__fadeInBottomLeft"
              @click="onBackPage"
            >
              <fa :icon="['fas', 'rotate-left']" class="ic_rotate_left_back" />
              <p>{{ $t("back") }}</p>
            </div>
          </div>
          <div class="boxNextPage">
            <div
              class="boxNextPage__inner animate__animated animate__fadeInBottomRight"
              @click="onEmitNextPromise"
            >
              <p>{{ $t("nextPage") }}</p>
              <fa :icon="['fas', 'arrow-right']" class="ic_arrow_right_skip" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "BeginVideo",
  props: ["isShowVideo"],
  data() {
    return {
      isPlayVideo: true,
      isShowButtonPlay: false,
    };
  },
  mounted() {
    this.onInitBegin();
  },
  methods: {
    onInitBegin() {
      this.$refs.videoNatural.play();
    },
    onEventVideoFinish() {
      this.isPlayVideo = !this.isPlayVideo;
      this.onEmitNextPromise();
    },
    onHandleVideo() {
      this.isPlayVideo = !this.isPlayVideo;
    },
    onBackPage() {
      this.$emit("onBackPage");
    },
    onPlayVideo() {
      this.isPlayVideo = !this.isPlayVideo;
    },
    onEmitNextPromise() {
      this.$emit("onEmitNextPromise");
    },
  },
  watch: {
    isPlayVideo(newVal) {
      if (newVal) {
        this.$refs.videoNatural.play();
      } else {
        this.$refs.videoNatural.pause();
      }
      this.isShowButtonPlay = !this.isShowButtonPlay;
    },
  },
};
</script>
