import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);

const authService = {
  // set token in header
  initAuthHeader() {
    const token = localStorage.getItem("loveUseToken");
    if (token && token !== "") {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },

  // reset token
  resetAuthHeader() {
    localStorage.setItem("loveUseToken", "");
    this.initAuthHeader();
  },

  //   register account
  async registerAccount(formData) {
    isPending.value = true;

    try {
      const res = await axios.post("/register", formData);

      return res.data;
    } catch (err) {
      console.log("Error register: " + err);
    } finally {
      isPending.value = false;
    }
  },

  // LOGIN ACCOUNT
  async loginAccount(formData) {
    isPending.value = true;
    try {
      const res = await axios.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      return res.data;
    } catch (err) {
      console.log("Error Login: " + err);
    } finally {
      isPending.value = false;
    }
  },

  // LOGOUT
  logoutAccount() {
    localStorage.removeItem("loveUseToken");
  },

  // me
  async getMe() {
    try {
      const res = await axios.get("me");
      return res.data;
    } catch (error) {
      console.log("Error getMe: " + error);
      return {
        success: false,
        code: "not_get_me",
      };
    }
  },
};

export { authService, isPending };
