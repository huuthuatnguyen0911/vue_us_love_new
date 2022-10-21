<template>
  <div id="boxAnimalDetailImage">
    <div class="boxConnentMainInner">
      <div class="row">
        <div
          class="col-md-4"
          v-for="item in dataAnimal.listImage"
          :key="item._id"
        >
          <div class="boxImageInner">
            <img :src="item" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimalDetailImages",
  props: ["dataAnimal"],
};
</script>

<style></style>
