<template>
  <div>
    <canvas ref="canvas" />
    <div class="img">
      <img @click.stop="imgClick" src="./assets/wallhaven-gpjo6e.jpg" alt="" />
      <img src="./assets/wallhaven-gpjo6e.jpg" alt="" />
      <img src="./assets/wallhaven-gpjo6e.jpg" alt="" />
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
  methods: {
    imgClick(e) {
      this.gltfres.traverse((gifl) => {
        if (gifl.name === "Side02") {
          console.log(11);
          fabric.Image.fromURL("./wallhaven-gpjo6e.jpg", (img) => {
            img.scale(0.5); //图片缩小10倍
            this.ctFabric.add(img).setActiveObject(img);
          });
          var canvasTexture = new THREE.CanvasTexture(this.ctCanvas);
          // canvasTexture.offset.set(-20, -10);
          // canvasTexture.needsUpdate = true;
          gifl.material.map = canvasTexture;
          gifl.material.needsUpdate = true;
          let canvas11 = this.canvas1;
          window.addEventListener("mousedown", onMouseDown);
          window.addEventListener("mouseup", onMouseUp);
          var isDragging = false;
          var previousMouseX, previousMouseY;

          function onMouseDown(event) {
            isDragging = true;

            previousMouseX = event.clientX;
            previousMouseY = event.clientY;

            document.addEventListener("mousemove", onMouseMove);
          }

          function onMouseMove(event) {
            if (isDragging) {
              var offsetX = (event.clientX - previousMouseX) / canvas11.width;
              var offsetY = (event.clientY - previousMouseY) / canvas11.height;

              gifl.material.map.offset.x -= offsetX;
              gifl.material.map.offset.y -= offsetY;
              previousMouseX = event.clientX;
              previousMouseY = event.clientY;

              gifl.material.needsUpdate = true;
            }
          }

          function onMouseUp(event) {
            isDragging = false;

            document.removeEventListener("mousemove", onMouseMove);
          }
        }
      });
    },
  },
  mounted() {
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

    // //网格
    // let grid = new THREE.GridHelper(20, 40, "red", 0xffffff);
    // grid.material.opacity = 0.2;
    // grid.material.transparent = true;
    // scene.add(grid);

    // //地板
    // const floorGeometry = new THREE.PlaneGeometry(20, 20);
    // const material = new THREE.MeshPhysicalMaterial({
    //   side: THREE.DoubleSide,
    //   color: 0x808080,
    //   metalness: 0,
    //   roughness: 0.1,
    // });
    // const floorMesh = new THREE.Mesh(floorGeometry, material);
    // floorMesh.rotation.x = Math.PI / 2;
    // floorMesh.receiveShadow = true;
    // scene.add(floorMesh);

    // //环境
    // const geometry = new THREE.CylinderGeometry(10, 10, 20, 20);
    // const material1 = new THREE.MeshPhysicalMaterial({
    //   color: 0x6c6c6c,
    //   side: THREE.DoubleSide,
    // });
    // const cylinder = new THREE.Mesh(geometry, material1);
    // scene.add(cylinder);

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
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.maxDistance = 9;
    // controls.minDistance = 1;

    // controls.minPolarAngle = 0;
    // controls.maxPolarAngle = (80 / 360) * 2 * Math.PI;

    // controls.update();

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
  left: 0;
  width: 400px;
  height: 400px;
}
img {
  margin: 10px 20px;
  width: 100px;
  width: 100px;
}
</style>
