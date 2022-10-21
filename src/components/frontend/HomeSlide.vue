<style lang="scss"></style>

<template>
  <div class="slide_main">
    <!-- :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }" -->
    <swiper
      class="swiper"
      :modules="modules"
      :pagination="{ clickable: true, dynamicBullets: true }"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
    >
      <swiper-slide class="slide" v-for="item in dataListMain" :key="item.id">
        <div class="slide__item backgroundMainItem">
          <div class="row flex__row">
            <div class="box__slide__left col-md-6">
              <div class="item__title">
                <h4 class="name__animal">{{ item.name }}</h4>
                <p class="text__resources">{{ item.resource }}</p>
              </div>
              <p class="text__body">
                {{ sub_string(item.description, 200) }}
              </p>
              <router-link :to="{ name: item.link }" class="btn_inf"
                >Xem thông tin</router-link
              >
            </div>
            <div class="box__slide__right col-md-6">
              <img
                :src="`${require('@/assets/images/page/' + item.image)}`"
                alt=""
              />
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";

import SubString from "@/utils/sub_string";

export default {
  name: "HomeSlide",
  setup() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      dataListMain: [
        {
          id: 0,
          link: "home",
          image: "bao_gam.png",
          description:
            "Báo gấm (Neofelis nebulosa) hay báo mây, (tiếng Anh: Clouded Leopard) là một loài mèo cỡ trung bình trong Họ Mèo, toàn thân dài 60 tới 110 cm (2' - 3'6\") và cân nặng khoảng 11 – 20 kg (25 lbs 4oz - 44 lbs)",
          resource: "IUCN Red List",
          name: "Báo Hoa mai",
        },
        {
          id: 1,
          link: "home",
          image: "bo_cau_nau.png",
          description:
            "Chiều dài của bồ câu nâu là từ 36 - 40,5 cm. Bồ câu đực khi trưởng thành có phần đầu màu xám trắng còn phần trên thì có màu nâu tía với độ bóng màu xanh lá cây mờ nhạt trên cổ, thân và lưng có màu xanh nhưng óng ánh hơn, mông sẫm và đuôi có màu xám phủ hết mông, cổ họng và phần dưới có màu xám. Còn con cái thì có phần đầu màu nâu xám và nâu.",
          resource: "IUCN Red List",
          name: "Bồ câu nâu",
        },
        {
          id: 2,
          link: "home",
          image: "te giac.png",
          description:
            "Tê giác hay con tê (tiếng Anh: Rhinoceros hay Rhino) (/raɪˈnɒsərəs/, từ tiếng Hy Lạp rhinokerōs, nghĩa là 'mũi sừng', từ rhis nghĩa là 'mũi', và keras nghĩa là 'sừng') là những loài động vật có vú guốc lẻ trong họ Rhinocerotidae. Trong năm loài còn sinh tồn, hai loài sinh sống ở Châu Phi, và ba loài sinh sống ở Nam Á.",
          resource: "IUCN Red List",
          name: "Tê giác",
        },
        {
          id: 3,
          link: "home",
          image: "vuon_tay_trang.png",
          description:
            "Thân hình giống như vượn đen. Khác là ở chỗ con đực có bàn chân, bàn tay trắng, xung quanh mặt viền lông trắng (hoặc vàng nhạt, vàng xanh, ở con cái). Thân và chân tay vàng nhạt đều, xung quanh mặt trắng.",
          resource: "IUCN Red List",
          name: "Vượn tay trắng",
        },
        {
          id: 4,
          link: "home",
          image: "vooc_xam.png",
          description:
            "Bộ lông màu xám tro tới màu nâu đen, trên đầu có mào lông, da bao quanh mắt có màu xanh và trắng. Lông ở vùng lưng thẫm hơn ở vùng bụng. Bên hông có các lông dài, đầu lông có ánh bạc. Đuôi dài hơn thân, lông đuôi rất dài. Chân tay có màu đen, phần trên cánh tay, chân và đuôi có màu xám bạc.",
          resource: "IUCN Red List",
          name: "Voọc xám",
        },
      ],
    };
  },
  methods: {
    sub_string: SubString,
  },
};
</script>
