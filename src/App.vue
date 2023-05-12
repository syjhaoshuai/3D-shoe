<template>
  <div :class="isMobile === 'pc' ? 'pc' : 'Mobile'">
    <canvas ref="canvas" />
    <div class="text">
      <div class="top">
        <div
          class="item"
          @click="topClick(index, item.rotate, item.type)"
          :class="index === activeId ? 'active' : ''"
          v-for="(item, index) in list"
          :key="index"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="tow">
        <div
          @click="towClick(index)"
          :class="index === activePid ? 'active' : ''"
          class="item"
          v-for="(item, index) in secondLevel"
          :key="index"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="imgs">
        <div v-if="showImgList.title === '文字'" class="text_img">
          <div class="text_input">
            <input
              :style="color"
              class="textInput"
              v-model="text"
              type="text"
            />
            <button @click="addText">确定</button>
          </div>
          <div>
            <Sketch v-if="isMobile === 'pc'" v-model="selectedColor"></Sketch>
            <Slider
              style="width: 100vw"
              v-else
              v-model="selectedColor"
            ></Slider>
            <!-- <Photoshop v-model="selectedColor" /> -->
          </div>
        </div>
        <div
          v-else
          :class="index === activeImg && activePid === 1 ? 'active' : ''"
          class="itemImg"
          v-for="(item, index) in showImgList.value"
          :key="index"
        >
          <div v-if="item.type">{{ item.title }}</div>
          <img
            @click="Textures(item.type, item.url, index)"
            :src="item.url"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="closed" id="gui-container"></div>
    <template v-if="loading">
      <Loading></Loading>
    </template>
  </div>
</template>

<script >
import Vue from "vue";
import { Photoshop, Material, Slider } from "vue-color";
import CreateShow from "./utils/3DShoe";
import Loading from "./components/loading.vue";
import Materia from "./utils/Materia";
export default {
  name: "App",
  components: {
    Loading,
    Photoshop,
    Material,
    Slider,
  },
  data() {
    return {
      size: {
        width: window.innerWidth,
        height: window.innerHeight,
      },

      selectedColor: "#ffffff",
      from: "Side02",
      textureObj: {},

      loading: true,
      text: "",
      list: [
        {
          type: "Side02",
          rotate: {
            position: [
              {
                x: -0.15514408412884806,
                y: 0.45583742834700647,
                z: 4.416298087252979,
              },
            ],
          },
          title: "左",
          value: [
            {
              title: "材质",
              value: [
                {
                  title: "原图",
                  type: ["Side02", "original"],
                  map: "./Canvas/Canvas/Side02_Diffuse02.png",
                  normalMap: "./Canvas/Canvas/Side02_Normal.png",
                  url: "./Canvas/textures/Snipaste_2023-05-10_15-30-42.png",
                },
              ],
            },
            {
              title: "贴图",
              value: [
                {
                  url: "./img/23.png",
                },
                {
                  url: "./img/21.png",
                },
                {
                  url: "./img/13.png",
                },
                {
                  url: "./img/12.png",
                },
                {
                  url: "./img/9.png",
                },
                {
                  url: "./img/7.png",
                },
                {
                  url: "./img/5.png",
                },
                {
                  url: "./img/4.png",
                },
                {
                  url: "./img/2.png",
                },
                {
                  url: "./img/10.png",
                },
              ],
            },
            {
              title: "文字",
            },
          ],
        },
        {
          type: "Tongue",
          rotate: {
            position: [
              {
                x: -4.566183090477527,
                y: 5.8392105923152124,
                z: -0.26348666816662436,
              },
            ],
          },
          title: "前面",

          value: [
            {
              title: "材质",

              value: [
                {
                  title: "原图",
                  type: ["Tongue", "original"],
                  map: "./Canvas/Canvas/Tongue_Heel_Diffuse02a.png",
                  normalMap: "./Canvas/Canvas/Tongue_Heel_Normal.png",
                  url: "./Canvas/textures/Snipaste_2023-05-10_15-30-42.png",
                },
              ],
            },
          ],
        },
        {
          rotate: {
            position: [
              {
                x: -2.1627944257985083,
                y: 5.313623373208952,
                z: -0.16654404431364367,
              },
            ],
          },
          type: "ShoeLace",
          title: "鞋带",

          value: [
            {
              title: "材质",
              value: [
                {
                  title: "原图",
                  type: ["ShoeLace", "original"],
                  map: "./Canvas/Canvas/ShoeLace_Diffuse02.png",
                  normalMap: "./Canvas/Canvas/ShoeLace_Normal.png",
                  url: "./Canvas/textures/Snipaste_2023-05-10_15-30-42.png",
                },
              ],
            },
          ],
        },

        {
          type: "Side01",
          rotate: {
            position: [
              {
                x: 1.3928477225866174,
                y: 0.632767367957918,
                z: -4.170746566638777,
              },
            ],
          },
          title: "右",

          value: [
            {
              title: "材质",
              value: [
                {
                  title: "原图",
                  type: ["Side01", "original"],
                  map: "./Canvas/Canvas/Side01_Diffuse02.png",
                  normalMap: "./Canvas/Canvas/Side01_Normal.png",
                  url: "./Canvas/textures/Snipaste_2023-05-10_15-30-42.png",
                },
              ],
            },

            {
              title: "贴图",
              value: [
                {
                  url: "./img/23.png",
                },
                {
                  url: "./img/21.png",
                },
                {
                  url: "./img/13.png",
                },
                {
                  url: "./img/12.png",
                },
                {
                  url: "./img/9.png",
                },
                {
                  url: "./img/7.png",
                },
                {
                  url: "./img/5.png",
                },
                {
                  url: "./img/4.png",
                },
                {
                  url: "./img/2.png",
                },
                {
                  url: "./img/10.png",
                },
              ],
            },
            {
              title: "文字",
            },
          ],
        },
      ],
      activeId: 0,
      activePid: 0,
      activeImg: 0,
    };
  },

  computed: {
    secondLevel() {
      return this.list[this.activeId].value;
    },
    showImgList() {
      return this.list[this.activeId].value[this.activePid];
    },
    color() {
      return {
        color: this.selectedColor.hex,
        fontSize: "20px",
      };
    },
    isMobile() {
      function isMobile() {
        // 使用正则表达式匹配常见的移动设备名称
        const mobileRegex =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

        // 判断用户代理字符串中是否包含移动设备名称
        return mobileRegex.test(navigator.userAgent);
      }

      // 调用函数判断用户是手机还是PC端登录
      if (isMobile()) {
        // 手机端登录
        this.size.height = window.innerHeight / 2;
        document.body.classList.add("Mobile");
        return "Mobile";
      } else {
        // PC端登录
        return "pc";
      }
    },
  },
  methods: {
    isLoading() {
      this.loading = false;
    },
    topClick(index, rotate1, type) {
      this.activeId = index;
      this.activePid = 0;
      // 右边0.5
      //
      if (type === "Side02" || type === "Side01") {
        let value = {
          url: this.list[this.activeId].value[1].value[this.activeImg].url,
        };
        this.$cbyc.setTextures(value);
      }
      let rotate = JSON.parse(JSON.stringify(rotate1));
      let value = {
        rotate,
        type,
      };
      if (
        (type === "Side02" && this.from === "Side01") ||
        (type === "Side01" && this.from === "Side02")
      ) {
        value.rotate.position.unshift({
          x: -0.058219784373530606,
          y: 11.180184525848116,
          z: -0.009188291082589443,
        });
      }

      this.$cbyc.Rotate(value);
      this.from = type;
    },
    towClick(index) {
      this.activePid = index;
    },
    Textures(type, url, index) {
      this.activeImg = index;
      let value = {};
      if (type) {
        value.material = this.textureObj[type[0]][type[1]];
      } else {
        value.url = url;
      }
      this.$cbyc.setTextures(value);
    },
    addText() {
      this.$cbyc.setText(this.text, this.selectedColor.hex);
    },
    loginType() {},
  },

  created() {},
  mounted() {
    const canvas = this.$refs.canvas;
    this.textureObj = Materia(this.list);
    Vue.prototype.$cbyc = new CreateShow({
      canvas,
      loading: this.isLoading,
      Width: this.size.width,
      Height: this.size.height,
      isMobile: this.isMobile,
    });
    let value = {
      url: this.list[this.activeId].value[1].value[this.activeImg].url,
    };
    this.$cbyc.setTextures(value);
    console.log(this.isMobile);
    if (this.isMobile === "Mobile") {
      const element = document.querySelector('[aria-expanded="true"]');
      element.click();
    }
  },
};
</script>

