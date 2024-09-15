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

  async getExchangeRate() {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=vnd"
      );
      return res.data.binancecoin.vnd;
    } catch (error) {
      console.error("Error getting exchange rate:", error);
      return null;
    }
  },

  // get data campain from smart contract
  async getCampaignData(id_campaign) {
    try {
      const data = await contract.methods.campaigns(id_campaign).call();
      return data;
    } catch (error) {
      console.error("Error getting campaign data:", error);
      return null;
    }
  },
};

export { donateService, isPendingDonateNotConfirm };
