<style></style>
<template>
  <div id="ActivityGame" class="mt-50">
    <p class="header__title">Game vui</p>
    <div class="boxListImageGame">
      <div class="row">
        <div
          class="col-md-4 game__rps"
          v-for="item in dataListGame"
          :key="item.id"
        >
          <Tilt
            :options="{ max: 15, speed: 400, glare: true, 'max-glare': 0.2 }"
          >
            <div class="colInner backgroundMainItem">
              <img
                :src="`${require('@/assets/images/page/' + item.avatar)}`"
                alt=""
                class="avt__game"
              />
              <div class="boxInforContent">
                <p class="titleGame">{{ item.name }}</p>

                <p class="description">
                  {{ sub_string(item.description, 90) }}
                </p>

                <p class="textTopScore">
                  Điểm cao nhất: <span class="score">{{ item.top_score }}</span>
                </p>

                <div style="text-align: center">
                  <button
                    @click="$router.push({ name: item.link })"
                    class="btnOnGame"
                  >
                    Vào game
                  </button>
                </div>
              </div>
            </div>
          </Tilt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubString from "@/utils/sub_string";
import Tilt from "vanilla-tilt-vue";

export default {
  name: "ActivityGame",
  components: { Tilt },
  data() {
    return {
      dataListGame: [
        {
          id: 0,
          avatar: "game_flipcard.png",
          name: "Flip CARD ANIMAL",
          description:
            "Game lật thẻ bài động vật là một game vui. Cho mọi người giải trí. Ngoài ra, kết thúc mỗi ván game sẽ có thông tin của một loài động vật để ban tăng sự hiểu biết của mình",
          top_score: "2000",
          link: "game_flip_card",
        },
        {
          id: 1,
          avatar: "avt_game.png",
          name: "QUIZ GAME ANIMAL",
          description:
            "Trả lời câu hỏi về đồng vật, bạn sẽ có thêm một lượng kiến thức về động vật, cũng như sẽ nhận được phần thưởng của chúng tôi",
          top_score: "2000",
          link: "game_flip_card",
        },
      ],
    };
  },
  methods: {
    sub_string: SubString,
  },
};
</script>
