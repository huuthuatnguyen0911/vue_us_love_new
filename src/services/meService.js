import axios from "axios";
import { ref } from "vue";

const isPendingInforMe = ref(null);
const isPendingPass = ref(null);

const meService = {
  async updateAvatar(idUser, formDataImage) {
    try {
      const res = await axios.put(
        `/me/update-avatar/${idUser}`,
        formDataImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (err) {
      console.log("Error register: " + err);
    }
  },

  async updateMyInfor(idUser, formInfor) {
    isPendingInforMe.value = true;

    try {
      const res = await axios.put(`/me/update-infor/${idUser}`, formInfor);

      return res.data;
    } catch (err) {
      console.log("Error register: " + err);
    } finally {
      isPendingInforMe.value = false;
    }
  },

  async updatePassword(idUser, formPassword) {
    isPendingPass.value = true;

    try {
      const res = await axios.put(
        `/me/update-password/${idUser}`,
        formPassword
      );

      return res.data;
    } catch (err) {
      console.log("Error register: " + err);
    } finally {
      isPendingPass.value = false;
    }
  },
};

export { meService, isPendingInforMe, isPendingPass };
