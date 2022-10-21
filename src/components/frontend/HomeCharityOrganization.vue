<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
  /* opacity: 1; */
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  /* transform: translateX(30px); */
}

.data_emty {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
}
</style>

<template>
  <div class="charity__organization__content">
    <div class="header__orga">
      <p class="title">{{ $t("charityorganization") }}</p>
      <input
        type="text"
        placeholder="Tên tỉnh"
        class="input__orga"
        v-model="query"
      />
    </div>
    <div class="body__content">
      <div class="row" v-if="computedList.length > 0">
        <TransitionGroup
          enter-active-class="animate__animated animate__fadeIn animate__faster"
          leave-active-class="animate__animated animate__fadeOut animate__faster"
        >
          <div
            class="col-md-6 col-sm-12 box__item__charity"
            v-for="(item, index) in computedList"
            :key="item.id"
            :data-index="index"
          >
            <div class="item__charity backgroundMainItem">
              <div class="row align-items-center">
                <div class="col-md-7 col-sm-12 row_rps">
                  <p class="name__charity">{{ sub_string(item.name, 18) }}</p>
                  <p class="description">
                    {{ sub_string(item.description, 70) }}
                  </p>
                  <a
                    :href="item.link"
                    class="btn__charity"
                    @mouseover="onScaleOverlay"
                  >
                    Xem thông tin
                  </a>
                  <div class="box__spread"></div>
                </div>
                <div class="col-md-5 col-sm-12 image_rps">
                  <div class="box__logo">
                    <img
                      :src="`${require('@/assets/images/logo_organization/' +
                        item.logo)}`"
                      alt=""
                      class="img__logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
      <div class="data_emty" v-else>Không có tên tỉnh bạn muốn tìm</div>
    </div>
  </div>
</template>

<script>
import SubString from "@/utils/sub_string";

export default {
  name: "CharityOrganization",

  data() {
    return {
      query: "",
    };
  },

  methods: {
    sub_string: SubString,

    initData() {},
    onScaleOverlay() {
      //   const overlay = document.createElement("div");
    },
  },
  computed: {
    dataCharityOrganization() {
      return this.$store.state.dataCharityOrganization;
    },

    computedList() {
      return this.$store.state.dataCharityOrganization.filter((item) =>
        item.location.toLowerCase().includes(this.query.toLowerCase())
      );
    },
  },
};
</script>
