<style></style>

<template>
  <header class="AdminHeader">
    <div class="boxHeaderlogo">
      <router-link to="/admin/blogs/all" class="logo__link">
        <img
          src="@/assets/images/ic_logo_green.png"
          alt=""
          class="logo__image"
        />
        <p class="logo__text">
          <span class="logo__text--emphasize">Us</span>Love
        </p>
      </router-link>
    </div>

    <div class="boxRightHeader">
      <p class="textHello">Xin chào ADMIN</p>
      <div class="boxInforRight">
        <ul class="listItemBox">
          <li class="itemBox">
            <div class="box__bell">
              <fa :icon="['fas', 'bell']" class="icon__bell__item" />
              <span class="count__notification">3</span>
            </div>
          </li>
          <li class="itemBox">
            <div
              class="box__multi__language"
              @mouseover="showListLanguages = true"
              @mouseleave="showListLanguages = false"
            >
              <div class="current__language">
                <img
                  :src="`${require('@/assets/images/icon/flag/' +
                    currentLanguage.image)}`"
                  alt=""
                  class="icon__flag"
                />
                <p class="text__country">{{ currentLanguage.name }}</p>
                <fa :icon="['fas', 'angle-down']" class="icon__arrow__down" />
              </div>

              <Transition
                name="drop-list"
                enter-active-class="animate__animated animate__fadeInDown"
                leave-active-class="animate__animated animate__fadeOutUp"
              >
                <ul class="list__language" v-show="showListLanguages">
                  <li
                    class="item__language"
                    v-for="item in getListLanguage"
                    :key="item.id"
                    @click="onSelectLanguage(item)"
                  >
                    <img
                      :src="`${require('@/assets/images/icon/flag/' +
                        item.image)}`"
                      alt=""
                      class="icon__flag"
                    />
                    <p class="text__country">{{ item.name }}</p>
                  </li>
                </ul>
              </Transition>
            </div>
          </li>
          <li class="itemBox">
            <div class="box__person">
              <div class="box__person__inner d-flex align-items-center">
                <p class="text__person__name">
                  {{ sub_string(userCurrentName, 16) }}
                </p>
                <img
                  :src="`${require('@/assets/images/icon/flag/vietnam.png')}`"
                  alt=""
                  class="img__person"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import handleLanguage from "@/utils/handleLanguage";
import SubString from "@/utils/sub_string";
import checkUserLogin from "@/utils/checkUserLogin";

export default {
  name: "AdminHeader",
  data() {
    return {
      name: "Thu Hien",

      dataFlagCountry: [
        {
          id: 1,
          image: "vietnam.png",
          name: "Viet Nam",
          language: "vi",
        },
        {
          id: 2,
          image: "usa.png",
          name: "America",
          language: "en",
        },
      ],

      currentLanguage: this.dataFlagCountry,

      showListLanguages: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const dataCurrent = this.dataFlagCountry.filter(
        (el) => el.language == handleLanguage.getLanguage()
      );

      this.currentLanguage = dataCurrent[0];
    },
    onSelectLanguage(item) {
      this.currentLanguage = Object.assign({}, item);
      this.$i18n.locale = item.language;
      handleLanguage.changeLanguage(item.language);
    },
    sub_string: SubString,
  },
  computed: {
    getListLanguage() {
      return this.dataFlagCountry.filter(
        (item) => item.id != this.currentLanguage.id
      );
    },
    check_user_login: checkUserLogin,
    userCurrentName() {
      if (this.$store.state.dataUserCurrent !== null) {
        return this.$store.state.dataUserCurrent.name;
      }

      return "name user";
    },
  },
};
</script>
