<style></style>

<template>
  <div class="boxMainInfor">
    <div class="innerInfor">
      <p class="titleInfor">Thông tin cá nhân</p>

      <form action="javascript:void(0)" class="formInforMe">
        <div class="formGroupMain">
          <div class="form__input__group">
            <fa :icon="['fas', 'user']" class="icon_input" />
            <input
              type="text"
              placeholder="Tên người dùng"
              class="input__infor"
              autocomplete="off"
              v-model="dataFormUser.name"
            />
          </div>
        </div>

        <div class="formGroupMain">
          <div class="form__input__group">
            <fa :icon="['fas', 'envelope']" class="icon_input" />
            <input
              type="email"
              placeholder="Email"
              class="input__infor"
              autocomplete="off"
              disabled
              v-model="dataFormUser.email"
            />
          </div>
        </div>

        <div class="formGroupMain">
          <div class="row">
            <div class="col-md-7">
              <div class="form__input__group">
                <fa :icon="['fas', 'cake-candles']" class="icon_input" />
                <input
                  type="date"
                  placeholder="Ngày sinh"
                  class="input__infor"
                  autocomplete="off"
                  v-model="dataFormUser.dob"
                />
              </div>
            </div>
            <div class="col-md-5">
              <div class="form__input__group">
                <fa :icon="['fas', 'hourglass']" class="icon_input" />
                <input
                  type="text"
                  placeholder="Tuổi"
                  class="input__infor"
                  autocomplete="off"
                  v-model="dataFormUser.age"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="formGroupMain">
          <div class="form__input__group">
            <fa :icon="['fas', 'phone']" class="icon_input" />
            <input
              type="number"
              placeholder="Nhập số điện thoại"
              class="input__infor"
              autocomplete="off"
              v-model="dataFormUser.phone"
            />
          </div>
        </div>

        <div class="formGroupMain">
          <div class="form__input__group">
            <fa :icon="['fas', 'location']" class="icon_input" />
            <input
              type="text"
              placeholder="Nhập nhập địa chỉ"
              class="input__infor"
              autocomplete="off"
              v-model="dataFormUser.address"
            />
          </div>
        </div>

        <div class="form__btn__group">
          <div
            class="box__button"
            @click="updateInforMe"
            v-if="!isPendingInforMe"
          >
            <div class="inner__slide">
              <fa :icon="['fas', 'angles-right']" class="icon__slide__btn" />
            </div>
            <a href="javascript:void(0)" class="btn__submit__register"
              >Sửa thông tin</a
            >
          </div>

          <div class="box_loading" v-else>
            <img
              src="@/assets/images/icon/loading_icon.gif"
              alt=""
              class="icon_loading"
            />
            <p class="text_loading">Đang xử lý</p>
          </div>
        </div>
      </form>

      <p class="titleInfor">Bảo mật</p>

      <form action="javascript:void(0)" class="formInforMe">
        <div class="formGroupMain">
          <div class="form__input__group">
            <fa :icon="['fas', 'key']" class="icon_input" />
            <input
              type="password"
              placeholder="mật khẩu cũ"
              class="input__infor"
              autocomplete="off"
              v-model="v$.dataFormPassword.oldPassword.$model"
            />
          </div>
          <div
            class="box__form__error"
            :class="{
              error: v$.dataFormPassword.oldPassword.$errors.length,
            }"
          >
            <ul
              class="list__error"
              v-for="error of v$.dataFormPassword.oldPassword.$errors"
              :key="error.$uid"
            >
              <li class="error-msg">{{ error.$message }}</li>
            </ul>
          </div>
        </div>

        <div class="formGroupMain">
          <div class="form__input__group">
            <fa :icon="['fas', 'key']" class="icon_input" />
            <input
              type="password"
              placeholder="mật khẩu mới"
              class="input__infor"
              autocomplete="off"
              v-model="v$.dataFormPassword.newPassword.$model"
            />
          </div>
          <div
            class="box__form__error"
            :class="{
              error: v$.dataFormPassword.newPassword.$errors.length,
            }"
          >
            <ul
              class="list__error"
              v-for="error of v$.dataFormPassword.newPassword.$errors"
              :key="error.$uid"
            >
              <li class="error-msg">{{ error.$message }}</li>
            </ul>
          </div>
        </div>

        <div class="formGroupMain">
          <div class="form__input__group">
            <fa :icon="['fas', 'rotate-right']" class="icon_input" />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              class="input__infor"
              autocomplete="off"
              v-model="v$.dataFormPassword.re_Password.$model"
            />
          </div>
          <div
            class="box__form__error"
            :class="{
              error: v$.dataFormPassword.re_Password.$errors.length,
            }"
          >
            <ul
              class="list__error"
              v-for="error of v$.dataFormPassword.re_Password.$errors"
              :key="error.$uid"
            >
              <li class="error-msg">{{ error.$message }}</li>
            </ul>
          </div>
        </div>

        <div class="form__btn__group">
          <div
            class="box__button"
            @click="onSubmitChangePass"
            v-if="!isPendingPass"
          >
            <div class="inner__slide">
              <fa :icon="['fas', 'angles-right']" class="icon__slide__btn" />
            </div>
            <a href="javascript:void(0)" class="btn__submit__register"
              >Đổi mật khẩu</a
            >
          </div>

          <div class="box_loading" v-else>
            <img
              src="@/assets/images/icon/loading_icon.gif"
              alt=""
              class="icon_loading"
            />
            <p class="text_loading">Đang xử lý</p>
          </div>
        </div>
      </form>
    </div>
  </div>

  <NotifiView ref="componentNotifi" />
