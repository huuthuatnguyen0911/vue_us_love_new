<style></style>

<template>
  <div class="NotifiView">
    <ul class="listNotifications">
      <li
        class="itemNotifi animate__animated animate__bounceInRight"
        v-for="(item, index) in listNotifications"
        :key="index"
        :class="{
          admin: item.theme == 'admin',
          success: item.status.status == 'success',
          informational: item.status.status == 'informational',
          warning: item.status.status == 'warning',
          destructive: item.status.status == 'destructive',
        }"
        :ref="`itemNotifi${index + 1}`"
      >
        <fa :icon="['fas', item.status.icon]" class="ic_notifi" />
        <p class="textNotification">{{ item.message }}</p>
      </li>

      <!-- <li
        class="itemNotifi admin success animate__animated animate__bounceInRight"
      >
        <fa :icon="['fas', 'circle-check']" class="ic_notifi" />
        <p class="textNotification">Name successfully</p>
      </li>

      <li
        class="itemNotifi informational animate__animated animate__bounceInRight"
      >
        <fa :icon="['fas', 'circle-info']" class="ic_notifi" />
        <p class="textNotification">Name successfully</p>
      </li>

      <li class="itemNotifi warning animate__animated animate__bounceInRight">
        <fa :icon="['fas', 'triangle-exclamation']" class="ic_notifi" />
        <p class="textNotification">Name successfully</p>
      </li>

      <li
        class="itemNotifi destructive animate__animated animate__bounceInRight"
      >
        <fa :icon="['fas', 'triangle-exclamation']" class="ic_notifi" />
        <p class="textNotification">Name successfully</p>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "NotifiView",
  //   props: ["optionNotifi"],
  data() {
    return {
      listNotifications: [],
      option: {
        status: {},
        message: "",
        theme: "",
      },
      listStatusNotifications: [
        {
          id: 0,
          status: "success",
          icon: "circle-check",
        },

        {
          id: 1,
          status: "informational",
          icon: "circle-info",
        },

        {
          id: 2,
          status: "warning",
          icon: "triangle-exclamation",
        },

        {
          id: 3,
          status: "destructive",
          icon: "triangle-exclamation",
        },
      ],
    };
  },
  methods: {
    onCreateNotification(optionData) {
      this.option.status = this.listStatusNotifications.filter(
        (item) => item.status == optionData.status
      )[0];
      this.option.theme = optionData.theme;
      this.option.message = optionData.message;

      const index = this.listNotifications.push(this.option);

      setTimeout(() => {
        this.$refs[`itemNotifi${index}`][0].classList.add(
          "animate__bounceOutRight"
        );
      }, 3000);

      setTimeout(() => {
        this.$refs[`itemNotifi${index}`][0].remove();
      }, 4000);
    },
  },
};
</script>
