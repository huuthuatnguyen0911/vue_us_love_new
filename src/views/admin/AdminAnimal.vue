<template>
  <AdminDefault1>
    <div id="AdminAnimalView">
      <ul class="tabShowView">
        <li class="itemTab" :class="{ active: currentComponent == 'thien' }">
          Động vật
        </li>
        <li
          class="itemTab"
          :class="{ active: currentComponent == 'AnimalAddVue' }"
        >
          Thêm động vật
        </li>
      </ul>
      <hr class="lineHr" />
      <Transition
        enter-active-class="animate__animated animate__fadeIn animate__fast"
        leave-active-class="animate__animated animate__fadeOut animate__fast"
      >
        <component :is="currentComponent" />
      </Transition>
    </div>
  </AdminDefault1>
</template>

<script>
import AnimalAddVue from "@/components/admin/AnimalAdd.vue";
import AdminDefault1 from "@/layouts/admin_default_1.vue";

export default {
  name: "AdminAnimal",
  components: { AdminDefault1, AnimalAddVue },
  data() {
    return {
      currentComponent: "AnimalAddVue",
    };
  },
};
</script>

<style></style>
