<template>
  <div id="AdminAnimalAdd">
    <div class="animalBoxInner">
      <form @submit.prevent class="formAddAnimal">
        <div class="boxImageAnimal">
          <div class="box_avater">
            <label for="inputFileAvater" v-if="dataAnimal.avatar == null">
              <fa :icon="['fas', 'user-plus']" />
              <input
                id="inputFileAvater"
                type="file"
                accept=".jpg, .jpeg, .png, .mp4"
                style="display: none"
                @change="onChageAvater($event, 'avatar')"
            /></label>

            <label for="inputFileAvater" v-else>
              <img
                ref="imgeAvaterVal"
                :src="convertToLinkImage(dataAnimal.avatar)"
                alt=""
                class="img__avater" />
              <input
                id="inputFileAvater"
                type="file"
                accept=".jpg, .jpeg, .png"
                style="display: none"
                @change="onChageAvater($event, 'avatar')"
            /></label>
            <p class="text">Chọn ảnh đại diện</p>
          </div>

          <div class="box_avater box_env">
            <label for="inputFileEnv" v-if="dataAnimal.imageEnv == null">
              <fa :icon="['fas', 'user-plus']" />
              <input
                id="inputFileEnv"
                type="file"
                accept=".jpg, .jpeg, .png, .mp4"
                style="display: none"
                @change="onChageAvater($event, 'env')"
            /></label>

            <label for="inputFileEnv" v-else>
              <img
                ref="imgeAvaterVal"
                :src="convertToLinkImage(dataAnimal.imageEnv)"
                alt=""
                class="img__avater" />
              <input
                id="inputFileEnv"
                type="file"
                accept=".jpg, .jpeg, .png"
                style="display: none"
                @change="onChageAvater($event, 'env')"
            /></label>
            <p class="text">Chọn ảnh môi trường</p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="boxListImageAnimal">
              <div class="boxText">
                <p class="name">Thêm ảnh</p>
                <label for="inputImageOfAnimal">
                  <fa :icon="['fas', 'plus']" class="ic_add" />
                  <input
                    type="file"
                    id="inputImageOfAnimal"
                    style="display: none"
                    multiple="true"
                    @change="onSelectImageAnimal"
                  />
                </label>
              </div>

              <ul class="listImage">
                <li
                  class="itemImage"
                  v-for="(item, index) in dataAnimal.listImage"
                  :key="index"
                  @click="removeImageAvatar(item)"
                >
                  <img
                    :src="convertToLinkImage(item)"
                    alt=""
                    class="imgOfAnimal"
                  />
                </li>
              </ul>
            </div>

            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                placeholder="Tên tiếng việt"
                class="inputForm"
                v-model="dataAnimal.name"
              />
            </div>

            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                placeholder="Tên khoa học"
                class="inputForm"
                v-model="dataAnimal.name_science"
              />
            </div>

            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                placeholder="Họ của động vật"
                class="inputForm"
                v-model="dataAnimal.surname"
              />
            </div>

            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                placeholder="Lớp của động vật"
                class="inputForm"
                v-model="dataAnimal.order"
              />
            </div>

            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                placeholder="Thời gian phát hiện"
                class="inputForm"
                v-model="dataAnimal.detection_time"
              />
            </div>

            <div class="boxform bgBoxAdmin">
              <input
                type="number"
                placeholder="Số lượng cá thể"
                class="inputForm"
                v-model="dataAnimal.number_individuals"
              />
            </div>

            <div class="boxform bgBoxAdmin">
              <textarea
                class="areaForm"
                placeholder="Mô tả ngắn"
                v-model="dataAnimal.sub_des"
              ></textarea>
            </div>
          </div>
          <div class="col-md-6">
            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                placeholder="Trích dẫn sách đỏ"
                class="inputForm"
                v-model="dataAnimal.re_ma_name"
              />
            </div>

            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                placeholder="Link tới trích dẫn"
                class="inputForm"
                v-model="dataAnimal.re_ma_link"
              />
            </div>

            <div class="boxform bgBoxAdmin">
              <select v-model="dataAnimal.habitat" class="selectOption">
                <option value="" disabled selected>Môi trường sống</option>
                <option
                  v-for="(option, index) in optionsHabitat"
                  :value="option.value"
                  :key="index"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>

            <div class="boxform bgBoxAdmin">
              <select v-model="dataAnimal.status" class="selectOption">
                <option value="" disabled selected>Tình trạng loài</option>
                <option
                  v-for="(option, index) in optionsStatus"
                  :value="option.value"
                  :key="index"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>

            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                placeholder="Phân bổ"
                class="inputForm"
                v-model="dataAnimal.distribution"
              />
            </div>

            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                placeholder="Kích thước"
                class="inputForm"
                v-model="dataAnimal.size"
              />
            </div>

            <div class="boxform bgBoxAdmin">
              <input
                type="text"
                placeholder="Tuổi đời"
                class="inputForm"
                v-model="dataAnimal.age"
              />
            </div>

            <div class="boxEditor bgBoxAdmin">
              <QuillEditor
                theme="snow"
                toolbar="full"
                contentType="html"
                placeholder="Viết bài của bạn ở đây..."
                v-model:content="dataAnimal.description"
                ref="qillEidtor"
              />
            </div>
          </div>
        </div>

        <div class="boxButtonHandle">
          <button
            class="btnSubmit"
            @click="onSubmitAddAnimal"
            :disabled="isPending"
          >
            Thêm động vật
          </button>
        </div>
      </form>
    </div>
  </div>

  <NotifiView ref="componentNotifi" />
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { AnimalService, isPending } from "@/services/AnimalService";

