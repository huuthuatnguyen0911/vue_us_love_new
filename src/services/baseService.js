import axios from "axios";

const baseService = {
  async getListLocation() {
    try {
      const dataRef = await axios.get("/base/location-viet-nam");

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    }
  },

  async getListbank() {
    try {
      const dataRef = await axios.get("/base/bank-viet-nam");

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    }
  },
};

export { baseService };
