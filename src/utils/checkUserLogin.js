import store from "@/store";

const checkUserLogin = () => {
  if (
    store.state.dataUserCurrent == null ||
    !localStorage.getItem("loveUseToken")
  ) {
    return false;
  } else {
    return true;
  }
};

export default checkUserLogin;
