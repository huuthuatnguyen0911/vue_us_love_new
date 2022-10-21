<style></style>

<template>
  <Transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div id="FlipCardMainScreen" class="animate__animated animate__fadeIn">
      <h1>ANIMAL FLIP CART</h1>
      <h3>Chọn chế độ chơi</h3>
      <div class="modeGame">
        <button
          @click="onSelectMode(mode.numberBlock)"
          v-for="mode in listModeGame"
          :key="mode.id"
          :class="{ active: dataUserStart.curentMode == mode.numberBlock }"
        >
          <span>{{ mode.block }}</span>
          <span>{{ mode.nameMode }}</span>
        </button>
      </div>
      <div class="boxInputUserName">
        <h3>Nhập tên của bạn</h3>
        <input
          type="text"
          class="formInf__name__text"
          placeholder="Tên bạn"
          v-model="dataUserStart.name"
        />
      </div>

      <div class="boxMainButton d-flex justify-content-center">
        <button class="btnGotoHome" @click="onGoToHome">Về trang chủ</button>
        <button
          :disabled="
            !dataUserStart.name.length || dataUserStart.curentMode == null
          "
          class="btnStartGame"
          @click="onStartGame"
        >
          Vào game
        </button>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "FlipCardMainScreen",
  data() {
    return {
      dataUserStart: {
        curentMode: null,
        name: "",
      },
      listModeGame: [
        {
          id: 0,
          block: "4x4",
          nameMode: "Easy",
          numberBlock: 16,
        },
        {
          id: 1,
          block: "6x6",
          nameMode: "Normal",
          numberBlock: 36,
        },
        {
          id: 2,
          block: "8x8",
          nameMode: "Hard",
          numberBlock: 64,
        },
        // {
        //   id: 3,
        //   block: "10x10",
        //   nameMode: "Super Hard",
        //   numberBlock: 100,
        // },
      ],
    };
  },
  methods: {
    onSelectMode(numberBlock) {
      this.dataUserStart.curentMode = numberBlock;
    },
    onStartGame() {
      this.$emit("onStart", { dataUserStart: this.dataUserStart });
    },
    onGoToHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>