<style lang='scss'>
.closed {
  display: none;
}
.Mobile {
  .lil-gui.autoPlace {
    width: 100%;
    top: 50% !important;
    left: 0 !important;

    .children {
      height: 50vh;
    }
  }
}

.Mobile {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #1f2322;

  .text {
    padding-top: 40px;
    height: 50vh;
    background-color: rgb(155, 177, 170, 0.2);
    .top {
      width: 100vw;
      display: flex;
      justify-content: space-evenly;
      .item {
        background-color: #fff;
        flex: 1;
        margin: 0 3px;
        border-radius: 3px;
        text-align: center;
        line-height: 5vh;
      }
    }
    .tow {
      margin-top: 5px;
      display: flex;
      justify-content: space-around;
      .item {
        background-color: #fff;
        width: 25vw;
        margin: 0 3px;
        border-radius: 3px;
        text-align: center;
        line-height: 5vh;
      }
    }
    .imgs {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 3px;
      img {
        width: 19vw;
        height: 19vw;
      }
      .itemImg {
        display: flex;
        width: 20vw;
        height: 20vw;
        flex-direction: column;
        align-items: center;
        max-width: 70px;
        max-height: 70px;
      }
      .text_input {
        margin: 10px 0;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        input {
          border-radius: 4px;
        }
        button {
          border-radius:5px ;
          width: 70px;
          line-height: 30px;
          background-color: #6088ad;
        }
      }
    }
  }
}

.active {
  background-color: #cccc !important;
}
.pc {
  .text {
    width: 290px;
    height: 534px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 77777;
    padding: 5px;
    background-color: rgb(155, 177, 170, 0.2);
    .top {
      background-color: #070707;
      display: flex;
      width: 100%;
      justify-content: space-between;
      font-size: 24px;
      .item {
        margin: 10px 3px;
        flex: 1;
        text-align: center;
        padding: 3px;
        background-color: #ffffff;
        border-radius: 5px;
      }
    }
    .tow {
      line-height: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #070707;
      justify-content: space-between;
      padding: 10px 40px;
      .item {
        font-size: 24px;
        padding: 3px;
        background-color: #ffffff;
        border-radius: 5px;
      }
    }
    .imgs {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .text_img {
        margin-top: 5px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .text_input {
          margin-bottom: 5px;
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .textInput {
          width: 199px;
          height: 50px;
          border-radius: 5px;
        }
        button {
          height: 50px;
          background-color: #0aa7a2;
        }
      }
      .itemImg {
        img {
          width: 80px;
          height: 60px;
        }
        margin: 0 5px;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
}
</style>
