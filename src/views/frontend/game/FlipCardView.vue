<style></style>

<template>
  <Transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div class="mainFlipCardGame">
      <audio loop autoplay ref="musicGameFlipCard">
        <source src="@/assets/sound/music_flipcard.mp3" type="audio/mp3" />
      </audio>
      <div id="particles-js"></div>
      <div class="boxMainScreen">
        <flipcard-main-screen
          v-if="statusMatch === 'default'"
          :cardsContext="settings.cardsContext"
          @onStart="onHandleBeforeStart($event)"
        />

        <flipcard-interact-screen
          v-if="statusMatch === 'match'"
          :cardsContext="settings.cardsContext"
          @onFinish="onGetResult($event)"
        />

        <filpcard-result
          :timer="settings.timer"
          :userName="settings.userNamel"
          v-if="statusMatch === 'result'"
          @onStartAgain="statusMatch = 'default'"
        />
      </div>
    </div>
  </Transition>
</template>

<script>
import "particles.js";
import FlipcardMainScreen from "@/components/frontend/game/FlipcardMainScreen.vue";
import { shuffled } from "@/utils/arrayRandom";
import FlipcardInteractScreen from "@/components/frontend/game/FlipcardInteractScreen.vue";
import FilpcardResult from "@/components/frontend/game/FilpcardResult.vue";

export default {
  components: { FlipcardMainScreen, FlipcardInteractScreen, FilpcardResult },
  name: "FlipCardView",
  data() {
    return {
      statusMatch: "default",
      settings: {
        totalOfBlocks: 0,
        cardsContext: [],
        userNamel: "",
        startedAt: null,
        timer: "",
      },
    };
  },
  mounted() {
    this.initParticles();
    this.initMusic();
  },
  methods: {
    initMusic() {
      this.$refs.musicGameFlipCard.play();
    },
    onHandleBeforeStart(event) {
      this.settings.totalOfBlocks = event.dataUserStart.curentMode;
      const firstCards = Array.from(
        { length: this.settings.totalOfBlocks / 2 },
        (_, i) => i + 1
      );
      const secondCards = [...firstCards];
      const cards = [...firstCards, ...secondCards];
      this.settings.cardsContext = shuffled(
        shuffled(shuffled(shuffled(cards)))
      );
      this.settings.startedAt = new Date().getTime();
      this.settings.userNamel = event.dataUserStart.name;
      this.statusMatch = "match";
    },

    onGetResult(event) {
      this.settings.timer = event.timer;
      // get timers
      // this.timer = new Date().getTime() - this.settings.startedAt;
      // switch to results components
      this.statusMatch = "result";
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
