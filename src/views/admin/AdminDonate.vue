<template>
  <AdminDefault1>
    <div id="boxAdminDonate">
      <!-- <p class="titlePage">Quản lý quyên góp</p> -->

      <div class="boxInnerContentMain">
        <p class="nameTable">Đợi giao dịch</p>

        <div class="boxLoadingData" v-if="isPendingDonateNotConfirm">
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>

        <table class="table table_custom" v-else>
          <thead class="thead_custom">
            <tr class="tr_custom">
              <th scope="col">#</th>
              <th scope="col">Tên</th>
              <th scope="col">Mã</th>
              <th scope="col">Số tiền</th>
              <th scope="col">Chiến dịch</th>
              <th scope="col">Hình thức</th>
              <th scope="col">Thời gian</th>
              <th scope="col">Xử lý</th>
            </tr>
          </thead>

          <tbody class="tbody_custom">
            <template
              v-for="(item, index) in dataDonateNotConfirm"
              :key="index"
            >
              <tr class="tr_custom">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  <p v-if="item.data_user">
                    {{ item.data_user.name }}
                  </p>
                  <p v-else>Nhà hảo tâm</p>
                </td>
                <td>{{ sub_string(item.data_donor.Donor_code, 10) }}</td>
                <td>{{ convert_money(item.data_donor.Donor_money) }}</td>
                <td>{{ item.data_campaign.campaign_name }}</td>
                <td>{{ item.data_donor.Donor_form }}</td>
                <td>
                  {{ format_date(item.data_donor.createdAt, "DD-MM-YYYY") }}
                </td>
                <td>
                  <div class="boxHandleBtn">
                    <button
                      class="btnHandle blue"
                      @click="onHandleConfirm(item._id)"
                    >
                      <fa :icon="['fas', 'check']" class="ic_handle" />
                    </button>

                    <button class="btnHandle orange">
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
  </AdminDefault1>

  <NotifiView ref="componentNotifi" />
</template>

<script>
import AdminDefault1 from "@/layouts/admin_default_1.vue";
import {
  donateService,
  isPendingDonateNotConfirm,
} from "@/services/donateService";
import convertMoney from "@/utils/convertMoney";
import formatDate from "@/utils/formateDate";
import SubString from "@/utils/sub_string";

export default {
  name: "AdminDonate",
  setup() {
    return { isPendingDonateNotConfirm };
  },
  components: { AdminDefault1 },
  data() {
    return {
      dataDonateNotConfirm: null,
      dataDonateConfirm: null,
    };
  },
  mounted() {
    this.initStart();
  },
  methods: {
    async initStart() {
      try {
        const dataMain = await donateService.getDonateNotConfirm();

        if (dataMain.status) {
          this.dataDonateNotConfirm = dataMain.data;
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    async onHandleConfirm(idDonate) {
      try {
        const dataMain = await donateService.adminConfirmDonate(idDonate);

        if (dataMain.status) {
          this.dataDonateNotConfirm.filter((donate, index) => {
            if (donate._id == idDonate) {
              this.dataDonateNotConfirm.splice(index, 1);
            }
          });
          this.$refs.componentNotifi.onCreateNotification({
            status: "success",
            message: "Đã xác nhận chuyển tiền",
            theme: "admin",
          });
        } else {
          this.$refs.componentNotifi.onCreateNotification({
            status: "destructive",
            message: "Xác nhận thất bại",
            theme: "admin",
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    convert_money: convertMoney,
    sub_string: SubString,
    format_date: formatDate.basicFormat,
  },
};
</script>

<style></style>
