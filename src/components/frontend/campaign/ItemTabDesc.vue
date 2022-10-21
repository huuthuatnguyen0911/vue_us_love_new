<template>
  <div id="ItemTabDesc">
    <div class="boxDescription">
      <p class="textDesc">{{ dataCampaign.campaign_description }}</p>
    </div>

    <div class="boxContact">
      <p class="titleText">Thông tin chủ chiến dịch</p>

      <ul class="listInfor">
        <li class="itemInfor">
          <p class="name">Ảnh:</p>
          <img
            :src="convert_image(dataCampaign.dataOwnerCampaign[0].avatar)"
            alt=""
            class="imgAvatar"
          />
        </li>
        <li class="itemInfor">
          <p class="name">Tên:</p>
          <p class="text">{{ dataCampaign.dataOwnerCampaign[0].name }}</p>
        </li>
        <li class="itemInfor">
          <p class="name">Số điện thoại:</p>
          <p class="text">{{ dataCampaign.dataOwnerCampaign[0].phone }}</p>
        </li>
        <li class="itemInfor">
          <p class="name">Email:</p>
          <p class="text">{{ dataCampaign.dataOwnerCampaign[0].email }}</p>
        </li>
        <li class="itemInfor">
          <p class="name">Điểm hoạt động:</p>
          <p class="text">
            {{ dataCampaign.dataOwnerCampaign[0].activity_point }}
          </p>
        </li>
      </ul>
    </div>

    <div class="boxOrganization">
      <p class="titleText">Thông tin tổ chức</p>

      <ul class="listInfor">
        <li class="itemInfor">
          <p class="name">Ảnh:</p>
          <img
            :src="convert_image(dataCampaign.dataOrganization[0].CO_avatar)"
            alt=""
            class="imgAvatar"
          />
        </li>
        <li class="itemInfor">
          <p class="name">Tổ chức:</p>
          <p class="text">{{ dataCampaign.dataOrganization[0].CO_name }}</p>
        </li>
        <li class="itemInfor">
          <p class="name">Liên kết:</p>
          <a :href="dataCampaign.dataOrganization[0].CO_link" class="text"
            >Bấm vào đây</a
          >
        </li>
        <li class="itemInfor">
          <p class="name">Số điện thoại:</p>
          <p class="text">{{ dataCampaign.dataOrganization[0].CO_phone }}</p>
        </li>
        <li class="itemInfor">
          <p class="name">Địa chỉ:</p>
          <p class="text">{{ dataCampaign.dataOrganization[0].CO_location }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ConvertImage from "@/utils/convertImage";

export default {
  name: "ItemTabDesc",
  props: ["dataCampaign"],
  methods: {
    convert_image: ConvertImage,
  },
};
</script>

<style></style>
