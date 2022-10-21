<template>
  <DefaultFrontend_1>
    <div
      id="HomePage"
      class="animate__animated animate__fadeIn"
      v-if="!isPending"
    >
      <section class="sc_slide_main">
        <HomeSlide />
      </section>

      <section class="sc__count mt-50">
        <CountHome />
      </section>

      <section class="sc__map mt-50">
        <MapHome />
      </section>

      <section class="sc__charity__organization mt-50">
        <CharityOrganization />
      </section>

      <!-- <section class="sc__campaigns mt-50">
        <Campaigns :dataCampaign="dataCampaigns" />
      </section> -->

      <section class="sc__blogs mt-50">
        <BlogHome />
      </section>
    </div>

    <div class="text-center" v-else>
      <div class="lds-ripple dark">
        <div></div>
        <div></div>
      </div>
    </div>
    <PopupCampaign />
  </DefaultFrontend_1>
</template>

<script>
import DefaultFrontend_1 from "@/layouts/DefaultFrontend_1.vue";
import HomeSlide from "@/components/frontend/HomeSlide.vue";
import CountHome from "@/components/frontend/HomeCount.vue";
import CharityOrganization from "@/components/frontend/HomeCharityOrganization.vue";
// import Campaigns from "@/components/frontend/HomeCampaigns.vue";
import BlogHome from "@/components/frontend/HomeBlog.vue";
import PopupCampaign from "@/components/frontend/HomeItemPopupCampaign.vue";
import MapHome from "@/components/frontend/HomeMap.vue";
import { isPending, initPageService } from "@/services/initPageService";

export default {
  name: "HomeView",
  setup() {
    return { isPending };
  },
  components: {
    DefaultFrontend_1,
    HomeSlide,
    CountHome,
    CharityOrganization,
    // Campaigns,
    BlogHome,
    PopupCampaign,
    MapHome,
  },
  data() {
    return {
      dataCampaigns: null,
    };
  },
  created() {
    this.initDataMain();
  },
  methods: {
    async initDataMain() {
      const dataRef = await initPageService.initHomePage();

      if (dataRef.success) {
        this.dataCampaigns = dataRef.data.dataCampaings;
      }
    },
  },
};
</script>
