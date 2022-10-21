<style></style>

<template>
  <AdminDefault1>
    <div id="AdminCampaignView">
      <section class="sc_statistical">
        <div class="row">
          <div class="col-md-3">
            <div class="boxStatisInner bgBoxAdmin">
              <div class="boxInforLeft">
                <p class="countNumber">200</p>
                <p class="nameStatistics">Chiến dịch</p>
              </div>
              <div class="boxInforRight">
                <fa :icon="['fas', 'check-double']" class="ic_statistic blue" />
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="boxStatisInner bgBoxAdmin">
              <div class="boxInforLeft">
                <p class="countNumber">200</p>
                <p class="nameStatistics">Bị cấm</p>
              </div>
              <div class="boxInforRight">
                <fa :icon="['fas', 'ban']" class="ic_statistic orange" />
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="boxStatisInner bgBoxAdmin">
              <div class="boxInforLeft">
                <p class="countNumber">200</p>
                <p class="nameStatistics">Quyên góp</p>
              </div>
              <div class="boxInforRight">
                <fa
                  :icon="['fas', 'hand-holding-dollar']"
                  class="ic_statistic violet"
                />
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <!-- <div class="boxStatisInner bgBoxAdmin">
              <div class="boxInforLeft">
                <p class="countNumber">200</p>
                <p class="nameStatistics">Quyên góp</p>
              </div>
              <div class="boxInforRight">
                <fa
                  :icon="['fas', 'hand-holding-dollar']"
                  class="ic_statistic violet"
                />
              </div>
            </div> -->
          </div>
        </div>

        <div class="boxChartBlogs bgBoxAdmin mt_40">
          <BarChart :chartData="dataChart" />
        </div>
      </section>

      <section class="sc_tabManagerCampaign">
        <ul class="listTab">
          <li
            class="itemTab"
            :class="{ active: currentTab == 'false' }"
            @click="onGetCampaignByStatus('false')"
          >
            Kiểm duyệt
          </li>
          <li
            class="itemTab"
            :class="{ active: currentTab == 'true' }"
            @click="onGetCampaignByStatus('true')"
          >
            Chiến dịch
          </li>
        </ul>

        <Transition>
          <CampaignTableDataVue
            :dataCampaignCurrent="dataCampaignCurrent"
            :isPending="isPendingCampaign"
            @removeCampaign="onHandleRemoveCampaign($event)"
            @getIdCampaign="onHandleIdCampaign($event)"
            @emitDeleteCampaign="onHandleDeleteCampaign($event)"
          />
        </Transition>
      </section>
    </div>
  </AdminDefault1>

  <CampaignShowQuickVue
    :isShowQuick="isShowQuick"
    :dataQuickView="dataQuickView"
    @closeQuickView="handleCloseQuickView"
  />

  <NotifiView ref="componentNotifi" />
</template>

<script>
import CampaignTableDataVue from "@/components/admin/CampaignTableData.vue";
import { isPendingCampaign, campaignService } from "@/services/campaignService";

import AdminDefault1 from "@/layouts/admin_default_1.vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import CampaignShowQuickVue from "@/components/admin/CampaignShowQuick.vue";

Chart.register(...registerables);

export default {
  name: "AdminCampaign",
  setup() {
    return { isPendingCampaign };
  },
  components: {
    AdminDefault1,
    BarChart,
    CampaignTableDataVue,
    CampaignShowQuickVue,
  },
  data() {
    return {
      isShowQuick: false,
      dataQuickView: null,
      currentTab: "false",
      dataCampaignCurrent: [],
      dataChart: {
        labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
        datasets: [
          {
            label: "Chiến dịch",
            data: [0, 0, 0, 0, 0, 10, 0, 50, 100, 0, 0, 0],
            backgroundColor: ["#42c636"],
          },
        ],
      },
    };
  },

  mounted() {
    this.onGetCampaignByStatus(this.currentTab);
  },
  methods: {
    async onGetCampaignByStatus(status) {
      this.currentTab = status;
      try {
        const dataRef = await campaignService.getCampaignByStatusConfirm(
          status
        );

        if (dataRef.status) {
          this.dataCampaignCurrent = dataRef.data;
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    async onHandleIdCampaign(event) {
      try {
        const dataRef = await campaignService.getOneCampaign(event);

        if (dataRef.status) {
          this.dataQuickView = dataRef.data;
          this.isShowQuick = true;
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    handleCloseQuickView() {
      this.isShowQuick = false;
      this.dataQuickView = null;
    },

    async onHandleDeleteCampaign(event) {
      try {
        const dataRef = await campaignService.deleteCampaignById(event);

        if (dataRef.status) {
          this.dataCampaignCurrent.forEach((campaign, index) => {
            if (campaign._id == event) {
              this.dataCampaignCurrent.splice(index, 1);
            }
          });

          this.$refs.componentNotifi.onCreateNotification({
            status: "success",
            message: "Xóa thành công",
            theme: "admin",
          });
        } else {
          this.$refs.componentNotifi.onCreateNotification({
            status: "destructive",
            message: "Xóa không thành công",
            theme: "admin",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    onHandleRemoveCampaign(event) {
      this.dataCampaignCurrent.splice(event, 1);
    },
  },
};
</script>
