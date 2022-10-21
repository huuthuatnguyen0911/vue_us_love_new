import store from "../store";

const checkRole = {
  async isLogin({ next, router }) {
    const token = localStorage.getItem("loveUseToken");
    if (token && token !== "") {
      return next();
    } else {
      return router.push({ name: "login" });
    }
  },

  async isAdmin({ next, router }) {
    const userData = await store.dispatch("getDataUser");

    if (userData) {
      const roleUser = userData.role;
      if (roleUser == "admin") {
        return next();
      } else {
        return router.push({ name: "login" });
      }
    }
  },
  async isUser({ next, router }) {
    const userData = await store.dispatch("getDataUser");

    if (userData) {
      const roleUser = userData.role;
      if (roleUser == "user") {
        return next();
      } else {
        return router.push({ name: "login" });
      }
    }
  },
};

export default checkRole;
