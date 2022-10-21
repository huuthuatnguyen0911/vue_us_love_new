const handleBegin = {
  getBegin() {
    return localStorage.getItem("startBegin");
  },
  setBegin(status) {
    localStorage.setItem("startBegin", status);
  },
};

export default handleBegin;
