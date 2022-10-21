<template>
  <div class="screenInteract">
    <div
      class="screen__inner"
      :style="{
        width: `${
          ((((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) / 4 +
            16) *
          Math.sqrt(cardsContext.length)
        }px`,
      }"
    >
      <CardFlip
        v-for="(card, index) in cardsContext"
        :key="index"
        :ref="`card-${index}`"
        :imagBackFaceUrl="`${card}.png`"
        :card="{ index: index, value: card }"
        @onFlip="checkRule($event)"
        :cardsContext="cardsContext"
      />
    </div>
    <div class="boxInforScore">
      <div class="row">
        <div class="col-md-6">
          <div class="ScorceInforInner ScorceInnerLeft">
            <p class="textTitleGame">Hoàn Thành</p>
            <p class="blockSuccess">
              <span class="countBlock">{{ currentSuccessBlock }}</span> /
              <span class="totalBlock">{{ totalBlock }}</span>
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="ScorceInforInner ScorceInnerRight">
            <p class="textTitleGame">Thời gian</p>
            <p class="number__countdown">{{ timer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardFlip from "./FlipcardCard.vue";
export default {
  name: "FlipcardInteractScreen",
  props: {
    cardsContext: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },

  components: {
    CardFlip,
  },

  data() {
    return {
      rules: [],
      currentSuccessBlock: 0,
      totalBlock: 0,
      timer: "00:00:00",
      sec: 0,
      min: 0,
      hr: 0,
    };
  },

  mounted() {
    this.initData();
    this.timerCycle();
  },

  methods: {
    initData() {
      this.totalBlock = this.cardsContext.length / 2;
    },

    timerCycle() {
      this.sec = parseInt(this.sec);
      this.min = parseInt(this.min);
      this.hr = parseInt(this.hr);

      this.sec = this.sec + 1;

      if (this.sec == 60) {
        this.min = this.min + 1;
        this.sec = 0;
      }
      if (this.min == 60) {
        this.hr = this.hr + 1;
        this.min = 0;
        this.sec = 0;
      }

      if (this.sec < 10 || this.sec == 0) {
        this.sec = "0" + this.sec;
      }
      if (this.min < 10 || this.min == 0) {
        this.min = "0" + this.min;
      }
      if (this.hr < 10 || this.hr == 0) {
        this.hr = "0" + this.hr;
      }

      this.timer = this.hr + ":" + this.min + ":" + this.sec;

      setTimeout(this.timerCycle, 1000);
    },

    checkRule(card) {
      if (this.rules.length === 2) return false;

      this.rules.push(card);
      if (
        this.rules.length === 2 &&
        this.rules[0].value === this.rules[1].value
      ) {
        this.currentSuccessBlock++;

        // console.log("right...");
        // add class "disabled" to components card
        this.$refs[`card-${this.rules[0].index}`][0].onEnabledDisabledModels();
        this.$refs[`card-${this.rules[1].index}`][0].onEnabledDisabledModels();
        // reset rules to []
        this.rules = [];

        const disabledElements = document.querySelectorAll(
          ".screenInteract .card.disabled"
        );

        if (
          disabledElements &&
          disabledElements.length === this.cardsContext.length - 2
        ) {
          setTimeout(() => {
            this.$emit("onFinish", { timer: this.timer });
          }, 920);
        }
      } else if (
        this.rules.length === 2 &&
        this.rules[0].value !== this.rules[1].value
      ) {
        setTimeout(() => {
          this.$refs[`card-${this.rules[0].index}`][0].onFlipBackCard();
          this.$refs[`card-${this.rules[1].index}`][0].onFlipBackCard();
          // reset rules to []
          this.rules = [];
        }, 700);
      } else return false;
    },
  },
};
</script>

<style scoped lang="css"></style>
