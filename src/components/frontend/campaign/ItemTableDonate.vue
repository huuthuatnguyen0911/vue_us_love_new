<template>
  <div id="ItemTableDonate">
    <ul class="listMemberDonate" v-if="dataDonater.length">
      <li class="itemMember" v-for="item in dataDonater" :key="item._id">
        <div class="boxInforMember">
          <div class="boxleft">
            <p class="name">{{ item.user ? item.user.name : "Nhà hảo tâm" }}</p>
            <p class="mess">{{ item.Donor_messenger }}</p>
          </div>

          <div class="boxRight">
            <p class="money">{{ convert_money(item.Donor_money) }}</p>
          </div>
        </div>
      </li>
    </ul>

    <p class="text-center" v-else>Chưa có quyên góp nào</p>
  </div>
</template>

<script>
import convertMoney from "@/utils/convertMoney";

export default {
  name: "ItemTableDonate",
  props: ["dataDonater"],
  methods: {
    convert_money: convertMoney,
  },
};
</script>

<style></style>
