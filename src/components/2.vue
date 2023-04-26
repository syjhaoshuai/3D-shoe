<template>
  <div>
    <canvas ref="canvas" />
    <div class="div">
      <canvas
        width="200"
        height="200"
        style="border: 1px solid #ccc"
        id="c"
      ></canvas>
    </div>
  </div>
</template>

<script >
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { fabric } from "fabric";
import GUI from "lil-gui";
export default {
  name: "App",
  data() {
    return {
      canvas1: {},
      gltfres: {},
      ctFabric: {},
      ctCanvas: {},
    };
  },
  methods: {},
  mounted() {
    const texturePx = 2048;

    // create mixer   canvas.getContext('2d') 方法返回指定画布元素的 2D 渲染上下文。
    // 该上下文提供了必要的方法和属性，以在画布上进行绘制、填充、擦除和变换等操作。通过这个上下文，我们可以使用 JavaScript 绘制各种图形、图像以及创建动画等。
    let mixer = document.createElement("canvas");
    const mixerCtx = mixer.getContext("2d");
    mixer.width = texturePx;
    mixer.height = texturePx;

    const canvasfabric = new fabric.Canvas("c");

    fabric.Image.fromURL("./chunk-70-AHT-SLO-42.5.png", function (img) {
      // 设置图片的位置为固定位置
      img.set({ left: 0, top: 0, selectable: false });
      // 将图片添加到画布中
      canvasfabric.add(img);
    });
    // 创建矩形元素
    const rect = new fabric.Rect({
      top: 10,
      left: 10,
      width: 60,
      height: 60,
      fill: "red",
    });

    // 将矩形添加到画布中
    canvasfabric.add(rect);

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
    camera.position.set(0, 0, 7);
    // 把相机添加到场景中
    scene.add(camera);

    const loader = new GLTFLoader();

    const guiobj = {
      leftColor: "#9d9d9d",
      rightColor: "#9d9d9d",
      laceColor: "#9d9d9d",
      frontColor: "#9d9d9d",
    };
    const gui = new GUI();

    let gltres = (gltf) => {
      this.gltfres = gltf;
      scene.add(this.gltfres);
    };

    loader.load(
      "./chunk-70-AHT-091001.glb",
      function (gltf) {
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
          } else if (obj.name === "Side02") {
            let canvas = document.getElementById("c");
            var canvasTexture = new THREE.CanvasTexture(canvas);
            canvasTexture.wrapS = THREE.RepeatWrapping;
            canvasTexture.wrapT = THREE.RepeatWrapping;
            obj.material.map = canvasTexture;

            canvasfabric.on("after:render", function () {
              obj.material.map.needsUpdate = true;
            });
            // 左
            gui
              .addColor(guiobj, "leftColor")
              .name("左边")
              .onChange((value) => {
                obj.material.color.set(value);
              });
          } else if (obj.name === "ShoeLace") {
            // 带
            gui
              .addColor(guiobj, "laceColor")
              .name("鞋带")
              .onChange((value) => {
                obj.material.color.set(value);
              });
          } else if (obj.name === "Tongue") {
            console.log(22);
            gui
              .addColor(guiobj, "frontColor")
              .name("前面")
              .onChange((value) => {
                obj.material.color.set(value);
              });
          } else {
          }
        });
        console.log(gltf.scene);
        gltf.scene.rotation.y = -1.8;
        // gltf.scene.position.z = 0.5;
        // gltf.scene.position.y = -0.5;
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

    // //添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    //初始化渲染器
    const renderer = new THREE.WebGLRenderer({ canvas });
    //设置渲染的尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);

    //轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxDistance = 9;
    controls.minDistance = 1;

    controls.minPolarAngle = 0;
    controls.maxPolarAngle = (80 / 360) * 2 * Math.PI;

    controls.update();

    this.ctCanvas = document.createElement("canvas");
    let ctFabric = new fabric.Canvas(this.ctCanvas, {
      preserveObjectStacking: true,
    });
    ctFabric.setWidth(window.innerWidth);
    ctFabric.setHeight(window.innerHeight);
    this.ctFabric = ctFabric;

    //使用渲染器 ，通过相机将场景渲染进来
    function render() {
      ctFabric.renderAll();
      renderer.render(scene, camera);
      // controls.update();
      //   渲染下一帧的时候就会调用render函数
      requestAnimationFrame(render);
    }

    render();
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
</style>
