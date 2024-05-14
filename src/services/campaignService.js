import axios from "axios";
import { ref } from "vue";
import crowdFundingAbi from "../contracts/CrowdFunding.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

const contract = new web3.eth.Contract(
  crowdFundingAbi.abi,
  process.env.VUE_APP_CROWD_FUNDING_ADDRESS
);
let accounts;
let currentUserAddress;

(async function () {
  accounts = await web3.eth.getAccounts();
  currentUserAddress = accounts[0];
})();

const isPendingCampaign = ref(null);

const campaignService = {
  async createCampaign(formCampaign) {
    isPendingCampaign.value = true;
    try {
      const dataRef = await axios.post("/campaign/create", formCampaign, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    } finally {
      isPendingCampaign.value = false;
    }
  },

  async getDetailCampaign(idCampaign, province) {
    isPendingCampaign.value = true;
    try {
      const dataRef = await axios.get(
        `/campaign/get-campaign/${idCampaign}/${province}`
      );

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    } finally {
      isPendingCampaign.value = false;
    }
  },

  async getOneCampaign(idCampaign) {
    try {
      const dataRef = await axios.get(`/campaign/get-one/${idCampaign}`);

      return dataRef.data;
    } catch (error) {
      console.log(error);
    }
  },

  async joinCampaign(idCampaign, idUser) {
    try {
      const dataRef = await axios.post(
        `/campaign/join-campaign/${idCampaign}/${idUser}`
      );

      return dataRef.data;
    } catch (error) {
      console.log("Error : " + error);
    }
  },

  async getInforDonateCampaign(idCampaign) {
    isPendingCampaign.value = true;
    try {
      const dataRef = await axios.get(`/campaign/donate/${idCampaign}`);

      return dataRef.data;
    } catch (error) {
      console.log("Error campaign: " + error);
    } finally {
      isPendingCampaign.value = false;
    }
  },

  async getCampaignByStatusConfirm(status) {
    isPendingCampaign.value = true;
    try {
      const dataRef = await axios.get(`/campaign/manager?status=${status}`);

      return dataRef.data;
    } catch (error) {
      console.log("Error campaign: " + error);
    } finally {
      isPendingCampaign.value = false;
    }
  },

  async confirmCampaignById(idCampaign) {
    try {
      const dataRef = await axios.get(`/campaign/confirm/${idCampaign}`);

      return dataRef.data;
    } catch (error) {
      console.log("Error campaign: " + error);
    }
  },

  async deleteCampaignById(idCampaign) {
    try {
      const dataRef = await axios.delete(`/campaign/delete/${idCampaign}`);

      return dataRef.data;
    } catch (error) {
      console.log("Error campaign: " + error);
    }
  },

  async getBankNameByBankCode(bankCode) {
    try {
      const dataRef = await axios.get(
        `/campaign/get-bank-by-bankcode/${bankCode}`
      );

      return dataRef.data;
    } catch (error) {
      console.log("Error campaign: " + error);
    }
  },
};

export { campaignService, isPendingCampaign, contract, currentUserAddress };
