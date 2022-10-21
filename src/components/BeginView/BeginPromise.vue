<style></style>

<template>
  <div id="BeginPromise">
    <div id="particles-js">
      <div class="boxInner">
        <p class="textThankyou">{{ typeValueThank }}</p>
        <p class="textPromise">{{ typeValuePromise }}</p>
        <audio ref="soundTypeText">
          <source src="@/assets/sound/go_van_ban.mp3" type="audio/mp3" />
        </audio>
        <div class="boxButton">
          <button class="btnLeft" @click="onNextOke">Tôi đống ý</button>
        </div>
      </div>

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
          @click="nextToPageHome"
        >
          <p>Tới trang chủ</p>
          <fa :icon="['fas', 'arrow-right']" class="ic_arrow_right_skip" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "particles.js";
import handleBegin from "@/utils/handleBegin";

export default {
  name: "BeginPromise",
  props: ["isShowPromise"],
  data() {
    return {
      textPromise:
        "Hãy tham gia với chúng tôi để tìm kiếm nhiều chương trình bảo vệ môi trường hơn nhé!",
      textThankyout: "Cảm ơn bạn lắng nghe thông điệp của chúng tôi!",
      startText: 0,
      typeValueThank: "",
      typeValuePromise: "",
      newTextDelay: 50,
    };
  },
  mounted() {
    this.initParticles();
    // if (!handleBegin.getItem) {
    //   console.log("tim duoc tren local" + handleBegin.getItem);
    // }
  },
  created() {
    setTimeout(this.initTextThank, this.newTextDelay + 200);
  },
  methods: {
    initTextThank() {
      if (this.startText < this.textThankyout.length) {
        this.typeValueThank += this.textThankyout.charAt(this.startText);
        this.startText++;
        setTimeout(this.initTextThank, this.newTextDelay);
        this.handleSoundTypeText(true);
      } else {
        this.startText = 0;
        this.handleSoundTypeText(false);
        this.initTextPromise();
      }
    },
    initTextPromise() {
      if (this.startText < this.textPromise.length) {
        this.typeValuePromise += this.textPromise.charAt(this.startText);
        this.startText++;
        setTimeout(this.initTextPromise, this.newTextDelay);
        this.handleSoundTypeText(true);
      } else {
        this.handleSoundTypeText(false);
      }
    },
    handleSoundTypeText(status) {
      if (status) {
        this.$refs.soundTypeText.play();
      } else {
        this.$refs.soundTypeText.pause();
      }
    },
    nextToPageHome() {
      this.handleSoundTypeText(false);
      handleBegin.setBegin(true);
      this.$router.push({ name: "home" });
    },
    onNextOke() {
      handleBegin.setBegin(true);
      this.$router.push({ name: "login" });
    },
    onBackPage() {
      this.$emit("onBackPage");
    },
    initParticles() {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 700,
            },
          },
          color: {
            value: "#42c636",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#42c636",
            },
            polygon: {
              nb_sides: 5,
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#42c636",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    },
  },
};
</script>
