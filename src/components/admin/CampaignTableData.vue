<template>
  <div id="CampaignTableDataView">
    <div class="boxHeaderMain">
      <div class="boxDropdown">
        <!-- <select class="slDropdown">
          <option>choa thien</option>
          <option>Hello ban toi</option>
        </select> -->
      </div>

      <div class="boxFilter">
        <input
          type="text"
          class="searchFilterAuth"
          placeholder="Tìm theo tên, email, điện thoại"
          v-model="searchText"
          @input="onEmitSearchAccount"
        />

        <div class="boxSortFilter">
          <button class="btnSort" v-if="true">
            <fa :icon="['fas', 'arrow-up-short-wide']" class="ic_sort" />
            <p>Mới nhất</p>
          </button>

          <button class="btnSort" v-else>
            <fa :icon="['fas', 'arrow-down-short-wide']" class="ic_sort" />
            <p>Cũ nhất</p>
          </button>
        </div>
      </div>
    </div>

    <div class="boxTableCampaign">
      <div class="boxLoadingData" v-if="isPending">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="" v-else>
        <p class="text-center" v-if="!dataCampaignCurrent">
          Không có chiến dịch nào
        </p>

        <table class="table table_custom" v-else>
          <thead class="thead_custom">
            <tr class="tr_custom">
              <th scope="col">#</th>
              <th scope="col">Tên</th>
              <th scope="col">Ảnh</th>
              <th scope="col">Tổ chức</th>
              <th scope="col">Địa điểm</th>
              <th scope="col">Hình thức</th>
              <th scope="col">Thời gian</th>
              <th scope="col">Xử lý</th>
            </tr>
          </thead>

          <tbody class="tbody_custom">
            <template
              v-for="(item, index) in dataCampaignCurrent"
              :key="item._id"
            >
              <tr class="tr_custom" v-if="!isPending">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ item.campaign_name }}</td>
                <td>
                  <img
                    :src="convert_image(item.campaign_avatar)"
                    alt=""
                    class="imageAvatarAccount"
                  />
                </td>
                <td>{{ item.dataOrganization.CO_name }}</td>
                <td>{{ item.campaign_province }}</td>
                <td>
                  <p class="green" v-if="item.campaign_type == 'online'">
                    Online
                  </p>
                  <p class="red" v-else>Offline</p>
                </td>
                <td>
                  {{ formate_date(item.campaign_start_time, "dddd") }},
                  {{ formate_date(item.campaign_start_time, "DD-MM-YYYY") }}
                </td>
                <td>
                  <div class="boxHandleBtn">
                    <button
                      class="btnHandle green"
                      @click="emitIdCampaign(item._id)"
                    >
                      <fa :icon="['fas', 'eye']" class="ic_handle" />
                    </button>

                    <button
                      class="btnHandle blue"
                      v-if="!item.campaign_confirm"
                      @click="onHandleConfirm(index, item._id)"
                    >
                      <fa :icon="['fas', 'check']" class="ic_handle" />
                    </button>

                    <button
                      class="btnHandle orange"
                      v-if="!item.campaign_confirm"
                      @click="onEmitDeleteCampaign(item._id)"
                    >
                      <fa :icon="['fas', 'trash']" class="ic_handle" />
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from "@/utils/formateDate";
import ConvertImage from "@/utils/convertImage";
import { campaignService } from "@/services/campaignService";

export default {
  name: "CampaignTableData",
  props: ["dataCampaignCurrent", "isPending"],
  data() {
    return {
      listDataCampaign: [],
      searchText: "",
    };
  },
  methods: {
    async onHandleConfirm(index, id) {
      try {
        const dataRef = await campaignService.confirmCampaignById(id);

        if (dataRef.status) {
          this.listDataCampaign.splice(index, 1);
          this.$emit("removeCampaign", index);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    emitIdCampaign(id) {
      this.$emit("getIdCampaign", id);
    },
    onEmitDeleteCampaign(id) {
      this.$emit("emitDeleteCampaign", id);
    },
    onEmitSearchAccount() {},
    formate_date: formatDate.basicFormat,
    convert_image: ConvertImage,
  },
};
</script>

<style></style>
