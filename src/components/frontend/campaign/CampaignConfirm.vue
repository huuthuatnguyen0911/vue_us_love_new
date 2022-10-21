<style></style>

<template>
  <div class="CampaignConfirm">
    <div class="row align-items-center">
      <div class="col-md-7">
        <div class="boxTextConfirm">
          <p>Tuyệt vời!</p>
          <p>Mọi thứ đã sẵn sàng</p>
        </div>

        <p class="description_text">
          Cảm ơn bạn đã làm tới bước này, đây là bước cuối cùng để chúng tôi
          chắc chắn hơn về chiến dịch của bạn tạo ra.
        </p>

        <div class="row boxListConfirm">
          <div class="col-md-6 itemConfirm">
            <div class="boxIcon">
              <fa :icon="['fas', 'check']" class="ic_check_confirm" />
            </div>
            <span class="textConfirm">Những thông tin đều là sự thật</span>
          </div>

          <div class="col-md-6 itemConfirm">
            <div class="boxIcon">
              <fa :icon="['fas', 'check']" class="ic_check_confirm" />
            </div>
            <span class="textConfirm">Thực hiện chiến dịch thiện nguyện</span>
          </div>

          <div class="col-md-6 itemConfirm">
            <div class="boxIcon">
              <fa :icon="['fas', 'check']" class="ic_check_confirm" />
            </div>
            <span class="textConfirm">Không vi phạm đạo đức và pháp luật</span>
          </div>

          <div class="col-md-6 itemConfirm">
            <div class="boxIcon">
              <fa :icon="['fas', 'check']" class="ic_check_confirm" />
            </div>
            <span class="textConfirm">Chịu trách nhiệm với chiến dịch</span>
          </div>
        </div>

        <div class="checkBoxConfirm">
          <label class="checkbox">
            <input type="checkbox" v-model="checkConfirm" />
            <svg viewBox="0 0 21 18">
              <symbol
                id="tick-path"
                viewBox="0 0 21 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69"
                  fill="none"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </symbol>
              <defs>
                <mask id="tick">
                  <use class="tick mask" href="#tick-path" />
                </mask>
              </defs>
              <use class="tick" href="#tick-path" stroke="currentColor" />
              <path
                fill="white"
                mask="url(#tick)"
                d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z"
              />
            </svg>
            <svg class="lines" viewBox="0 0 11 11">
              <path d="M5.88086 5.89441L9.53504 4.26746" />
              <path d="M5.5274 8.78838L9.45391 9.55161" />
              <path d="M3.49371 4.22065L5.55387 0.79198" />
            </svg>
          </label>

          <p class="textCheckConfirm">Tôi cam kết</p>
        </div>

        <div class="boxButtonHandleConfirm">
          <button class="backPageConfirm" @click="$emit('onBackPageCampaign')">
            Quay lại
          </button>
          <button
            class="nextPageConfirm"
            :disabled="!checkConfirm"
            v-if="!isPendingCampaign"
            @click="$emit('onSendCreateCampaign')"
          >
            Tiếp theo
          </button>
          <button class="nextPageConfirm" disabled v-else>Tiếp theo</button>
        </div>
      </div>
      <div class="col-md-5">
        <div class="boxImageConfirm">
          <img
            src="@/assets/images/page/men_like.png"
            alt=""
            class="imgConfirm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isPendingCampaign } from "@/services/campaignService";

export default {
  name: "CampaignConfirm",
  setup() {
    return { isPendingCampaign };
  },
  data() {
    return {
      checkConfirm: false,
    };
  },
};
</script>
