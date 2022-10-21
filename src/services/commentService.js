import axios from "axios";

const commentService = {
  async sendComment(dataComment) {
    try {
      const dataRef = await axios.post(`/comment/create`, dataComment);

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    }
  },

  // get all comments with id of blog
  async getAllCommentsWithIdBlog(idBlog) {
    try {
      const dataRef = await axios.get(`/comment/${idBlog}`);

      return dataRef.data;
    } catch (error) {
      console.log("Error Blog: " + error);
    }
  },
};

export { commentService };
