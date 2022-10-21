<template>
  <div id="AuthAccountUnconfirm">
    <div class="boxHeaderMain">
      <div class="boxDropdown">
        <select class="slDropdown">
          <option value="" disabled selected>Admin kiểm duyệt</option>
          <option>Nguyễn Hữu Thuật</option>
          <option>Nguyễn Thành Thiện</option>
        </select>
      </div>

      <div class="boxFilter">
        <input
          type="text"
          class="searchFilterAuth"
          placeholder="Tìm theo tên, email, điện thoại"
          v-model="searchText"
          @input="onEmitSearchAccount"
        />

        <div class="boxSortFilter">
          <button class="btnSort" v-if="true">
            <fa :icon="['fas', 'arrow-up-short-wide']" class="ic_sort" />
            <p>Mới nhất</p>
          </button>

          <button class="btnSort" v-else>
            <fa :icon="['fas', 'arrow-down-short-wide']" class="ic_sort" />
            <p>Cũ nhất</p>
          </button>
        </div>
      </div>
    </div>

    <div class="boxTableAccountUnConfirm">
      <div class="boxLoadingData" v-if="isPending">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="" v-else>
        <p class="text-center" v-if="!listDataAccounts">
          Không có tài khoản nào cần xác minh
        </p>

        <table class="table table_custom" v-else>
          <thead class="thead_custom">
            <tr class="tr_custom">
              <th scope="col">#</th>
              <th scope="col">Tài khoản</th>
              <th scope="col">Ảnh</th>
              <th scope="col">Thời gian</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Email</th>
              <th scope="col">Xử lý</th>
            </tr>
          </thead>

          <tbody class="tbody_custom">
            <template v-for="(item, index) in listDataAccounts" :key="item._id">
              <tr class="tr_custom" v-if="!isPending && listDataAccounts">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ item.dataUser.name }}</td>
                <td>
                  <img
                    :src="convert_image(item.dataUser.avatar)"
                    alt=""
                    class="imageAvatarAccount"
                  />
                </td>
                <td>
                  {{ formate_date(item.createdAt, "dddd") }},
                  {{ formate_date(item.createdAt, "DD-MM-YYYY") }}
                </td>
                <td>0{{ item.dataUser.phone }}</td>
                <td>{{ item.dataUser.email }}</td>
                <td>
                  <button class="btnEyeSeen" @click="onSeenAccount(item)">
                    <fa :icon="['fas', 'eye']" />
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from "@/utils/formateDate";
import ConvertImage from "@/utils/convertImage";

export default {
  name: "AuthAccountTable",
  props: ["isPending", "listDataAccounts", "isSetShow"],
  data() {
    return {
      searchText: null,
      typingTimer: null,
      doneTypingInterval: 5000,
    };
  },
  methods: {
    onEmitSearchAccount() {
      clearTimeout(this.typingTimer);

      this.typingTimer = setTimeout(() => {
        this.$emit("onEmitSearchAccount", {
          search: this.searchText,
          status: this.isSetShow,
        });
      }, 1200);
    },
    onSeenAccount(dataItem) {
      this.$emit("dataItemAccount", {
        data: dataItem,
        status: this.isSetShow,
      });
    },
    formate_date: formatDate.basicFormat,
    convert_image: ConvertImage,
  },
};
</script>

<style></style>
