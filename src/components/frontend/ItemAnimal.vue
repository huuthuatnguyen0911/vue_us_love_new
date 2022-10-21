<template>
  <div id="ItemAnimal">
    <div class="boxContentInner">
      <div class="row align-items-center">
        <div class="col-md-3">
          <div class="boxImage">
            <img
              src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg"
              alt=""
              class="imgBlog"
            />
          </div>
        </div>
        <div class="col-md-7">
          <div class="boxInforBlog">
            <p class="textTitleBlog">chao bam</p>
            <p class="textCotentBlog">
              ákefjaksldjfklajsfakfaksjfasfsjfaksdjfksjadsfklsdjfklasjdfoiwjeoiwfejaskvjaskjfaksdjfkasjfkadjsfkadjsfjadsjfaksldj
            </p>
            <div class="boxAuthor">
              <img
                src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg"
                class="img__group"
              />
              <p class="name__group">Thanh thien</p>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <ul class="listBtn">
            <li class="itemBtn green">
              <fa :icon="['fas', 'eye']" class="ic_handle" />
            </li>

            <li class="itemBtn green">
              <fa :icon="['fas', 'eye']" class="ic_handle" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemAnimal",
};
</script>

<style></style>
