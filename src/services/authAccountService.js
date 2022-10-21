import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);
const isPendingCheckAuth = ref(null);
const isPendingConfirm = ref(null);

const authAccountService = {
  async sendInforAuthen(idUser, formImage) {
    isPending.value = true;
    try {
      const dataRef = await axios.post(
        `/authen-account/send-infor-auth/${idUser}`,
        formImage
      );

      return dataRef.data;
    } catch (err) {
      console.log("Error Blog: " + err);
    } finally {
      isPending.value = false;
    }
  },

  async checkStatusAuthAccount() {
    isPendingCheckAuth.value = true;
    try {
      const dataRef = await axios.get("/authen-account/check-authen-account");

      return dataRef.data;
    } catch (err) {
      console.log("Error Blog: " + err);
    } finally {
      isPendingCheckAuth.value = false;
    }
  },

  async getAllAuthAccount(status) {
    isPending.value = true;

    try {
      const dataRef = await axios.get(
        `/authen-account/get-all-account?status=${status}`
      );

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    } finally {
      isPending.value = false;
    }
  },

  async searhcAccountConditions(conditions) {
    isPending.value = true;

    try {
      const dataRef = await axios.get(
        `/authen-account/search-account?${conditions}`
      );

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    } finally {
      isPending.value = false;
    }
  },

  async confirmAuthAccount(idUser, status) {
    isPendingConfirm.value = true;
    try {
      const dataRef = await axios.post(
        `/authen-account/confirm-account/${idUser}?status=${status}`
      );

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    } finally {
      isPendingConfirm.value = false;
    }
  },
};

export { authAccountService, isPending, isPendingConfirm };
