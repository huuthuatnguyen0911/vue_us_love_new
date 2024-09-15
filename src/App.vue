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
          newArrayGroup.push(element.dataGroupChat[0]?._id);
        });

        this.$socket.emit("groupchat:join", newArrayGroup);
      }
    },
  },
  mounted() {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "32cb7188efdaf87ef470d9f7cc8b26263",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
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
