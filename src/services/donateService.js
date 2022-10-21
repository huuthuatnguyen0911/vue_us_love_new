import axios from "axios";
import { ref } from "vue";

const isPendingDonateNotConfirm = ref(null);

const donateService = {
  async getDonateNotConfirm() {
    isPendingDonateNotConfirm.value = true;
    try {
      const dataRef = await axios.get("/donate/donate-not-confirm");

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isPendingDonateNotConfirm.value = false;
    }
  },

  async adminConfirmDonate(idDonate) {
    try {
      const dataRef = await axios.post(`/donate/admin-confirm/${idDonate}`);

      return dataRef.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async createDonate(formData) {
    try {
      const dataRef = await axios.post("/donate/create", formData, {
        header: { "Content-Type": "multipart/form-data" },
      });

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    }
  },
};

export { donateService, isPendingDonateNotConfirm };
