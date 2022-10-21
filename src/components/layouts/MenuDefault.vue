<style></style>
<template>
  <div class="boxMenuMain fixed-element">
    <div class="item__header item__header--logo">
      <router-link :to="{ name: 'home' }" class="logo__link">
        <img src="@/assets/images/heart-logo.png" alt="" class="logo__image" />
        <p class="logo__text">
          <span class="logo__text--emphasize">Us</span>Love
        </p>
      </router-link>
    </div>

    <nav id="nav__menu" class="">
      <ul class="list__menu">
        <li
          class="item__menu"
          v-for="item in dataMenu"
          :key="item.id"
          :class="{ active: item.link === this.$route.name }"
        >
          <a @click="onHandleChangePage(item.link)" class="item_link">
            <img
              :src="`${require('@/assets/images/icon/menu/' + item.image)}`"
              alt=""
              class="item__menu__icon"
            />
            <p class="item__menu__text">{{ $t(item.name) }}</p>
          </a>
        </li>

        <li class="item__hr" v-if="check_user_login">
          <hr />
        </li>
        <template v-for="item in dataListPersonal" :key="item.id">
          <li
            class="item__menu"
            v-if="check_user_login"
            :class="{ active: item.link === this.$route.name }"
          >
            <a
              @click="
                $router.push({
                  name: item.link,
                  params: { idUser: dataUserCurrent._id },
                })
              "
              class="item_link"
            >
              <img
                :src="`${require('@/assets/images/icon/menu/' + item.image)}`"
                alt=""
                class="item__menu__icon"
              />
              <p class="item__menu__text">{{ $t(item.name) }}</p>
            </a>
          </li>
        </template>

        <li class="item__hr">
          <hr />
        </li>

        <li class="itemBoxChangeLanguage">
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
              enter-active-class="animate__animated animate__fadeInDown"
              leave-active-class="animate__animated animate__fadeOutUp"
            >
              <ul class="list__language" v-if="showListLanguages">
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

        <li
          class="itemButtonCreateCampaign"
          v-if="check_user_login"
          @click="$router.push({ name: 'conditionCampaign' })"
        >
          <button class="btnCampaign">{{ $t("textCreateCampaign") }}</button>
        </li>
      </ul>

      <div class="logout__box">
        <div
          class="logout__box__inner"
          v-if="check_user_login"
          @click="onLogout"
        >
          <img
            src="@/assets/images/icon/menu/log-out.png"
            alt=""
            class="icon__logout"
          />
          <p class="text__logout">{{ $t("signout") }}</p>
        </div>

        <div
          class="box__show_auth d-flex align-items-center justify-content-center"
          v-else
        >
          <a @click="onHandleChangePage('login')" class="link_auth">{{
            $t("login")
          }}</a>
          /
          <a @click="onHandleChangePage('register')" class="link_auth">
            {{ $t("register") }}
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import checkUserLogin from "@/utils/checkUserLogin";
import { authService } from "@/services/authService";
import { mapActions, mapState } from "vuex";
import handleLanguage from "@/utils/handleLanguage";

export default {
  name: "MenuDefault",

  data() {
    return {
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

      currentLanguage: null,

      showListLanguages: false,

      dataMenu: [
        {
          id: 0,
          link: "home",
          image: "home.png",
          name: "home",
        },
        {
          id: 1,
          link: "actives",
          image: "paw.png",
          name: "actives",
        },
        {
          id: 2,
          link: "events",
          image: "event.png",
          name: "events",
        },
        {
          id: 3,
          link: "report",
          image: "report.png",
          name: "reports",
        },
        {
          id: 4,
          link: "blog",
          image: "blog.png",
          name: "blogs",
        },
      ],

      dataListPersonal: [
        {
          id: 0,
          link: "person",
          image: "user.png",
          name: "person",
        },
        {
          id: 1,
          link: "ChatMe",
          image: "group.png",
          name: "group",
        },
        {
          id: 2,
          link: "ManagerAnimal",
          image: "icon_campaign.png",
          name: "campaignManger",
        },
        // {
        //   id: 2,
        //   link: "convey",
        //   image: "settings.png",
        //   name: "setting",
        // },
      ],
    };
  },

  created() {
    this.init();
  },

  methods: {
    ...mapActions(["getDataUser"]),
    onLogout() {
      authService.logoutAccount();
      authService.initAuthHeader();
      this.getDataUser();
      this.$router.push({ name: "home" });
    },

    init() {
      const dataCurrent = this.dataFlagCountry.filter(
        (el) => el.language == handleLanguage.getLanguage()
      );
      this.getDataUser();
      this.currentLanguage = dataCurrent[0];
    },

    onSelectLanguage(item) {
      this.currentLanguage = Object.assign({}, item);
      this.$i18n.locale = item.language;
      handleLanguage.changeLanguage(item.language);
    },

    onHandleChangePage(link) {
      this.$router.push({ name: link });
    },
  },

  computed: {
    ...mapState(["dataUserCurrent"]),
    getCheckRouterActive() {
      return this.$route.name;
    },
    getListLanguage() {
      return this.dataFlagCountry.filter(
        (item) => item.id != this.currentLanguage.id
      );
    },
    check_user_login: checkUserLogin,
  },
};
</script>
