import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);

const initPageService = {
  async initHomePage() {
    isPending.value = true;
    try {
      const dataRef = await axios.get("/base/home-page/index");

      return dataRef.data;
    } catch (err) {
      console.log("Error Blog: " + err);
    } finally {
      isPending.value = false;
    }
  },

  async initEventPage() {
    isPending.value = true;
    try {
      const dataRef = await axios.get("/base/event-page/index");

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    } finally {
      isPending.value = false;
    }
  },
};

export { initPageService, isPending };
