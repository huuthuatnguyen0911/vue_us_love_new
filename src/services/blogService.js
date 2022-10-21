import axios from "axios";
import { ref } from "vue";

const isPending = ref(null);
const isPendingIndex = ref(null);

const blogService = {
  async getBlogsIndex() {
    isPendingIndex.value = true;
    try {
      const dataRef = await axios.get("/blog/get-blog-main/index");

      return dataRef.data;
    } catch (err) {
      console.log("Error Blog: " + err);
    } finally {
      isPendingIndex.value = false;
    }
  },

  // [create blog] /blog/create
  async createBlog(dataBlog) {
    isPending.value = true;
    try {
      const dataRef = await axios.post("/blog/create", dataBlog);

      return dataRef.data;
    } catch (err) {
      console.log("Error Blog: " + err);
    } finally {
      isPending.value = false;
    }
  },

  // [GET BLOG ADMIN WITH ID] /blog/me/:idUser/draft
  async getBlogMeById(idUser) {
    try {
      const dataRef = await axios.get(`/blog/me/${idUser}/draft`);

      return dataRef.data;
    } catch (err) {
      console.log("Error Blog: " + err);
    }
  },

  // [GET BLOG PUBLIC ADMIN WITH ID] /blog/me/:idUser/public
  async getBlogPublicMeById(idUser) {
    try {
      const dataRef = await axios.get(`/blog/me/${idUser}/public`);

      return dataRef.data;
    } catch (err) {
      console.log("Error Blog: " + err);
    }
  },

  // [DELETE BLOG] /blog/me/:idBLog/delete
  async deleteBlogById(idBlog) {
    try {
      const dataRef = await axios.delete(`/blog/me/${idBlog}/delete`);

      return dataRef.data;
    } catch (error) {
      console.log("Error delete Blog: " + error);
    }
  },

  // [GET COUNT] /blog/me/:idBLog/count
  async countDocumentsDeletedWithID(idUser) {
    try {
      const dataRef = await axios.get(`/blog/me/${idUser}/count`);

      return dataRef.data;
    } catch (error) {
      console.log("Error delete Blog: " + error);
    }
  },

  // [GET BLOG WITJ ID] /blog/me/:idBLog
  async getBlogWithId(idBlog) {
    try {
      const dataRef = await axios.get(`/blog/me/${idBlog}`);

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    }
  },

  // [UPDATE BLOG]
  async updateBlogWithId(idBlog, dataBlog) {
    try {
      const dataRef = await axios.put(`/blog/me/${idBlog}/update`, dataBlog);

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    }
  },

  // [GET ALL BLOG]
  async getAllBlogs() {
    try {
      const dataRef = await axios.get(`/blog/all`);

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    }
  },

  // [GET BLOG WITH SLUG]
  async getBlogDetailWithSlug(slugBlog) {
    try {
      const dataRef = await axios.get(`/blog/${slugBlog}`);

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    }
  },

  // get blog most read
  async getBlogMostRead(idAuthor, limit) {
    try {
      const dataRef = await axios.get(`/blog/most-read/${idAuthor}/${limit}`);

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    }
  },

  /**
   *
   * @param year
   * @returns list counter of blog by year
   */

  async countBlogByYear(year) {
    try {
      const dataRef = await axios.get(`/blog/count-blog-with-year/${year}`);

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    }
  },

  //
  async getBlogTop(limit) {
    try {
      const dataRef = await axios.get(
        `/blog/get-top-blog-with-query?limit=${limit}`
      );

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    }
  },
};

export { blogService, isPending, isPendingIndex };
