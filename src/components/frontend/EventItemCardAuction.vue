<style lang="scss"></style>

<template>
  <div class="card_auction">
    <img class="imagecard" :src="dataItemAuction.img" alt="" />
    <div class="box__card__inner">
      <div class="box__header__card">
        <div class="header__title__card">
          <p class="title__card">{{ sub_string(dataItemAuction.name, 35) }}</p>
          <p class="time_card">{{ dataItemAuction.date }}</p>
        </div>
      </div>
      <p class="description__card">
        {{ sub_string(dataItemAuction.description, 80) }}
      </p>
      <div class="btn__card" @click="onEmitShowPopup(dataItemAuction)">
        Xem chi tiết
      </div>
    </div>
    <!-- <div class="overlay"></div> -->
  </div>
</template>

<script>
import SubString from "@/utils/sub_string";

export default {
  name: "CardAuction",
  props: ["dataItemAuction"],
  methods: {
    onEmitShowPopup(data) {
      this.$emit("show-popup", data);
    },
    sub_string: SubString,
  },
};
</script>
