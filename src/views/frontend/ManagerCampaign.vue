<template>
  <DefaultFrontend_1>
    <div id="ManagerCampaign">
      <p class="tilePage">Quản lí chiến dịch</p>
      <ul class="listTab">
        <li class="itemTab active">Tham gia</li>
        <li class="itemTab">Chiến dịch của tôi</li>
      </ul>

      <ul class="listShowAnimal">
        <li class="itemAnimal">
          <ItemAnimalVue />
        </li>
      </ul>
    </div>
  </DefaultFrontend_1>
</template>

<script>
import DefaultFrontend_1 from "@/layouts/DefaultFrontend_1.vue";
import ItemAnimalVue from "@/components/frontend/ItemAnimal.vue";

export default {
  name: "ManagerCampaign",
  components: {
    DefaultFrontend_1,
    ItemAnimalVue,
  },
};
</script>

<style></style>
