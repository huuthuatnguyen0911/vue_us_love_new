<template>
  <div id="AnimalDetailFormInfo">
    <div class="boxInnerContent">
      <p class="textInfoAnimal">
        Tên khoa hoc:
        <span class="titleInfo">{{ dataAnimal.name_science }}</span>
      </p>
      <p class="textInfoAnimal">
        Họ:
        <span class="titleInfo">{{ dataAnimal.surname }}</span>
      </p>
      <p class="textInfoAnimal">
        Lớp:
        <span class="titleInfo">{{ dataAnimal.order }}</span>
      </p>
      <p class="textInfoAnimal">
        Môi trường sống:
        <span class="titleInfo">{{ convert_habitat(dataAnimal.habitat) }}</span>
      </p>
      <p class="textInfoAnimal">
        Phân bố:
        <span class="titleInfo">{{ dataAnimal.distribution }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { convertHabitat, convertStatus } from "@/utils/ConvertAnimal";

export default {
  name: "AnimalDetailFormInfo",
  props: ["dataAnimal"],
  methods: {
    convert_habitat: convertHabitat,
    convert_status: convertStatus,
  },
};
</script>

<style></style>
