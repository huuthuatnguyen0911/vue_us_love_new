import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);
const isPendingGetAnimal = ref(null);

const AnimalService = {
  async createAnimal(dataAnimal) {
    isPending.value = true;
    try {
      const dataRef = await axios.post(`/animal`, dataAnimal);

      return dataRef.data;
    } catch (error) {
      console.log("Error animal: " + error);
    } finally {
      isPending.value = false;
    }
  },

  async getAllAnimal(limit = 10) {
    try {
      const dataRef = await axios.get(`/animal?limit=${limit}`);

      return dataRef.data;
    } catch (error) {
      console.log("Error animal: " + error);
    }
  },

  async getOneAnimalBySlug(slug) {
    isPendingGetAnimal.value = true;
    try {
      const dataRef = await axios.get(`/animal/${slug}`);

      return dataRef.data;
    } catch (error) {
      console.log("Error animal: " + error);
    } finally {
      isPendingGetAnimal.value = false;
    }
  },
};

export { AnimalService, isPending, isPendingGetAnimal };
