<template>
  <div id="AnimalDetailSlideMain">
    <p class="mainNameAnimal">{{ dataAnimal.name }}</p>
    <p class="subContent">
      {{ dataAnimal.sub_des }}
    </p>
    <button class="btnRead" @click="emitShowReadMoreAnimal">Đọc tiếp</button>
  </div>
</template>

<script>
export default {
  name: "AnimalDetailSlideMain",
  props: ["dataAnimal"],
  data() {
    return {};
  },

  methods: {
    emitShowReadMoreAnimal() {
      this.$emit("emitShowReadMoreAnimal", this.dataAnimal);
    },
  },
};
</script>

<style></style>
