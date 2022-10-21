<style></style>

<template>
  <section class="recent">
    <div class="activity-grid">
      <div class="activity-card">
        <p>Các chiến dịch</p>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Tên chiến dịch</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Ảnh đại diện</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tham quan rừng quốc gia ABC</td>
                <td>12 Th7, 2022</td>
                <td>30 Th7, 2022</td>
                <td class="td-team">
                  <div class="">
                    <img
                      class="img-avatar"
                      src="@/assets/images/page/clock.png"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span class="badge success">Đã hoàn thành</span>
                </td>
              </tr>
              <tr>
                <td>Thả động vật quý hiếm về rừng</td>
                <td>22 Th7, 2022</td>
                <td>30 Th7, 2022</td>
                <td class="td-team">
                  <div class="">
                    <img
                      class="img-avatar"
                      src="@/assets/images/page/clock.png"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span class="badge warning">Đang diễn ra</span>
                </td>
              </tr>
              <tr>
                <td>Họp meeting diễn đàn bảo vệ động vật</td>
                <td>21 Th7, 2022</td>
                <td>30 Th7, 2022</td>
                <td class="td-team">
                  <div class="">
                    <img
                      class="img-avatar"
                      src="@/assets/images/page/clock.png"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span class="badge success">Đã hoàn thành</span>
                </td>
              </tr>
              <tr>
                <td>Tuần lễ vàng bảo vệ động vật</td>
                <td>21 Th7, 2022</td>
                <td>30 Th7, 2022</td>
                <td class="td-team">
                  <div class="">
                    <img
                      class="img-avatar"
                      src="@/assets/images/page/clock.png"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span class="badge success">Đã hoàn thành</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SubString from "@/utils/sub_string";
import { mapState } from "vuex";

export default {
  name: "EventCampaign",
  components: {},
  setup() {
    return {};
  },
  data() {
    return {
      descriptionBlog:
        " They are threatened by habitat loss following large–scale deforestation and commercial poaching for the wildlife trade They are threatened by habitat loss following large–scale deforestation and commercial poaching for the wildlife trade      ",
    };
  },
  methods: {
    sub_string: SubString,
  },
  computed: {
    ...mapState(["dataEvent"]),
  },
};
</script>
