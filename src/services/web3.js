import Web3 from "web3";

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.enable();
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  console.log(
    "Non-Ethereum browser detected. You should consider trying MetaMask!"
  );
}

export async function loginMetamask() {
  if (window.ethereum) {
    try {
      // Request account access
      await window.ethereum.enable();
      return true;
    } catch (error) {
      alert("Vui lòng đăng nhập vào ví của bạn...");
      return false;
    }
  } else if (window.web3) {
    // User is logged in to MetaMask
    return true;
  } else {
    alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
    return false;
  }
}

export default web3;
