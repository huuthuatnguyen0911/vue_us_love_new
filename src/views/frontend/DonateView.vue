<template>
  <div id="DonateView">
    <div id="bg__overlay"></div>
    <div
      class="boxContentDonate"
      v-if="!isPendingCampaign && dataInforCampaign != null"
    >
      <div class="col-custom col-custom-left">
        <div class="boxImage">
          <div class="boxMainOverlay">
            <ul class="listTabBox">
              <li
                class="itemTab"
                :class="{ active: isShowTab == 'heart_letter' }"
                @click="isShowTab = 'heart_letter'"
              >
                Tâm thư
              </li>
              <li
                class="itemTab"
                :class="{ active: isShowTab == 'rules' }"
                @click="isShowTab = 'rules'"
              >
                Điều khoản
              </li>
            </ul>

            <div class="boxContentMain">
              <p class="content" v-if="isShowTab == 'heart_letter'">
                Thay mặt Ban tổ chức Chiến dịch và các admin của website, trân
                trọng cảm ơn những nghĩa cử cao đẹp của quý đơn vị, cá nhân, các
                nhà hảo tâm đã quyên góp. Kính chúc Quý vị và gia đình, có thật
                nhiều sức khoẻ, vững vàng, an toàn và thành công.
              </p>
            </div>
          </div>
          <img
            :src="convert_image(dataInforCampaign.campaign_avatar)"
            alt=""
            class="imgCampaign"
          />
        </div>
      </div>
      <div class="col-custom col-custom-right">
        <Transition enter-active-class="animate__animated animate__tada">
          <div class="boxSuccessDonae" v-if="isSuccessfully">
            <img
              src="@/assets/images/page/check_sucess.png"
              alt=""
              class="imageIconSucess"
            />
            <p class="text">Cảm ơn bạn đã quyên góp cho chiến dịch</p>
            <button class="btnBack" @click="$router.push({ name: 'home' })">
              Quay về
            </button>
          </div>
        </Transition>
        <Transition
          enter-active-class="animate__animated animate__lightSpeedInRight animate__faster"
        >
          <div class="boxContentInput" v-if="!isSuccessfully">
            <p class="titleText">
              Quyên góp cho
              <span class="nameCampaign">{{
                dataInforCampaign.campaign_name
              }}</span>
            </p>
            <div class="boxCheckCampaign">
              <p class="nameInput">Ẩn danh</p>
              <label for="checkCampaignId" class="boxToggle">
                <input
                  type="checkbox"
                  class="checkbox"
                  id="checkCampaignId"
                  v-model="isAnonymous"
                />
                <div class="knobs"></div>
                <div class="layer"></div>
              </label>
            </div>

            <form action="javascript:void(0)" class="formDonateMain">
              <div class="formGroup">
                <input
                  type="number"
                  class="inputText"
                  placeholder="Số tiền quyên góp"
                  v-model="money"
                />
              </div>
              <div class="formGroup row" v-if="!isAnonymous">
                <div class="col-md-6">
                  <input
                    type="text"
                    class="inputText"
                    placeholder="Tên nhà hảo tâm"
                    disabled
                    :value="$store.state.dataUserCurrent.name"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="text"
                    class="inputText"
                    placeholder="Email nhà hảo tâm"
                    disabled
                    :value="$store.state.dataUserCurrent.email"
                  />
                </div>
              </div>

              <div class="formGroup">
                <textarea
                  class="textMess"
                  placeholder="Lời nhắn yêu thương"
                  v-model="messenger"
                ></textarea>
              </div>
            </form>

            <div class="boxMainInforDonate">
              <div class="row">
                <div class="col-md-4">
                  <ul class="listInfDonate">
                    <li
                      class="itemDonate"
                      :class="{ active: isShowInfor == 'bank' }"
                      @click="onSelectInforDonate('bank')"
                    >
                      <p class="name">Ngân hàng</p>
                    </li>

                    <li
                      class="itemDonate"
                      :class="{ active: isShowInfor == 'momo' }"
                      @click="onSelectInforDonate('momo')"
                    >
                      <p class="name">Momo</p>
                    </li>
                  </ul>
                </div>
                <div class="col-md-8">
                  <div class="boxShowInforDonate">
                    <div class="boxText">
                      <p class="title_text">Nội dung chuyển khoản</p>
                      <p class="content_text">
                        {{ onEncode(dataInforCampaign._id) }}
                        <fa
                          :icon="['fas', 'clone']"
                          class="ic_coppy"
                          @click="onHandleCopy(onEncode(dataInforCampaign._id))"
                        />
                      </p>
                    </div>
                    <div class="boxText">
                      <p class="title_text">Tên</p>
                      <p class="content_text">
                        {{ currentInforDonate.name }}
                        <fa
                          :icon="['fas', 'clone']"
                          class="ic_coppy"
                          @click="onHandleCopy(currentInforDonate.name)"
                        />
                      </p>
                    </div>
                    <div class="boxText">
                      <p class="title_text">Tài khoản</p>
                      <p class="content_text">
                        {{ currentInforDonate.code }}
                        <fa
                          :icon="['fas', 'clone']"
                          class="ic_coppy"
                          @click="onHandleCopy(currentInforDonate.code)"
                        />
                      </p>
                    </div>
                    <div class="boxText">
                      <p class="title_text">Tên ngân hàng</p>
                      <p class="content_text">
                        {{ currentInforDonate.name_bank }}
                        <fa
                          :icon="['fas', 'clone']"
                          class="ic_coppy"
                          @click="onHandleCopy(currentInforDonate.name_bank)"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="boxBtnHandleSubmit">
              <button class="btnSuccessTransfers" @click="onHandleSubmit">
                Đã chuyển tiền
              </button>
              <p class="btnCancel" @click="$router.go(-1)">Hủy bỏ</p>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div class="boxLoading" v-else>
      <div class="lds-ripple dark">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>

  <NotifiView ref="componentNotifi" />
