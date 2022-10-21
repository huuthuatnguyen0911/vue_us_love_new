import axios from "axios";

const handleLanguage = {
  changeLanguage(language) {
    localStorage.setItem("locale", language);
    axios.defaults.headers.common["Language"] = localStorage.getItem("locale");
  },

  getLanguage() {
    return localStorage.getItem("locale") || "vi";
  },
};

export default handleLanguage;
