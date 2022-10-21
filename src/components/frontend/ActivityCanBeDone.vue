<style></style>

<template>
  <div id="ActivityCanBeDone">
    <p class="header__title">Tôi có thể làm gì?</p>

    <div class="row align-items-center">
      <div class="col-md-4">
        <div class="boxInnerLeft">
          <div class="row">
            <div
              class="col-md-6 boxColCustom"
              v-for="item in dataCanBeDone"
              :key="item.id"
              @click="onSetCanbeDone(item)"
            >
              <Tilt
                :options="{
                  max: 15,
                  speed: 400,
                  glare: true,
                  'max-glare': 0.2,
                }"
              >
                <div
                  class="boxCardCanDone backgroundMainItem"
                  :style="{
                    'background-image': `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${item.img})`,
                  }"
                >
                  <p class="textCard">{{ item.object }}</p>
                </div>
              </Tilt>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="boxInnerRight backgroundMainItem">
          <p class="header__title">
            {{ currentCanBeDone.object }} có thể làm gì?
          </p>
          <p class="textDescription">
            {{ currentCanBeDone.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tilt from "vanilla-tilt-vue";

export default {
  name: "ActivityCanBeDone",
  components: { Tilt },
  data() {
    return {
      dataCanBeDone: [
        {
          id: 0,
          object: "Tình nguyên viên",
          img: "https://www.thiennhien.net/wp-content/uploads/2020/03/300320_rescue1.jpg",
          description:
            "tình nguyện viên nên tham gia hỗ trợ công tác chăm sóc, cứu hộ và phục hồi bản năng cho các cá thể tê tê và thú ăn thịt tịch thu từ các vụ săn bắt và buôn bán trái phép.Cơ hội tình nguyện vì động vật là một cách tuyệt vời để kết bạn và vui chơi. Nghiên cứu cũng chỉ ra rằng làm việc với động vật làm giảm mức độ căng thẳng và tăng cảm giác ổn định và ý nghĩa trong cuộc sống.",
        },
        {
          id: 1,
          object: "Học sinh & sinh viên",
          img: "https://www.thiennhien.net/wp-content/uploads/2020/10/211020_cuuhodongvat.jpg",
          description:
            "Không săn bắt các loài động vật hoang dã. Báo cho cơ quan chức năng những hành động như săn bắt, buôn bán trái phép…động vật quý hiếm. Tuyên truyền cho mọi người biết về vai trò và nguy cơ tuyệt chủng của động vật quý hiếm để mọi người cùng tham gia bảo vệ.Lên án,tố cáo những hành vi làm xâm hại đến những loài động vật quý hiếm. Tham gia tình nguyên khu vực sinh sống",
        },
        {
          id: 2,
          object: "Cơ quản & tổ chức",
          img: "https://ktmt.vnmediacdn.com/images/2021/03/03/13-1614781728-anh-5.jpg",
          description:
            "Tổ chức các chương trình bảo vệ động vật hoang dã, giáo dục con người. Phát hiện, ngăn chặng kiệp thời các hành vi tổn hại đến động vật. Tuyển truyền cho những người liên quan đến tổ chức",
        },
        {
          id: 3,
          object: "Mọi người",
          img: "https://img.nhandan.com.vn/Files/Images/2021/06/16/Nguyen_Van_Thai-1623786361828.jpg",
          description:
            "Con người nên tránh các hoạt động độc ác và bóc lột động vật như cưỡi voi và lạc đà khi đi du lịch. Không mua các sản phẩm có nguồn gốc từ ĐVHD nguy cấp quý hiếmNói không với việc chụp ảnh với ĐVHD",
        },
      ],
      currentCanBeDone: null,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.currentCanBeDone = this.dataCanBeDone[0];
    },
    onSetCanbeDone(item) {
      this.currentCanBeDone = item;
    },
  },
};
</script>
