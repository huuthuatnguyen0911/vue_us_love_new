<template>
  <div id="AnimalDetailBottom">
    <div class="boxInnerContent">
      <div class="boxContentLeft">
        <ul class="listInfoCounter">
          <li class="itemInfo">
            <p class="number">{{ dataAnimal.number_individuals }}</p>
            <p class="name">Cá thể</p>
          </li>
          <li class="itemInfo">
            <p class="number">{{ dataAnimal.detection_time }}</p>
            <p class="name">Phát hiện</p>
          </li>
          <li class="itemInfo">
            <p class="number">{{ dataAnimal.age }}</p>
            <p class="name">Tuổi thọ (năm)</p>
          </li>
        </ul>
      </div>
      <div class="boxContentRight">
        <p class="textInfoAnimal">
          Tình trạng:
          <span class="content green">{{
            convert_status(dataAnimal.status)
          }}</span>
        </p>
        <p class="textInfoAnimal">
          Môi trường sống:
          <span class="content">{{ convert_habitat(dataAnimal.habitat) }}</span>
        </p>
        <p class="textInfoAnimal">
          Phân bố: <span class="content">{{ dataAnimal.distribution }}</span>
        </p>
        <p class="textInfoAnimal">
          Kích thước:
          <span class="content">{{ dataAnimal.size }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { convertHabitat, convertStatus } from "@/utils/ConvertAnimal";

export default {
  name: "AnimalDetailBottom",
  props: ["dataAnimal"],
  methods: {
    convert_habitat: convertHabitat,
    convert_status: convertStatus,
  },
};
</script>

<style></style>
