<template>
  <div
    id="boxMainCampaignDetail"
    v-if="!isPendingCampaign && dataCampaign != null"
  >
    <div id="bg__overlay"></div>
    <div class="container_1024 container_box">
      <div class="boxBack">
        <fa
          :icon="['fas', 'angle-left']"
          class="ic_back"
          @click="onHandleBack"
        />
        <p class="titlePage">Chiến dịch Us Love</p>
      </div>

      <div class="mainContentCampaign">
        <p class="nameCampaign">
          {{ dataCampaign.campaign_name }}
        </p>

        <div class="boxTime">
          <p class="time">
            {{ format_date(dataCampaign.createdAt, "DD-MM-YYYY") }}
          </p>

          <div class="boxBtnShare">
            <button class="btnShare" @click.self="isShowShare = !isShowShare">
              Chia sẻ
              <fa :icon="['fas', 'share']" class="ic_share" />
            </button>

            <Transition
              enter-active-class="animate__animated animate__fadeInDown animate__faster"
              leave-active-class="animate__animated animate__fadeOutDown animate__faster"
            >
              <ul class="dropdownShareList" v-show="isShowShare">
                <li class="itemShare" @click="onHandleCopy">
                  <fa :icon="['fas', 'link']" class="ic_item_share" />
                  <span class="nameItem">Sao chép liên kết</span>
                </li>
              </ul>
            </Transition>
          </div>
        </div>

        <div class="boxImgCampaign">
          <img
            :src="convert_image(dataCampaign.campaign_avatar)"
            alt=""
            class="image_campaign"
          />
        </div>

        <div class="row boxContentCustom">
          <div class="col-md-8">
            <ul class="boxListtabContent">
              <li
                class="itemTab"
                :class="{ active: currentTab == 'ItemTabDesc' }"
                @click="currentTab = 'ItemTabDesc'"
              >
                Mô tả
              </li>
              <li
                class="itemTab"
                :class="{ active: currentTab == 'ItemTableDonate' }"
                @click="currentTab = 'ItemTableDonate'"
                v-if="dataCampaign.dataDonate.Donate_bank_code"
              >
                Nhà hảo tâm
              </li>
              <li
                class="itemTab"
                :class="{ active: currentTab == 'ItemListImage' }"
                @click="currentTab = 'ItemListImage'"
              >
                Ảnh
              </li>
            </ul>

            <div class="boxShowMainContent">
              <keep-alive>
                <component
                  :is="currentTab"
                  :dataCampaign="dataCampaign"
                  :dataDonater="dataDonater"
                  :dataListImages="dataCampaign.campaign_list_image"
                />
              </keep-alive>
            </div>
          </div>
          <div class="col-md-4">
            <div class="boxInforRight">
              <p class="titleName">Tham gia chiến dịch</p>
              <div class="boxMember">
                <p>Thành viên</p>
                <p>
                  <span class="maxMember">{{
                    dataCampaign.dataInforMembers.length
                  }}</span>
                  /
                  {{
                    dataCampaign.dataMembers[0].CM_max_members == 0
                      ? "&infin;"
                      : dataCampaign.dataMembers[0].CM_max_members
                  }}
                </p>
              </div>

              <div class="boxListMember">
                <ul class="listMember">
                  <li
                    class="itemMember"
                    v-for="(item, index) in dataCampaign.dataInforMembers"
                    :key="index"
                  >
                    <div class="boxLeft">
                      <img
                        :src="convert_image(item.avatar)"
                        alt=""
                        class="avatar"
                      />
                      <p class="name">{{ item.name }}</p>
                    </div>

                    <div class="boxRight">
                      <!-- <p class="date">07/06/2002</p> -->
                    </div>
                  </li>
                </ul>
              </div>

              <button class="btnJoin" @click="onHandleJoinCampaign">
                Tham gia ngay
              </button>
            </div>

            <div class="boxInforRight">
              <p class="titleName">Thông tin quyên góp</p>
              <div v-if="dataCampaign.dataDonate.Donate_bank_code">
                <div class="boxMoney">
                  <span class="currentMoney">
                    {{
                      convert_money(
                        onHandleMoneyDonate(dataCampaign.dataInforDonor)
                      )
                    }}
                  </span>
                  quyên góp /
                  {{
                    dataCampaign.dataDonate.Donate_max_money == 0
                      ? "&infin;"
                      : convert_money(dataCampaign.dataDonate.Donate_max_money)
                  }}
                </div>
                <div class="boxInforCounter">
                  <div class="line">
                    <div
                      class="lineInner"
                      :style="{
                        width:
                          onHandlePercent(
                            onHandleMoneyDonate(dataCampaign.dataInforDonor),
                            dataCampaign.dataDonate.Donate_max_money
                          ) + '%',
                      }"
                    ></div>
                  </div>
                  <div class="row timeLineCounter">
                    <div class="col-md-4">
                      <div class="boxInnerContent">
                        <p class="titleText">Lượt</p>
                        <p class="counterText">
                          {{ dataCampaign.dataInforDonor.length }}
                        </p>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="boxInnerContent">
                        <p class="titleText">Đạt được</p>
                        <p class="counterText">
                          {{
                            onHandlePercent(
                              onHandleMoneyDonate(dataCampaign.dataInforDonor),
                              dataCampaign.dataDonate.Donate_max_money
                            ) + "%"
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="boxInnerContent">
                        <p class="titleText">Thời hạn</p>
                        <p class="counterText">
                          {{ dataCampaign.dataDonate.Donate_date }} ngày
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  class="btnDonate"
                  @click="
                    $router.push({
                      name: 'donate_campaign',
                      params: { slug_campaign: dataCampaign.slug },
                      query: { _id: dataCampaign._id },
                    })
                  "
                >
                  Quyên góp
                </button>
              </div>
              <p class="textMain text-center" v-else>
                Chiến dịch chưa nhận quyên góp
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="boxAnotherCampaign">
        <p class="titleText">Các chiến dịch theo vùng</p>
        <div class="row boxShowAnothorCampaign">
          <div class="col-md-4" v-for="item in listCampaigns" :key="item._id">
            <ItemAnotherCampaign :dataCampaign="item" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center" v-else>
    <div class="lds-ripple dark">
      <div></div>
      <div></div>
    </div>
  </div>

  <Transition
    enter-active-class="animate__animated animate__zoomIn"
    leave-active-class="animate__animated animate__zoomOut"
  >
    <div
      class="boxPopupPassWord"
      v-if="isShowPopup == 'check_pass'"
      @click.self="onClosePopup"
    >
      <div class="boxContentInner">
        <p class="title">Chiến dịch khóa</p>
        <p class="descText">
          Chiến dịch khóa là chiến dích đã cài đặt mật khẩu của chủ sở hữu, cần
          có mật khẩu để được tham gia.
        </p>

        <div class="btnSubmitPass">
          <input
            type="text"
            placeholder="Nhập mật khẩu"
            class="inputPassword"
            v-model="text_pass"
            @input="test_err = ''"
            @keypress.enter="onCheckPassword"
          />
          <button class="btnSubmit" @click="onCheckPassword">Kiểm tra</button>
        </div>

        <p class="textError" v-if="test_err">{{ test_err }}</p>
      </div>
    </div>
  </Transition>

  <Transition
    enter-active-class="animate__animated animate__zoomIn"
    leave-active-class="animate__animated animate__zoomOut"
  >
    <div
      class="boxPopupCommit"
      v-if="isShowPopup == 'commit_campaign'"
      @click.self="onClosePopup"
    >
      <div class="btnSubmitCommit">
        <div class="row">
          <div class="col-md-6">
            <img
              src="@/assets/images/page/handinhand.jpg"
              alt=""
              class="img_commit"
            />
          </div>
          <div class="col-md-6">
            <div class="boxContentInner">
              <p class="title_text">Bạn phải cam kết</p>
              <ul class="listConditions">
                <li class="itemCondition">
                  <fa :icon="['fas', 'circle']" class="ic_dot" />
                  <p class="name_text">
                    Tham gia chương trình đúng giờ vào thời gian
                  </p>
                </li>
                <li class="itemCondition">
                  <fa :icon="['fas', 'circle']" class="ic_dot" />
                  <p class="name_text">
                    Văn minh, nhiệt huyết trong quá trình tham gia
                  </p>
                </li>
              </ul>
              <p class="text_note">
                <span>NOTE: </span> Mọi trường hợp vi phạm đều bị xử lý nghiêm
                trọng.
              </p>

              <div class="text-center">
                <button class="btnJoin" @click="onJoinCampaign">
                  Tham gia chiến dịch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <NotifiView ref="componentNotifi" />
</template>

<script>
import formatDate from "@/utils/formateDate";
import ItemTabDesc from "@/components/frontend/campaign/ItemTabDesc.vue";
import ItemTableDonate from "@/components/frontend/campaign/ItemTableDonate.vue";
import ItemListImage from "@/components/frontend/campaign/ItemListImage.vue";
import { isPendingCampaign, campaignService } from "@/services/campaignService";
import ItemAnotherCampaign from "@/components/frontend/campaign/ItemAnotherCampaign.vue";
import ConvertImage from "@/utils/convertImage";
import convertMoney from "@/utils/convertMoney";
import md5 from "md5";

export default {
  name: "CampaignDetail",
  setup() {
    return { isPendingCampaign };
  },
  components: {
    ItemTabDesc,
    ItemTableDonate,
    ItemListImage,
    ItemAnotherCampaign,
  },
  data() {
    return {
      currentTab: "ItemTabDesc",
      isShowShare: false,
      listCampaigns: null,
      dataCampaign: null,
      dataDonater: null,
      isShowPopup: "",
      text_pass: "",
      test_err: "",
    };
  },
  mounted() {
    this.baseMethod();
  },
  created() {
    this.initDataCampaign();
  },
  methods: {
    async initDataCampaign() {
      const dataRef = await campaignService.getDetailCampaign(
        this.$route.params.id_campaign,
        this.$route.params.province_campaign
      );

      if (dataRef.success) {
        this.dataCampaign = dataRef.data.dataCampaign[0];
        this.listCampaigns = dataRef.data.listCampaigns.filter((campaign) => {
          if (campaign._id !== this.dataCampaign._id) {
            return campaign;
          }
        });
        this.dataDonater = this.dataCampaign.dataInforDonor.map((data) => {
          const inforUser = this.dataCampaign.dataInforSenderDonor.find(
            (el) => {
              return el._id == data.Donor_sender;
            }
          );
          return {
            ...data,
            user: inforUser,
          };
        });
      }
    },
    onHandleMoneyDonate(dataDonate) {
      if (dataDonate) {
        let temp = 0;
        dataDonate.forEach((el) => {
          temp += el.Donor_money;
        });

        return temp;
      } else {
        return 0;
      }
    },
    onHandlePercent(totalMoney, maxMoney) {
      const percent = totalMoney / maxMoney;
      if (percent > 1) {
        return 100;
      } else {
        return Number.parseFloat(totalMoney / maxMoney).toFixed(4) * 100;
      }
    },
    onDetailCampaign(slug, province, id) {
      this.$router.push({
        name: "detail_campaign",
        params: {
          province_campaign: province,
          id_campaign: id,
          slug_campaign: slug,
        },
      });
    },
    onHandleJoinCampaign() {
      if (this.dataCampaign.campaign_password) {
        this.isShowPopup = "check_pass";
      } else {
        this.isShowPopup = "commit_campaign";
      }
    },
    onHandleCopy() {
      navigator.clipboard.writeText(window.location.href);
    },
    async onJoinCampaign() {
      const idUser = this.$store.state.dataUserCurrent._id;
      const dataRef = await campaignService.joinCampaign(
        this.dataCampaign._id,
        idUser
      );
      if (dataRef.success) {
        this.onClosePopup();
        this.$refs.componentNotifi.onCreateNotification({
          status: "success",
          message: "Cảm ơn bạn. Chờ chỉ SH xác minh",
          theme: "",
        });
      } else {
        this.$refs.componentNotifi.onCreateNotification({
          status: "destructive",
          message: "Lỗi tham gia chiến dịch",
          theme: "",
        });
      }
    },
    onCheckPassword() {
      const pass = md5(this.text_pass);
      if (pass == this.dataCampaign.campaign_password) {
        this.isShowPopup = "";
        setTimeout(() => {
          this.isShowPopup = "commit_campaign";
        }, 1000);
        console.log("Mat khau dung");
      } else {
        this.test_err = "Mật khẩu không đúng";
      }
    },
    onHandleBack() {
      this.$router.push({ name: "events" });
    },
    format_date: formatDate.basicFormat,
    baseMethod() {
      // Event close menu share
      document.body.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          this.isShowShare = false;
        },
        true
      );
    },
    onClosePopup() {
      this.isShowPopup = "";
      this.text_pass = "";
    },
    convert_image: ConvertImage,
    convert_money: convertMoney,
  },
  watch: {
    $route(newVal) {
      if (
        newVal.params &&
        newVal.params.id_campaign &&
        newVal.params.slug_campaign
      ) {
        this.initDataCampaign();
      }
    },
  },
};
</script>

<style></style>
