<style></style>

<template>
  <div class="AdminNavigation">
    <ul class="listMenuAdmin">
      <li class="itemAdmin" v-for="item in listMenuAdmin" :key="item.id">
        <router-link :to="{ path: item.link }">
          <div
            class="boxItem"
            :class="{ active: item.nameLink == this.$route.name }"
          >
            <fa :icon="['fas', item.icon]" class="ic_navigation" />
            <p class="text_navigation">{{ $t(item.namePage) }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AdminNavigation",
  data() {
    return {
      listMenuAdmin: [
        {
          id: 0,
          link: "home",
          nameLink: "home",
          icon: "chart-line",
          namePage: "admin_dashboard",
        },
        {
          id: 1,
          link: "/admin/blogs/all",
          nameLink: "admin_blogs",
          icon: "file-pen",
          namePage: "admin_blog",
        },
        {
          id: 2,
          link: "/admin/auth-account",
          nameLink: "admin_auth_account",
          icon: "receipt",
          namePage: "admin_auth_account",
        },
        {
          id: 3,
          link: "/admin/animal",
          nameLink: "admin_animal",
          icon: "paw",
          namePage: "admin_animal",
        },
        {
          id: 4,
          link: "/admin/campaign",
          nameLink: "admin_campaign",
          icon: "tent",
          namePage: "admin_campaign",
        },
        {
          id: 5,
          link: "/admin/donate",
          nameLink: "admin_donate",
          icon: "circle-dollar-to-slot",
          namePage: "admin_donate",
        },
      ],
    };
  },
  mounted() {},
  computed: {},
};
</script>
