<template>
  <DefaultFrontend_1>
    <div
      id="EventPage"
      class="animate__animated animate__fadeIn"
      v-if="!isPending"
    >
      <section class="sc_campaigns">
        <div class="boxHeaderCampaign">
          <p class="titleText">Các chiến dịch</p>
          <input
            type="text"
            placeholder="vd: Nha Trang, Đà Nẵng"
            class="inputSearch"
          />
        </div>

        <div class="row">
          <div
            class="col-md-4 mt_20 col__respon__tablet"
            v-for="item in dataItemcampaign"
            :key="item._id"
          >
            <ItemAnotherCampaign :dataCampaign="item" />
          </div>
        </div>
      </section>
    </div>

    <div class="text-center" v-else>
      <div class="lds-ripple dark">
        <div></div>
        <div></div>
      </div>
    </div>
  </DefaultFrontend_1>

  <!-- <PopupCampaignVue /> -->
</template>

<script>
import DefaultFrontend_1 from "@/layouts/DefaultFrontend_1.vue";
import ItemAnotherCampaign from "@/components/frontend/campaign/ItemAnotherCampaign.vue";
import { initPageService, isPending } from "@/services/initPageService";
// import PopupCampaignVue from "@/components/frontend/campaign/PopupCampaign.vue";

export default {
  name: "EventView",
  setup() {
    return { isPending };
  },
  components: {
    DefaultFrontend_1,
    ItemAnotherCampaign,
    // PopupCampaignVue,
  },
  data() {
    return {
      dataItemcampaign: null,
    };
  },
  created() {
    this.initDataMain();
  },
  methods: {
    async initDataMain() {
      const dataRef = await initPageService.initEventPage();
      if (dataRef.success) {
        this.dataItemcampaign = dataRef.data.dataCampaigns;
      }
    },
  },
};
</script>
