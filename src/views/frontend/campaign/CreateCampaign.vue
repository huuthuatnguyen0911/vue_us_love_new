<style></style>

<template>
  <div class="CreateCampaignView">
    <div id="bg__overlay"></div>

    <div class="boxCreateInner">
      <fa
        :icon="['fas', 'xmark']"
        class="ic_cancel_campaign"
        @click="$router.go(-1)"
      />

      <div class="boxTimelineCreate">
        <ul class="ListTimeline">
          <li
            class="itemTimeline"
            :class="{ active: checkPassTimeline('pass1') }"
          >
            <div class="boxContent">
              <div class="circle">1</div>
              <p class="content">Nhập thông tin tổ chức</p>
            </div>
          </li>

          <li
            class="itemTimeline"
            :class="{ active: checkPassTimeline('pass2') }"
          >
            <hr class="line-dot" />
            <div class="boxContent">
              <div class="circle">2</div>
              <p class="content">Nhập thông tin chiến dịch</p>
            </div>
          </li>

          <li
            class="itemTimeline"
            :class="{ active: checkPassTimeline('pass3') }"
          >
            <hr class="line-dot" />
            <div class="boxContent">
              <div class="circle">3</div>
              <p class="content">Xác nhận</p>
            </div>
          </li>

          <li
            class="itemTimeline"
            :class="{ active: checkPassTimeline('pass4') }"
          >
            <hr class="line-dot" />
            <div class="boxContent">
              <div class="circle">4</div>
              <p class="content">Hoàn thành</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="mainShowComponent">
        <keep-alive>
          <component
            :is="currentComponent"
            @dataOrganize="setDataOrganize($event)"
            @onPreClickPageInforOrganize="
              currentComponent = 'CampaignInforOrganize'
            "
            @onNextPageConfirm="currentComponent = 'CampaignConfirm'"
            @onBackPageCampaign="currentComponent = 'CampaignInforNew'"
            @onSendCreateCampaign="handleSendCreateCampaign"
            :dataCampaign="dataMainCreateCampaign.dataCampaign"
            :dataDonate="dataMainCreateCampaign.dataDonate"
            @onEmitDataCampaign="emitDataCampaign($event)"
            @onEmitDataDonate="emitDataDonate($event)"
          />
        </keep-alive>

        <!-- <div class="boxButtonHandle">
          <button class="btnPre">Quay lại</button>
          <button class="btnContinue">{{ nameContinue }}</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import CampaignInforOrganize from "@/components/frontend/campaign/CampaignInforOrganize.vue";
import CampaignInforNew from "@/components/frontend/campaign/CampaignInforNew.vue";
import CampaignConfirm from "@/components/frontend/campaign/CampaignConfirm.vue";
import CampaignSucess from "@/components/frontend/campaign/CampaignSucess.vue";
import {
  campaignService,
  contract,
  currentUserAddress,
} from "@/services/campaignService";