</template>

<script>
import { campaignService, isPendingCampaign } from "@/services/campaignService";
import ConvertImage from "@/utils/convertImage";
import convertMoney from "@/utils/convertMoney";
import md5 from "md5";
import { donateService } from "@/services/donateService";

export default {
  name: "DonateView",
  setup() {
    return { isPendingCampaign };
  },
  data() {
    return {
      dataInforCampaign: null,
      isShowInfor: "bank",
      currentInforDonate: null,
      isAnonymous: false,
      isShowTab: "heart_letter",
      endcode: null,
      messenger: "",
      isSuccessfully: false,
      money: 0,
      listInforDonate: [
        {
          id: 0,
          name: "NGUYEN THANH THIEN",
          code: "106871804962",
          name_bank: "Viettinbank",
          form: "bank",
        },
        {
          id: 0,
          name: "NGUYEN THANH THIEN",
          code: "0818133841",
          name_bank: "MoMo",
          form: "momo",
        },
      ],
    };
  },
  created() {
    this.intiDataMain();
    this.onSelectInforDonate("bank");
  },
  methods: {
    async intiDataMain() {
      try {
        const dataRef = await campaignService.getInforDonateCampaign(
          this.$route.query._id
        );

        if (dataRef.success) {
          this.dataInforCampaign = dataRef.data[0];
        }
      } catch (error) {
        console.log("Loi donate : " + error.messenger);
      }

      // check login
      if (this.$store.state.dataUserCurrent) {
        this.isAnonymous = false;
      } else {
        this.isAnonymous = true;
      }
    },

    onEncode(idCampaign) {
      let code = "";

      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();

      code += idCampaign;

      if (this.$store.state.dataUserCurrent) {
        code += this.$store.state.dataUserCurrent._id;
      } else {
        code += "000000000000000000000000";
      }

      code += dd;
      code += mm;
      code += yyyy;

      this.endcode = md5(code);
      return md5(code);
    },

    onHandleMoneyDonate(dataInforCampaign) {
      if (dataInforCampaign) {
        let temp = 0;
        dataInforCampaign.forEach((el) => {
          temp += el.Donor_money;
        });

        return temp;
      } else {
        return 0;
      }
    },

    onHandleCopy(value) {
      navigator.clipboard.writeText(value);
      this.$refs.componentNotifi.onCreateNotification({
        status: "success",
        message: "Đã coppy",
        theme: "",
      });
    },

    onSelectInforDonate(value) {
      if (value == "bank") {
        this.isShowInfor = "bank";
        this.currentInforDonate = this.listInforDonate[0];
      } else if (value == "momo") {
        this.isShowInfor = "momo";
        this.currentInforDonate = this.listInforDonate[1];
      }
    },

    async onHandleSubmit() {
      let dataNew = {};
      dataNew.idCampaignDonate = this.dataInforCampaign.dataDonate._id;
      dataNew.Donor_money = this.money;
      dataNew.Donor_messenger = this.messenger;
      dataNew.Donor_code = this.endcode;
      dataNew.Donor_form = this.isShowInfor;
      if (this.$store.state.dataUserCurrent) {
        if (!this.isAnonymous) {
          dataNew.Donor_sender = this.$store.state.dataUserCurrent._id;
        }
      }

      const dataRef = await donateService.createDonate(dataNew);

      if (dataRef.success) {
        this.isSuccessfully = true;
      }
    },

    convert_image: ConvertImage,
    convert_money: convertMoney,
  },
  watch: {},
};
</script>

<style></style>