</template>

<script>
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import { sameAs, minLength, helpers } from "@vuelidate/validators";
import {
  meService,
  isPendingInforMe,
  isPendingPass,
} from "@/services/meService";
//
export default {
  name: "MeInformation",
  setup: () => {
    return { v$: useVuelidate(), isPendingInforMe, isPendingPass };
  },
  data() {
    return {
      isPending: false,
      dataFormUser: {
        name: "",
        email: "",
        dob: "",
        age: "",
        phone: "",
        address: "",
      },
      dataFormPassword: {
        oldPassword: "",
        newPassword: "",
        re_Password: "",
      },
    };
  },
  validations() {
    return {
      dataFormPassword: {
        oldPassword: {
          minLength: helpers.withMessage(
            ({ $params }) => `Phải có ít nhất ${$params.min} kí tự`,
            minLength(8)
          ),
        },
        newPassword: {
          minLength: helpers.withMessage(
            ({ $params }) => `Phải có ít nhất ${$params.min} kí tự`,
            minLength(8)
          ),
        },
        re_Password: {
          sameAsPassword: helpers.withMessage(
            () => `Chưa khớp với mật khẩu`,
            sameAs(this.dataFormPassword.newPassword)
          ),
        },
      },
    };
  },
  mounted() {
    this.initDataMain();
  },
  methods: {
    async updateInforMe() {
      const dateRef = await meService.updateMyInfor(
        this.dataUserCurrent._id,
        this.dataFormUser
      );
      if (dateRef.success) {
        this.$refs.componentNotifi.onCreateNotification({
          status: "success",
          message: "Cập nhật thành công",
          theme: "",
        });
      } else {
        this.$refs.componentNotifi.onCreateNotification({
          status: "destructive",
          message: "Cập nhật thất bại",
          theme: "",
        });
      }
    },
    async onSubmitChangePass() {
      const dataRef = await meService.updatePassword(
        this.dataUserCurrent._id,
        this.dataFormPassword
      );
      if (dataRef.success) {
        this.$refs.componentNotifi.onCreateNotification({
          status: "success",
          message: "Đổi mật khẩu thành công",
          theme: "",
        });
      } else {
        this.$refs.componentNotifi.onCreateNotification({
          status: "destructive",
          message: "Đổi mật khẩu thất bại",
          theme: "",
        });
      }

      this.dataFormPassword = {
        oldPassword: "",
        newPassword: "",
        re_Password: "",
      };
    },
    initDataMain() {
      this.dataFormUser = {
        name: this.dataUserCurrent.name,
        email: this.dataUserCurrent.email,
        dob: this.dataUserCurrent.dob,
        age: this.dataUserCurrent.age,
        phone: this.dataUserCurrent.phone,
        address: this.dataUserCurrent.address,
      };
    },
    parseDateYear(str) {
      let data = new Date(str);
      return data.getFullYear();
    },
  },
  computed: {
    ...mapState(["dataUserCurrent"]),
  },
  watch: {
    "dataFormUser.dob": {
      handler(newValue) {
        this.dataFormUser.age = Math.round(
          Number(new Date().getFullYear()) -
            Number(this.parseDateYear(newValue))
        );
      },
    },
  },
};
</script>