export default {
  name: "AdminAnimalAdd",
  setup() {
    return { isPending };
  },
  components: { QuillEditor },
  data() {
    return {
      dataAnimal: {
        avatar: null,
        imageEnv: null,
        listImage: null,
        name: "",
        name_science: "",
        surname: "",
        order: "",
        sub_des: "",
        detection_time: "",
        number_individuals: "",
        description: "",
        re_ma_name: "",
        re_ma_link: "",
        status: "",
        habitat: "",
        distribution: "",
        size: "",
        age: "",
      },
      optionsHabitat: [
        {
          text: "Trên cạn",
          value: "land",
        },
        {
          text: "Dưới / trên nước",
          value: "water",
        },
        {
          text: "Trên không",
          value: "overhead",
        },
        {
          text: "Đầm lầy",
          value: "swamp",
        },
      ],
      optionsStatus: [
        {
          text: "Được bảo vệ",
          value: "protected",
        },
        {
          text: "Đã tuyệt chủng",
          value: "extinct",
        },
        {
          text: "Bình thường",
          value: "normal",
        },
        {
          text: "Tiêu diệt",
          value: "extermination",
        },
      ],
    };
  },
  methods: {
    onChageAvater(event, opt) {
      const file = event.target.files[0];

      if (opt == "avatar") {
        this.dataAnimal.avatar = file;
      } else if (opt == "env") {
        this.dataAnimal.imageEnv = file;
      }
    },

    onSelectImageAnimal(event) {
      const result = Object.keys(event.target.files).map(
        (key) => event.target.files[key]
      );
      this.dataAnimal.listImage = result;
    },

    removeImageAvatar(file) {
      const indexNew = this.dataAnimal.listImage.indexOf(file);
      this.dataAnimal.listImage.splice(indexNew, 1);
    },

    convertToLinkImage(file) {
      return URL.createObjectURL(file);
    },

    async onSubmitAddAnimal() {
      const formdata = new FormData();
      formdata.append("avatar", this.dataAnimal.avatar);
      formdata.append("imageEnv", this.dataAnimal.imageEnv);
      this.dataAnimal.listImage.forEach((fileImage) => {
        formdata.append("listImage", fileImage);
      });
      formdata.append("name", this.dataAnimal.name);
      formdata.append("name_science", this.dataAnimal.name_science);
      formdata.append("surname", this.dataAnimal.surname);
      formdata.append("order", this.dataAnimal.order);
      formdata.append("sub_des", this.dataAnimal.sub_des);
      formdata.append("detection_time", this.dataAnimal.detection_time);
      formdata.append("number_individuals", this.dataAnimal.number_individuals);
      formdata.append("description", this.dataAnimal.description);
      formdata.append("re_ma_name", this.dataAnimal.re_ma_name);
      formdata.append("re_ma_link", this.dataAnimal.re_ma_link);
      formdata.append("status", this.dataAnimal.status);
      formdata.append("habitat", this.dataAnimal.habitat);
      formdata.append("distribution", this.dataAnimal.distribution);
      formdata.append("size", this.dataAnimal.size);
      formdata.append("age", this.dataAnimal.age);

      const dataRef = await AnimalService.createAnimal(formdata);

      if (dataRef.status) {
        this.$refs.componentNotifi.onCreateNotification({
          status: "success",
          message: "Tạo động vật thành công",
          theme: "admin",
        });
      } else {
        this.$refs.componentNotifi.onCreateNotification({
          status: "destructive",
          message: "Tạo động vật không thành công",
          theme: "admin",
        });
      }
    },
  },
};
</script>

<style></style>
