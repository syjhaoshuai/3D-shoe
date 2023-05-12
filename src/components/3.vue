<template>
  <div>
    <div class="text">
      <div class="top">
        <div @click="onclose">轨道</div>
        <div @click="ClickImg">图片</div>
      </div>
      <div @click="addimg">
        <img src="./assets/iTab-cGMoMFlBcEk.webp" alt="" />
        <img src="./assets/iTab-FHiJZ0lgBaE.jpg" alt="" />
        <img src="./assets/iTab-R7aGzmbwACQ.webp" alt="" />
        <img src="./assets/iTab-zJF1lRdUdAw.jpg" alt="" />
      </div>
    </div>
    <canvas ref="canvas" />
    <div class="cby-3dcore-ctexture-wrap" ref="ctWrapEle"></div>
  </div>
</template>

<script >
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { fabric } from "fabric";
import GUI from "lil-gui";
export default {
  name: "App",
  data() {
    return {
      ctWrapEle: {},
      canvas1: {},
      gltfres: {},
      ctFabric: {},
      ctCanvas: {},
      objItem: {},
    };
  },
  methods: {
    addimg(e) {
      let ctFabric1 = this.ctFabric;
      if (e.target.localName === "img") {
        var img = new fabric.Image(
          e.target,
          // 设置图片的位置为固定位置
          {
            left: 1100,
            top: 370.64996971937535,
            angle: 0,
            scaleX: 0.19098945265925424,
            scaleY: 0.19098945265925424,
            flipX: false,
            flipY: false,
            //
            originX: "center",
            originY: "center",
            padding: 10,
          }
          // 将图片添加到画布中
        );
        ctFabric1.add(img);
      }
    },
    onclose() {
      this.ctWrapEle.style.pointerEvents = "none";
    },
    ClickImg() {
      this.ctWrapEle.style.pointerEvents = "all";
    },
  },

  async mounted() {
    let myEXRLoader = new Promise((rj, rz) => {
      const EXRLloader = new EXRLoader();
      EXRLloader.load(
        "./textures/denim_fabric_nor_gl_4k.exr",
        function (texture) {
          rj(texture);
        }
      );
    });
    let res = await myEXRLoader;

    // normalMap
    const textureLoader = new THREE.TextureLoader();

    const doorColorTexture = textureLoader.load(
      "./textures/denim_fabric_diff_4k.jpg"
    );
    const roughnessTexture = textureLoader.load(
      "./textures/denim_fabric_rough_4k.jpg"
    );
    const doorHeightTexture = textureLoader.load(
      "./textures/denim_fabric_disp_4k.png"
    );

    const doorColorTexture1 = textureLoader.load(
      "./textures1/leather_red_03_coll1_4k.png"
    );
    const doorHeightTexture1 = textureLoader.load(
      "./textures1/leather_red_03_rough_4k.jpg"
    );
    const basicMaterial1 = new THREE.MeshStandardMaterial({
      map: doorColorTexture1,
      aoMap: doorHeightTexture,

      // roughness: 1,
    });
    const basicMaterial = new THREE.MeshStandardMaterial({
      map: doorColorTexture,
      displacementMap: doorHeightTexture,
      aoMap: roughnessTexture,
      aoMapIntensity: 1,
      displacementScale: 0.01,
      normalMap: res,
      // roughness: 0.3,
      // displacementMap: doorHeightTexture,
    });
    this.ctWrapEle = this.$refs.ctWrapEle;

    let iskai = false;
    let targetMap = {};
    let ctCanvas = document.createElement("canvas");
    ctCanvas.width = window.innerWidth;
    ctCanvas.height = window.innerHeight;

    let ctFabric = new fabric.Canvas(ctCanvas, {
      preserveObjectStacking: true,
    });

    this.ctFabric = ctFabric;
    this.ctFabric.setWidth(window.innerWidth);
    this.ctFabric.setHeight(window.innerHeight);

    const texturePx = 2048;

    let mixer = document.createElement("canvas");
    const mixerCtx = mixer.getContext("2d");
    mixer.width = texturePx;
    mixer.height = texturePx;

    const update = () => {
      iskai = true;
      mixerCtx.clearRect(0, 0, mixer.width, mixer.height);
      mixerCtx.drawImage(
        ctCanvas,
        0,
        0,
        ctCanvas.width,
        ctCanvas.height,
        -1930.366060724328,
        -76.16457924156413,
        5482.2720730225055,
        2656.5422335436615
      );
      // basic color
      mixerCtx.globalCompositeOperation = "destination-over";
      mixerCtx.fillStyle = "#ffffff";
      mixerCtx.fillRect(0, 0, mixer.width, mixer.height);
      targetMap.needsUpdate = true;
      render();
    };

    // 创建矩形元素
    const canvas = this.$refs.canvas;
    this.canvas1 = canvas;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");
    // 2创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // 设置相机位置
    camera.position.set(0, 5, 10);
    // 把相机添加到场景中
    scene.add(camera);
    const loader = new GLTFLoader();
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath("./draco/gltf");

    // loader.setDRACOLoader(dracoLoader);
    // loader.setCrossOrigin(true); //跨域共享资源
    const guiobj = {
      leftColor: "#ffffff",
      rightColor: "#ffffff",
      laceColor: "#ffffff",
      frontColor: "#ffffff",
    };
    const gui = new GUI();

    let gltres = (gltf) => {
      this.gltfres = gltf;
      scene.add(this.gltfres);
    };

    loader.load(
      "./test.glb",
      function (gltf) {
        iskai = true;
        const carModel = gltf.scene;
        carModel.traverse((obj) => {
          if (obj.name === "Side01") {
            //右
            gui
              .addColor(guiobj, "rightColor")
              .name("右边")
              .onChange((value) => {
                obj.material.color.set(value);
              });

            console.log(obj.material, "obj.material");
            obj.material = basicMaterial;
            console.log(obj.material, "obj.material");
          } else if (obj.name === "Side02") {
            // let canvas = document.getElementById("c");
            var canvasTexture = new THREE.CanvasTexture(mixer);
            canvasTexture.wrapS = THREE.RepeatWrapping;
            canvasTexture.wrapT = THREE.RepeatWrapping;
            obj.material.map = canvasTexture;
            // obj.material.map.needsUpdate = true;
            obj.material.map.flipY = false; //图片反

            ctFabric.on("after:render", function () {
              update();
            });
            targetMap = obj.material.map;
            // 左
            gui
              .addColor(guiobj, "leftColor")
              .name("左边")
              .onChange((value) => {
                obj.material.color.set(value);
              });

            obj.material = basicMaterial1;
          } else if (obj.name === "ShoeLace") {
            // 带
            gui
              .addColor(guiobj, "laceColor")
              .name("鞋带")
              .onChange((value) => {
                obj.material.color.set(value);
              });
          } else if (obj.name === "Tongue") {
            gui
              .addColor(guiobj, "frontColor")
              .name("前面")
              .onChange((value) => {
                obj.material.color.set(value);
              });
          } else {
          }
        });
        gltf.scene.rotation.y = -1.8;
        // gltf.scene.position.z = 0.5;
        // gltf.scene.position.y = -0.5;
        update();
        gltres(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    //灯光
    const light1 = new THREE.DirectionalLight(0xffffff, 0.3);
    light1.position.set(0, 0, 10);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.3);
    light2.position.set(0, 0, -10);

    const light3 = new THREE.DirectionalLight(0xffffff, 0.3);
    light3.position.set(10, 0, 0);

    const light4 = new THREE.DirectionalLight(0xffffff, 0.3);
    light4.position.set(-10, 0, 0);

    const light5 = new THREE.DirectionalLight(0xffffff, 0.3);
    light5.position.set(0, 10, 0);

    const light6 = new THREE.DirectionalLight(0xffffff, 0.3);
    light6.position.set(5, 10, 0);

    const light7 = new THREE.DirectionalLight(0xffffff, 0.3);
    light7.position.set(0, 10, 5);

    // const light8 = new THREE.DirectionalLight(0xffffff, 0.3);
    // light8.position.set(0, 10, -5);
    const light9 = new THREE.DirectionalLight(0xffffff, 0.3);
    light9.position.set(-5, -10, 0);

    scene.add(
      light1,
      light2,
      light3,
      light4,
      light5,
      light6,
      light7,
      // light8,
      light9
    );
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    // //添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    //初始化渲染器
    const renderer = new THREE.WebGLRenderer({ canvas });
    //设置渲染的尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);

    //轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.update();
    controls.addEventListener("change", () => {
      iskai = true;
    });
    //使用渲染器 ，通过相机将场景渲染进来
    function render() {
      controls.update();
      if (iskai) {
        setInterval(() => {
          if (iskai) iskai = false;
        }, 100);
        controls.update();
        renderer.render(scene, camera);
      }

      //   渲染下一帧的时候就会调用render函数
    }
    renderer.setAnimationLoop(render);

    if (this.$refs.ctWrapEle.firstChild) {
      this.$refs.ctWrapEle.removeChild(this.$refs.ctWrapEle.firstChild);
    }
    this.$refs.ctWrapEle.appendChild(this.ctFabric.wrapperEl);

    window.addEventListener("resize", function () {
      // camera
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      // renderer
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  },
};
</script>

<style>
.img {
  position: fixed;
  top: 0;
  left: -8px;
  width: 400px;
  height: 400px;
}
img {
  margin: 10px 20px;
  width: 100px;
  width: 100px;
}
.div {
  position: fixed !important;
  top: 0;
  left: 10px;

  z-index: 1111 !important;
  /* background-color: red; */
}

.cby-3dcore-ctexture-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0;
  pointer-events: none;
}
.text {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 77777;

  background-color: rgb(155, 177, 170, 0.2);
}
.top {
  display: flex;
  width: 100%;
}
.top div {
  width: 40px;
  text-align: center;
  line-height: 40px;
  margin: 20px 50px;
  background-color: rgb(22, 239, 170);
}
img {
  width: 80px;
  height: 60px;
}
</style>
