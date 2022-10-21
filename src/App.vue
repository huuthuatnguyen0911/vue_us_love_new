<template>
  <router-view />
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
// import handleLanguage from "@/utils/handleLanguage";

export default {
  setup() {},
  sockets: {
    "serverGroupChat:sendMess": function (data) {
      if (this.getIdCurrentGroupChat == data.id_group_chat) {
        this.addMessChatCurrent(data);
      }
    },
  },
  created() {
    this.initMain();
    this.initCreateGroupChat();
  },
  methods: {
    ...mapActions([
      "getDataUser",
      "getBlogMostRead",
      "getTopBlog",
      "getAllLocationsVietNam",
      "getAllBankVietNam",
      "getAllGroupChat",
    ]),
    ...mapMutations(["addMessChatCurrent"]),
    initMain() {
      this.getDataUser();
      this.getBlogMostRead();
      this.getTopBlog();
      this.getAllLocationsVietNam();
      this.getAllBankVietNam();
      this.getAllGroupChat();
    },
    initCreateGroupChat() {
      if (this.getDataGroupChat) {
        const newArrayGroup = [];
        this.getDataGroupChat.forEach((element) => {
          newArrayGroup.push(element.dataGroupChat[0]._id);
        });

        this.$socket.emit("groupchat:join", newArrayGroup);
      }
    },
  },
  computed: {
    ...mapGetters(["getDataGroupChat", "getIdCurrentGroupChat"]),
  },
  watch: {
    getDataGroupChat() {
      this.initCreateGroupChat();
    },
  },
};
</script>

<style lang="scss" src="@/assets/styles/main.scss"></style>
