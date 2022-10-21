<template>
  <Transition
    enter-active-class="animate__animated animate__zoomIn animate__faster"
    leave-active-class="animate__animated animate__zoomOut animate__faster"
  >
    <div id="CampaignShowQuick" v-if="isShowQuick" @click.self="closeQuickView">
      <div class="boxMainContent">
        <div class="boxContentCampaign">
          <p class="textTitle">Thông tin chiến dịch</p>
          <div class="row">
            <div class="col-md-7">
              <ul class="listInfor">
                <li class="itemInfor">
                  <p class="textLine">
                    Tên:
                    <span class="inforSpan">{{
                      dataQuickView.campaign_name
                    }}</span>
                  </p>
                </li>
                <li class="itemInfor">
                  <p class="textLine">
                    Người lập:
                    <span class="inforSpan">{{
                      dataQuickView.data_author.name
                    }}</span>
                  </p>
                </li>
                <li class="itemInfor">
                  <p class="textLine">
                    Email:
                    <span class="inforSpan">{{
                      dataQuickView.data_author.email
                    }}</span>
                  </p>
                </li>
                <li class="itemInfor">
                  <p class="textLine">
                    Số điện thoại:
                    <span class="inforSpan">{{
                      dataQuickView.data_author.phone
                    }}</span>
                  </p>
                </li>
                <li class="itemInfor">
                  <p class="textLine">
                    Hình thức:
                    <span class="inforSpan">{{
                      dataQuickView.campaign_type
                    }}</span>
                  </p>
                </li>
                <li class="itemInfor">
                  <p class="textLine">
                    Địa điểm:
                    <span class="inforSpan">{{
                      filter_province(dataQuickView.campaign_province)
                    }}</span>
                  </p>
                </li>
                <li class="itemInfor">
                  <p class="textLine">
                    Thời gian bắt đầu:
                    <span class="inforSpan">{{
                      formate_date(
                        dataQuickView.campaign_start_time,
                        "DD-MM-YYYY"
                      )
                    }}</span>
                  </p>
                </li>
                <li class="itemInfor">
                  <p class="textLine">
                    Thời gian kết thúc:
                    <span class="inforSpan">{{
                      formate_date(
                        dataQuickView.campaign_end_time,
                        "DD-MM-YYYY"
                      )
                    }}</span>
                  </p>
                </li>
              </ul>
            </div>
            <div class="col-md-5">
              <div class="boxMainImage">
                <img
                  :src="convert_image(dataQuickView.campaign_avatar)"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-50">
          <div class="col-md-6">
            <div class="boxContentOrganization">
              <p class="textTitle">Thông tin tổ chức</p>
              <ul class="listInfor">
                <li class="itemInfor">
                  <p class="textLine">
                    Tên:
                    <span class="inforSpan">{{
                      dataQuickView.data_organization.CO_name
                    }}</span>
                  </p>
                </li>
                <li class="itemInfor">
                  <p class="textLine">
                    Số điện thoại:
                    <span class="inforSpan">{{
                      dataQuickView.data_organization.CO_phone
                    }}</span>
                  </p>
                </li>
                <li class="itemInfor">
                  <p class="textLine">
                    Địa chỉ:
                    <span class="inforSpan">{{
                      dataQuickView.data_organization.CO_location
                    }}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-6">
            <div class="boxContentDonations">
              <p class="textTitle">Thông tin quyên góp</p>
              <ul class="listInfor" v-if="dataQuickView.data_donate">
                <li class="itemInfor">
                  <p class="textLine">
                    Tổng số tiền:
                    <span class="inforSpan">{{
                      convert_money(dataQuickView.data_donate.Donate_max_money)
                    }}</span>
                  </p>
                </li>
                <li class="itemInfor">
                  <p class="textLine">
                    Số ngày:
                    <span class="inforSpan"
                      >{{ dataQuickView.data_donate.Donate_date }} ngày</span
                    >
                  </p>
                </li>
              </ul>
              <p v-else>Chiến dịch chưa mở quyên góp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import ConvertImage from "@/utils/convertImage";
import FilterProvince from "@/utils/FilterProvince";
import formatDate from "@/utils/formateDate";
import convertMoney from "@/utils/convertMoney";

export default {
  name: "CampaignShowQuick",
  props: ["isShowQuick", "dataQuickView"],
  methods: {
    closeQuickView() {
      this.$emit("closeQuickView");
    },
    convert_image: ConvertImage,
    filter_province: FilterProvince,
    formate_date: formatDate.basicFormat,
    convert_money: convertMoney,
  },
};
</script>

<style></style>
