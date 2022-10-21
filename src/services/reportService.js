import axios from "axios";
import { ref } from "vue";

const isPending = ref(false);

const reportService = {
  async sendReport(formData) {
    isPending.value = true;
    try {
      const res = await axios.post("report/send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (e) {
      console.log("Error send data report: " + e);
    } finally {
      isPending.value = false;
    }
  },
};

export { reportService, isPending };
