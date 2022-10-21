<template>
  <div class="ItemAnotherCampaign">
    <div class="boxImage">
      <img
        :src="convert_image(dataCampaign.campaign_avatar)"
        alt=""
        class="imgCampaign"
      />
      <div class="boxQuickView">
        <fa :icon="['fas', 'eye']" class="ic_eye" />
      </div>
    </div>

    <div class="boxContentMain">
      <div class="boxMainContent">
        <p
          class="titleCampaign"
          @click="
            onDetailCampaign(
              dataCampaign.slug,
              dataCampaign.campaign_province,
              dataCampaign._id
            )
          "
        >
          {{ sub_string(dataCampaign.campaign_name, 60) }}
        </p>
        <p class="descCampaign">
          {{ sub_string(dataCampaign.campaign_description, 55) }}
        </p>
        <div class="boxOrganizeShow">
          <div class="boxLeft">
            <img
              :src="convert_image(dataCampaign.dataOrganization[0].CO_avatar)"
              alt=""
              class="avatar"
            />
            <p class="name">
              {{ sub_string(dataCampaign.dataOrganization[0].CO_name, 60) }}
            </p>
          </div>
          <div class="boxRight">
            <p class="time">
              {{ convert_to_week(dataCampaign.campaign_start_time) }}
            </p>
          </div>
        </div>

        <div class="boxShowMember">
          <p class="name">Thành viên</p>
          <p class="counter">
            <span class="counterCurrent">{{
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

        <div
          class="boxMainTimeline"
          v-if="dataCampaign.dataDonate.Donate_bank_code"
        >
          <p class="money">
            <span class="currentMonney">{{
              convert_money(onHandleMoneyDonate(dataCampaign.dataInforDonor))
            }}</span>
            /
            {{
              dataCampaign.dataDonate.Donate_max_money == 0
                ? "&infin;"
                : convert_money(dataCampaign.dataDonate.Donate_max_money)
            }}
          </p>

          <div class="lineShow">
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

          <div class="row rowCounterCustom align-items-center">
            <div class="col-md-4">
              <div class="boxContentInner">
                <p class="nameCounterText">Lượt</p>
                <p class="numberText">
                  {{ dataCampaign.dataInforDonor.length }}
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="boxContentInner">
                <p class="nameCounterText">Đạt được</p>
                <p class="numberText">
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
              <button class="btnDonate">Quyên góp</button>
            </div>
          </div>
        </div>

        <div class="boxMainDonateMoney" v-else>
          <p class="textMain">Chiến dịch chưa nhận quyên góp</p>
        </div>
      </div>

      <!-- <div class="btnHandleCampaign">
        <button>Xem chi tiết</button>
        <button>Tham gia</button>
      </div> -->
    </div>
  </div>
</template>

<script>
import ConvertImage from "@/utils/convertImage";
import SubString from "@/utils/sub_string";
import formatDate from "@/utils/formateDate";
import convertMoney from "@/utils/convertMoney";

export default {
  name: "ItemAnotherCampaign",
  props: ["dataCampaign"],
  data() {
    return {};
  },
  methods: {
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
    sub_string: SubString,
    convert_image: ConvertImage,
    convert_to_week: formatDate.convertToWeek,
    convert_money: convertMoney,
  },
};
</script>

<style></style>
