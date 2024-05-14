import crowdFundingAbi from "../contracts/CrowdFunding.json";
import web3 from "./web3";

const contract = new web3.eth.Contract(
  crowdFundingAbi,
  process.env.VUE_APP_CROWD_FUNDING_ADDRESS
);

function donate() {
  console.log("contract", contract);
}

export { donate };
