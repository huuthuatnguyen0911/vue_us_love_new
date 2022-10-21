<style></style>

<template>
  <div id="AdminDefault">
    <section class="sc_adminHeader">
      <AdminHeader />
    </section>
    <section class="sc_adminNav">
      <AdminNavigation />
    </section>
    <section class="sc_main">
      <slot></slot>
    </section>
  </div>
</template>

<script>
import AdminHeader from "@/components/layouts/AdminHeader.vue";
import AdminNavigation from "@/components/layouts/AdminNavigation.vue";

export default {
  name: "AdminDefault1",
  components: { AdminHeader, AdminNavigation },
};
</script>
