<style></style>

<template>
  <div id="right__default" class="fixed-element">
    <div class="box__earth box__custom__right backgroundMainItem">
      <img src="@/assets/images/common/earth.gif" alt="" class="image__earth" />
      <div class="item__text">
        <p class="title">Trái đất</p>
        <p class="content">
          "là hành tinh thứ ba tính từ Mặt Trời, đồng thời cũng là hành tinh lớn
          nhất trong các hành tinh đất đá của hệ Mặt Trời xét về bán kính ,"
        </p>
      </div>
    </div>

    <div class="box__custom__right box__group box__custom__right">
      <p class="title__group">Nhóm liên hệ</p>
      <ul class="list__group" v-if="check_user_login">
        <li class="item__group" v-for="item in listGroupChat" :key="item.id">
          <router-link :to="{ name: 'home' }" class="item__link">
            <img :src="convert_image(item.avatar)" alt="" class="img__group" />
            <p class="name__group">{{ sub_string(item.name, 30) }}</p>

            <!-- <div class="box__dots">
              <fa :icon="['fas', 'ellipsis-vertical']" class="icon__group" />
              <div class="list__"></div>
            </div> -->
          </router-link>
        </li>
      </ul>
      <p class="show_text_group" v-else>Bạn chưa đăng nhập!</p>
    </div>
  </div>
</template>

<script>
import SubString from "@/utils/sub_string";
import checkUserLogin from "@/utils/checkUserLogin";
import ConvertImage from "@/utils/convertImage";
import { mapState } from "vuex";

export default {
  name: "RightDefault",

  data() {
    return {
      dataListGroup: [
        {
          id: 0,
          link: "home",
          image: "bao_gam.png",
          name: "Name group event",
        },

        {
          id: 1,
          link: "home",
          image: "bao_gam.png",
          name: "Name group event",
        },
      ],
      listGroupChat: null,
    };
  },
  mounted() {
    this.genaratorGroupChat();
  },
  methods: {
    sub_string: SubString,
    genaratorGroupChat() {
      if (this.dataGroupChat) {
        const newArrayGroup = this.dataGroupChat.map((item) => {
          return {
            id: item.dataGroupChat[0]?._id,
            name: item.dataGroupChat[0]?.Chat_name,
            avatar: item.dataGroupChat[0]?.Chat_avatar,
          };
        });

        this.listGroupChat = newArrayGroup;
      }
    },
    convert_image: ConvertImage,
  },
  computed: {
    ...mapState(["dataGroupChat"]),
    check_user_login: checkUserLogin,
  },
};
</script>