export default {
  name: "CreateCampaign",

  components: {
    CampaignInforOrganize,
    CampaignInforNew,
    CampaignConfirm,
    CampaignSucess,
  },
  data() {
    return {
      listPassCreate: [],
      currentComponent: "",
      nameContinue: "Tiếp theo",
      dataMainCreateCampaign: {
        organize: null,
        dataCampaign: {
          campaign_avatar: null,
          campaign_name: "",
          campaign_start_time: "",
          campaign_end_time: "",
          campaign_province: "",
          campaign_district: "",
          campaign_wards: "",
          campaign_location_detail: "",
          campaign_description: "",
          campaign_password: "",
          campaign_type: "",
          CM_max_members: 0,
        },
        dataDonate: {
          Donate_max_money: 0,
          Donate_date: 0,
          Donate_account_number_bank: "",
          Donate_bank_code: "",
          Donate_bank_name_account: "",
        },
      },
    };
  },
  mounted() {
    this.initDataMain();
  },
  methods: {
    initDataMain() {
      this.currentComponent = "CampaignInforOrganize";
    },
    async handleSendCreateCampaign() {
      const formData = new FormData();
      formData.append(
        "imageCampaign[]",
        this.dataMainCreateCampaign.organize.CO_avatar
      );
      formData.append(
        "imageCampaign[]",
        this.dataMainCreateCampaign.dataCampaign.campaign_avatar
      );

      formData.append("CO_name", this.dataMainCreateCampaign.organize.CO_name);
      formData.append("CO_link", this.dataMainCreateCampaign.organize.CO_link);
      formData.append(
        "CO_phone",
        this.dataMainCreateCampaign.organize.CO_phone
      );
      formData.append(
        "CO_location",
        this.dataMainCreateCampaign.organize.CO_location
      );
      formData.append(
        "CO_description",
        this.dataMainCreateCampaign.organize.CO_description
      );

      formData.append(
        "campaign_name",
        this.dataMainCreateCampaign.dataCampaign.campaign_name
      );
      formData.append(
        "campaign_start_time",
        this.dataMainCreateCampaign.dataCampaign.campaign_start_time
      );
      formData.append(
        "campaign_end_time",
        this.dataMainCreateCampaign.dataCampaign.campaign_end_time
      );
      formData.append(
        "campaign_province",
        this.dataMainCreateCampaign.dataCampaign.campaign_province
      );
      formData.append(
        "campaign_district",
        this.dataMainCreateCampaign.dataCampaign.campaign_district
      );
      formData.append(
        "campaign_wards",
        this.dataMainCreateCampaign.dataCampaign.campaign_wards
      );
      formData.append(
        "campaign_location_detail",
        this.dataMainCreateCampaign.dataCampaign.campaign_location_detail
      );
      formData.append(
        "campaign_description",
        this.dataMainCreateCampaign.dataCampaign.campaign_description
      );
      formData.append(
        "campaign_password",
        this.dataMainCreateCampaign.dataCampaign.campaign_password
      );
      formData.append(
        "campaign_type",
        this.dataMainCreateCampaign.dataCampaign.campaign_type
      );
      formData.append(
        "CM_max_members",
        this.dataMainCreateCampaign.dataCampaign.CM_max_members
      );

      formData.append(
        "Donate_max_money",
        this.dataMainCreateCampaign.dataDonate.Donate_max_money
      );
      formData.append(
        "Donate_date",
        this.dataMainCreateCampaign.dataDonate.Donate_date
      );
      formData.append(
        "Donate_account_number_bank",
        this.dataMainCreateCampaign.dataDonate.Donate_account_number_bank
      );
      formData.append(
        "Donate_bank_code",
        this.dataMainCreateCampaign.dataDonate.Donate_bank_code
      );
      formData.append(
        "Donate_bank_name_account",
        this.dataMainCreateCampaign.dataDonate.Donate_bank_name_account
      );
      console.log("dataMainCreateCampaign", this.dataMainCreateCampaign);
      const campaignEndTime =
        new Date(
          this.dataMainCreateCampaign.dataCampaign.campaign_end_time
        ).getTime() / 1000;
      console.log("currentUserAddress", currentUserAddress);
      const createData = await contract.methods
        .createCampaign(
          this.dataMainCreateCampaign.dataCampaign.campaign_name,
          this.dataMainCreateCampaign.dataDonate.Donate_max_money,
          campaignEndTime
        )
        .send({ from: currentUserAddress, gas: 3000000 });

      const dataRef = await campaignService.createCampaign(formData);

      if (createData) {
        console.log("createData", createData);
      }

      if (dataRef.success) {
        this.currentComponent = "CampaignSucess";
      }
    },
    emitDataCampaign(event) {
      this.dataMainCreateCampaign.dataCampaign = event;
    },
    emitDataDonate(event) {
      this.dataMainCreateCampaign.dataDonate = event;
    },
    setDataOrganize(event) {
      this.dataMainCreateCampaign.organize = { ...event };
      this.currentComponent = "CampaignInforNew";
    },
    checkPassTimeline(component) {
      if (this.listPassCreate.includes(component)) {
        {
          return true;
        }
      } else {
        return false;
      }
    },
  },
  watch: {
    currentComponent(newVal) {
      this.listPassCreate = [];

      if (newVal == "CampaignInforOrganize") {
        this.listPassCreate = ["pass1"];
      } else if (newVal == "CampaignInforNew") {
        this.listPassCreate = ["pass1", "pass2"];
      } else if (newVal == "CampaignConfirm") {
        this.listPassCreate = ["pass1", "pass2", "pass3"];
      } else if (newVal == "CampaignSucess") {
        this.listPassCreate = ["pass1", "pass2", "pass3", "pass4"];
      }
    },
  },
};
</script>
