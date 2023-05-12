<template>
  <div>
    <div class="text">
      <div class="top"></div>
      <div @click="addimg">
        <img src="./assets/iTab-cGMoMFlBcEk.webp" alt="" />
        <img src="./assets/iTab-FHiJZ0lgBaE.jpg" alt="" />
        <img src="./assets/iTab-R7aGzmbwACQ.webp" alt="" />
        <img src="./assets/iTab-zJF1lRdUdAw.jpg" alt="" />
      </div>
    </div>
    <canvas ref="canvas" />
  </div>
</template>

<script >
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  Side01,
  Side02,
  ShoeLace,
  Tongue,
  Inner,
  Insole,
} from "./components/texture";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { fabric } from "fabric";
import GUI from "lil-gui";
export default {
  name: "App",
  data() {
    return {
      canvas1: {},
      gltfres: {},
    };
  },
  methods: {
    addimg(e) {},

    DirectionalLight(scene) {
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
    },
    checkIntersection(x, y) {
      if (this.gltfres === undefined) return;
      const mouse = new THREE.Vector2();
      mouse.x = (x / window.innerWidth) * 2 - 1;
      mouse.y = -(y / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      raycaster.intersectObject(this.gltfres, false, intersects);

      if (intersects.length > 0) {
        const p = intersects[0].point;
        mouseHelper.position.copy(p);
        intersection.point.copy(p);

        const n = intersects[0].face.normal.clone();
        n.transformDirection(mesh.matrixWorld);
        n.multiplyScalar(10);
        n.add(intersects[0].point);

        intersection.normal.copy(intersects[0].face.normal);
        mouseHelper.lookAt(n);

        const positions = line.geometry.attributes.position;
        positions.setXYZ(0, p.x, p.y, p.z);
        positions.setXYZ(1, n.x, n.y, n.z);
        positions.needsUpdate = true;

        intersection.intersects = true;

        intersects.length = 0;
      } else {
        intersection.intersects = false;
      }
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
    camera.position.set(0, 5, 10);
    scene.add(camera);
    const loader = new GLTFLoader();
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

    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);

    let line = new THREE.Line(geometry, new THREE.LineBasicMaterial());
    scene.add(line);

    let raycaster = new THREE.Raycaster();

    let mouseHelper = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 10),
      new THREE.MeshNormalMaterial()
    );
    mouseHelper.visible = false;
    scene.add(mouseHelper);

    loader.load(
      "./Chuck70_H_LowPoly(1).glb",
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

            obj.material = Side01;
          } else if (obj.name === "Side02") {
            gui
              .addColor(guiobj, "leftColor")
              .name("左边")
              .onChange((value) => {
                obj.material.color.set(value);
              });
            obj.material = Side02;
          } else if (obj.name === "ShoeLace") {
            // 带
            gui
              .addColor(guiobj, "laceColor")
              .name("鞋带")
              .onChange((value) => {
                obj.material.color.set(value);
              });

            obj.material = ShoeLace;
          } else if (obj.name === "Tongue") {
            gui
              .addColor(guiobj, "frontColor")
              .name("前面")
              .onChange((value) => {
                obj.material.color.set(value);
              });
            obj.material = Tongue;
          } else if (obj.name === "Inner") {
            obj.material = Inner;
          } else if (obj.name === "Insole") {
            obj.material = Insole;
          }
        });
        gltf.scene.rotation.y = -1.8;
        gltres(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    //灯光
    this.DirectionalLight(scene);
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

    //使用渲染器 ，通过相机将场景渲染进来
    function render() {
      renderer.render(scene, camera);

      //   渲染下一帧的时候就会调用render函数
    }
    renderer.setAnimationLoop(render);

    let mouseDown = false;
    let mouseX = 0,
      mouseY = 0;

    window.addEventListener("pointerdown", function (event) {
      mouseDown = true;
    });
    //滑动
    window.addEventListener("pointermove", function (event) {
      if (mouseDown) {
        console.log(2222);
      }
    });

    window.addEventListener("pointerup", function (event) {
      mouseDown = false;
    });
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
