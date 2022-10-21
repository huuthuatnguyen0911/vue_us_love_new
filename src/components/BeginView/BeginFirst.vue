<style></style>

<template>
  <Transition leave-active-class="animate__animated animate__fadeOut">
    <div id="BeginFirst" v-if="isShowFirst">
      <div class="boxBeginMain__image">
        <video autoplay muted loop="true" class="videoSpace">
          <source src="@/assets/video/video_space.mp4" type="video/mp4" />
        </video>
        <!-- <img src="@/assets/images/page/img_earth_from_space_2.jpg" alt="" /> -->
        <!-- <div
          class="boxImageInner boxImageLeft animate__animated animate__fadeInLeft"
        >
          <img src="@/assets/styles/begin/image_begin_1.jpg" alt="" />
        </div>
        <div
          class="boxImageInner boxImageRight animate__animated animate__fadeInRight"
        >
          <img src="@/assets/styles/begin/image_begin_2.png" alt="" />
        </div> -->
      </div>

      <div class="boxOverlayMain">
        <div class="overlayInner">
          <div class="boxLogo animate__animated animate__fadeInLeft">
            <img
              src="@/assets/images/heart-logo.png"
              alt=""
              class="logo__image"
            />
            <p class="logo__text">
              <span class="logo__text--emphasize">Us</span>Love
            </p>
          </div>

          <div class="boxShowContentMain">
            <div
              class="boxContent animate__animated animate__fadeInUp"
              @click="onPlayVideo"
            >
              <p class="textContent">
                <span class="textMessage">{{ $t("textMessage") }} </span>
                {{ $t("textBegin") }}
              </p>
              <div class="boxBtnPlay">
                <fa :icon="['fas', 'play']" class="btnPlay" />
                <div class="overLayButtonPlay"></div>
              </div>
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
  name: "BeginFirst",
  props: ["isShowFirst"],
  methods: {
    onPlayVideo() {
      this.$emit("onPlayVideo");
    },
    onEmitNextPromise() {
      this.$emit("onEmitNextPromise");
    },
  },
};
</script>
