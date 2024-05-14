import axios from "axios";
import { ref } from "vue";
import crowdFundingAbi from "../contracts/CrowdFunding.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

const contract = new web3.eth.Contract(
  crowdFundingAbi.abi,
  process.env.VUE_APP_CROWD_FUNDING_ADDRESS
);

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
      const accounts = await web3.eth.getAccounts();
      const currentUserAddress = accounts[0];
      console.log("currentUserAddress", currentUserAddress);
      console.log(contract);
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
