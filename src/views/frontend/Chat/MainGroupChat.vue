<style></style>

<template>
  <div class="MainGroupChat">
    <div id="bg__overlay"></div>
    <div class="boxMainChatInner">
      <div class="boxFlexChat">
        <div class="boxLeft">
          <div class="headerLogo">
            <fa
              :icon="['fas', 'angle-left']"
              class="ic_back"
              @click="$router.go(-1)"
            />
            <p class="title_page">Chat</p>
            <div></div>
          </div>

          <div class="formSearchGroupChat">
            <fa :icon="['fas', 'search']" class="ic_search" />
            <input
              type="text"
              placeholder="Tìm kiếm nhóm chiến dịch"
              class="inputSearch"
              v-model="searchGroup"
            />
          </div>

          <div class="boxListGroupChat">
            <ul class="listGroupChat">
              <li
                class="itemGroupChat"
                v-for="item in listGroupChat"
                :key="item.id"
                :class="{ active: item.id == getIdCurrentGroupChat }"
                @click="handleShowChat(item)"
              >
                <div class="boxItemInner">
                  <img
                    :src="convert_image(item.avatar)"
                    alt=""
                    class="imageAvatarGroup"
                  />
                  <div class="boxRightInner">
                    <p class="nameGroup">{{ sub_string(item.name, 100) }}</p>
                    <!-- <p class="textMessage" v-if="item.last_message">
                      {{ sub_string(item.last_message, 100) }}
                    </p> -->
                    <p class="textMessage">Không có tin nhắn</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="boxRight">
          <ContentChat :dataGroupChat="currentShowChat" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConvertImage from "@/utils/convertImage";
import SubString from "@/utils/sub_string";
import { mapGetters } from "vuex";
import ContentChat from "@/components/frontend/chat/ContentChat.vue";

export default {
  name: "MainGroupChat",
  components: { ContentChat },
  data() {
    return {
      listGroupChat: null,
      currentShowChat: null,
      searchGroup: "",
    };
  },
  mounted() {
    this.genaratorGroupChat();
  },
  methods: {
    genaratorGroupChat() {
      if (this.getDataGroupChat) {
        const newArrayGroup = this.getDataGroupChat.map((item) => {
          return {
            id: item.dataGroupChat[0]._id,
            name: item.dataGroupChat[0].Chat_name,
            avatar: item.dataGroupChat[0].Chat_avatar,
            list_member: item.CM_list_members,
            id_campaign: item.dataGroupChat[0].id_campaign,
          };
        });

        this.listGroupChat = newArrayGroup;
        this.currentShowChat = this.listGroupChat[0];
      }
    },
    searchGroupChatWithName(val) {
      if (val) {
        const newGroupChatFilter = this.listGroupChat.filter((item) => {
          let newVal = val
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
          let newNameChat = item.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

          if (newNameChat.includes(newVal)) {
            return item;
          }
        });
        this.listGroupChat = newGroupChatFilter;
      } else {
        this.genaratorGroupChat();
      }
    },
    handleShowChat(dataChat) {
      if (dataChat) {
        this.currentShowChat = dataChat;
      }
    },
    convert_image: ConvertImage,
    sub_string: SubString,
  },
  computed: {
    ...mapGetters(["getDataGroupChat", "getIdCurrentGroupChat"]),
  },
  watch: {
    searchGroup(newVal) {
      this.searchGroupChatWithName(newVal);
    },
    getDataGroupChat() {
      this.genaratorGroupChat();
    },
  },
};
</script>
