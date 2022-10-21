<template>
  <div class="box__map__home">
    <div class="box__item__left">
      <div class="box__item__left__inner">
        <img
          src="@/assets/images/page/viet_nam.png"
          alt=""
          class="map__vietnam"
        />
        <div
          class="box__map__item box__northern"
          @mouseover="onSelect(0)"
          @mouseout="onOutSelect(-1)"
        >
          <router-link :to="{ name: 'home' }">
            <img src="@/assets/images/page/bgbac.png" alt="" />
          </router-link>
        </div>
        <div
          class="box__map__item box__central"
          @mouseover="onSelect(1)"
          @mouseout="onOutSelect(-1)"
        >
          <router-link :to="{ name: 'home' }">
            <img src="@/assets/images/page/bgtrung.png" alt="" />
          </router-link>
        </div>
        <div
          class="box__map__item box__south"
          @mouseover="onSelect(2)"
          @mouseout="onOutSelect(-1)"
        >
          <router-link :to="{ name: 'home' }">
            <img src="@/assets/images/page/bgnam.png" alt="" />
          </router-link>
        </div>
      </div>
    </div>

    <div class="box__item__right">
      <div
        class="item__region"
        v-for="(item, index) in getDataMapVietNam"
        :key="item.id"
        :class="{ active__select: active_selected == index }"
      >
        <div class="img__region">
          <img :src="`${require('@/assets/images/page/' + item.img)}`" alt="" />
        </div>
        <div class="box__inf">
          <p class="name">{{ item.name }}</p>
          <p class="description">
            {{ sub_string(item.description, 100) }}
          </p>
          <div class="btn__box">
            <p>Đi đến</p>
            <fa :icon="['fas', 'arrow-right']" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubString from "@/utils/sub_string";

export default {
  name: "MapHome",

  data() {
    return {
      active_selected: -1,
    };
  },

  methods: {
    sub_string: SubString,
    onSelect(n) {
      this.active_selected = n;
    },
    onOutSelect(n) {
      this.active_selected = n;
    },
  },

  computed: {
    getDataMapVietNam() {
      return this.$store.state.dataMapVietName;
    },
  },
};
</script>

<style></style>
