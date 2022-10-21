<style></style>

<template>
  <div class="MeAuthenAccount" v-if="statusSend == 'unsent'">
    <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <keep-alive>
        <component
          :is="currentComponent"
          @imageSelfie="onImageSelfie($event)"
          @imagePreCard="onImagePreCard($event)"
          @imageAfterCard="onImageAfterCard($event)"
        />
      </keep-alive>
    </Transition>

    <ul class="listNavigation">
      <li
        class="itemNavi back"
        :class="{ hiden: currentComponent == 'MeAuthenFace' }"
        @click="onBackAuthen"
      >
        Quay lại
      </li>
      <li
        class="itemNavi continue"
        :class="{
          disabled: dataAuthenAccount.imageSelfie == null,
        }"
        @click="onNextAuthen"
      >
        {{ nameButton }}
      </li>
    </ul>
  </div>

  <div class="boxSuccesSendInfor" v-if="statusSend == 'sent_confirmation'">
    <div class="boxInnerSucess">
      <img
        src="@/assets/images/page/check_sucess.png"
        alt=""
        class="imageIconSucess"
      />
      <p class="textTitle">Gửi thông tin thành công.</p>
    </div>
  </div>

  <div class="boxSuccesSendInfor" v-if="statusSend == 'verified'">
    <div class="boxInnerSucess">
      <img
        src="@/assets/images/page/check_sucess.png"
        alt=""
        class="imageIconSucess"
      />
      <p class="textTitle">Tài khoản của bạn đã được xác minh</p>
      <p class="description">
        Bây giờ bạn đã có thể thao tác chức năng giới hạn.
      </p>
    </div>
  </div>

  <div class="boxUnverifiedAccount" v-if="statusSend == 'unverifiedAccount'">
    <div class="boxInner">
      <p class="title">Đang chờ xác minh</p>
      <p class="text">
        Cảm ơn bạn gửi thông tin. Chúng tôi sẽ phản hồi bạn sớm nhất
      </p>
    </div>
  </div>

  <NotifiView ref="componentNotifi" />
</template>

<script>
import MeAuthenFace from "@/components/frontend/me/MeAuthenFace.vue";
import MeAuthenIndentityCard from "@/components/frontend/me/MeAuthenIndentityCard.vue";
import { authAccountService } from "@/services/authAccountService";

export default {
  name: "MeAuthenAccount",
  components: { MeAuthenFace, MeAuthenIndentityCard },
  data() {
    return {
      currentComponent: "MeAuthenFace",
      nameButton: "Tiếp theo",
      statusSend: "",
      // unsent
      // verified
      // sent confirmation
      // unverifiedAccount
      dataAuthenAccount: {
        imageSelfie: null,
        list_card: [],
      },
    };
  },
  created() {
    this.initChecAuthAccount();
  },
  methods: {
    onImageSelfie(event) {
      this.dataAuthenAccount.imageSelfie = event;
    },
    onImagePreCard(event) {
      this.dataAuthenAccount.list_card[0] = event;
    },
    onImageAfterCard(event) {
      this.dataAuthenAccount.list_card[1] = event;
    },
    onBackAuthen() {
      if (this.currentComponent != "MeAuthenFace") {
        this.currentComponent = "MeAuthenFace";
      }
    },
    async onNextAuthen() {
      if (
        this.dataAuthenAccount.imageSelfie &&
        this.currentComponent == "MeAuthenFace"
      ) {
        this.currentComponent = "MeAuthenIndentityCard";
      } else if (
        this.currentComponent == "MeAuthenIndentityCard" &&
        this.dataAuthenAccount.list_card.length == 2
      ) {
        const formData = new FormData();

        formData.append(
          "listImageAuthenAccount[]",
          this.dataAuthenAccount.imageSelfie
        );
        formData.append(
          "listImageAuthenAccount[]",
          this.dataAuthenAccount.list_card[0]
        );
        formData.append(
          "listImageAuthenAccount[]",
          this.dataAuthenAccount.list_card[1]
        );

        const dataRef = await authAccountService.sendInforAuthen(
          this.$store.state.dataUserCurrent._id,
          formData
        );

        if (dataRef) {
          this.$refs.componentNotifi.onCreateNotification({
            status: "success",
            message: "Gửi thông tin xác thực thành công",
            theme: "",
          });
          this.statusSend = "sent_confirmation";
        } else if (dataRef.code == "authen_exist") {
          this.$refs.componentNotifi.onCreateNotification({
            status: "warning",
            message: "Bạn đã gửi thông tin xác thực",
            theme: "",
          });
        } else {
          this.$refs.componentNotifi.onCreateNotification({
            status: "destructive",
            message: "Gửi thông tin xác thực không thành công",
            theme: "",
          });
        }
      }
    },
    async initChecAuthAccount() {
      const checkRef = await authAccountService.checkStatusAuthAccount();

      if (checkRef.success) {
        this.statusSend = "verified";
      } else if (!checkRef.success && checkRef.code == "unverified_account") {
        this.statusSend = "unverifiedAccount";
      } else if (!checkRef.success && checkRef.code == "not_register_auth") {
        this.statusSend = "unsent";
      }
    },
  },

  watch: {
    currentComponent(newVal) {
      if (newVal == "MeAuthenIndentityCard") {
        this.nameButton = "Gửi thông tin";
      } else if (newVal == "MeAuthenFace") {
        this.nameButton = "Tiếp theo";
      }
    },
  },
};
</script>
