<style></style>

<template>
  <div class="CreateConditionCampaignView">
    <div id="bg__overlay"></div>

    <div class="boxMainFormCampaignn">
      <div class="CampaignCondition">
        <div class="row align-items-center">
          <div class="col-md-5">
            <div class="boxImage">
              <img
                src="@/assets/images/page/rule_campaign.png"
                alt=""
                class="image"
              />
            </div>
          </div>

          <div class="col-md-7">
            <div class="boxContent">
              <p class="title">Điều kiện tạo chiến dịch:</p>

              <ul class="listRule">
                <li class="itemRule">
                  <fa :icon="['fas', 'check']" class="ic_check_rule" />
                  <span class="text">Tài khoản của bạn đã được xác minh.</span>
                </li>
                <li class="itemRule">
                  <fa :icon="['fas', 'check']" class="ic_check_rule" />
                  <span class="text"
                    >Điểm hoạt động của bạn phải lớn hơn 90 điểm.</span
                  >
                </li>
                <li class="itemRule">
                  <fa :icon="['fas', 'check']" class="ic_check_rule" />
                  <span class="text"
                    >Bạn là đại diện của một tổ chức từ thiện.</span
                  >
                </li>
                <li class="itemRule">
                  <fa :icon="['fas', 'check']" class="ic_check_rule" />
                  <span class="text">Tổ chức phải hoạt động trên 3 tháng.</span>
                </li>
                <li class="itemRule">
                  <fa :icon="['fas', 'check']" class="ic_check_rule" />
                  <span class="text"
                    >Cung cấp đầy đủ các liên kết của tổ chức.</span
                  >
                </li>
              </ul>

              <div class="boxButton">
                <button class="backButton" @click="$router.go(-1)">
                  Quay lại
                </button>
                <button class="backContinue" @click="onGotoCreateCampaign">
                  Khởi tạo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <NotifiView ref="componentNotifi" />
</template>

<script>
import { authAccountService } from "@/services/authAccountService";

export default {
  name: "CampaignCondition",
  methods: {
    async onGotoCreateCampaign() {
      const checkRef = await authAccountService.checkStatusAuthAccount();

      if (checkRef.success) {
        this.$router.push({ name: "create_campaign" });
      } else if (!checkRef.success && checkRef.code == "unverified_account") {
        this.$refs.componentNotifi.onCreateNotification({
          status: "warning",
          message: "Tài khoản của bạn đang đợi xác minh",
          theme: "",
        });
      } else if (!checkRef.success && checkRef.code == "not_register_auth") {
        this.$refs.componentNotifi.onCreateNotification({
          status: "warning",
          message: "Bạn hãy xác minh tài khoản",
          theme: "",
        });
      }
    },
  },
};
</script>
