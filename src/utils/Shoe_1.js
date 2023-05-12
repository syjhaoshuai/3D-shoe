
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  Side01,
  Side02,
  ShoeLace,
  Tongue,
  Inner,
  Insole,
  decalMaterial
} from "./components/texture";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {DecalGeometry} from 'three/addons/geometries/DecalGeometry.js';
import GUI from "lil-gui";
const CreateShow = ({canvas})=>{
  const guiobj = {
    leftColor: "#ffffff",
    rightColor: "#ffffff",
    laceColor: "#ffffff",
    frontColor: "#ffffff",
  };


  var gltfs
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
  const gui = new GUI();
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
      gltf.scene.rotation.y = -1.7;
      gltf.scene.position.y=1
      gltf.scene.scale.set(2,2,2)
      gltfs=gltf.scene
      scene.add(gltfs)
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
 function Directional(){
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
 }
 Directional()
 const renderer = new THREE.WebGLRenderer({ canvas });
 //设置渲染的尺寸大小
 renderer.setSize(window.innerWidth, window.innerHeight);

 
 //轨道控制器
//  const controls = new OrbitControls(camera, renderer.domElement);
 // controls.maxDistance = 9;
 // controls.minDistance = 1;

 // controls.minPolarAngle = 0;
 // controls.maxPolarAngle = (80 / 360) * 2 * Math.PI;
//  controls.update();

 //使用渲染器 ，通过相机将场景渲染进来
 function render() {
   renderer.render(scene, camera);
  //  controls.update();
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





 let mesh;
 let raycaster;
 let line;
 let myMesh
 let paramsList = []
 let id
 let isMove = false  // 滑动鼠标并不会添加
 const intersection = {
   intersects: false,
   point: new THREE.Vector3(),
   normal: new THREE.Vector3()
 };
 //获取鼠标在模型上的三维向量
 function getPosition(x, y) {
   const mouse = new THREE.Vector2();
   mouse.x = (x / window.innerWidth) * 2 - 1;
   mouse.y = -(y / window.innerHeight) * 2 + 1;
   const raycaster = new THREE.Raycaster();
   raycaster.setFromCamera(mouse, camera);

  //  获取射线与mesh的交点
   const intersects = raycaster.intersectObject(mesh, true);

  //  如果鼠标位置在mesh上，则更新mesh的位置
  if (intersects.length > 0) {
    const point = intersects[0].point;
    return point
  } else {
    return
  }
 }

 //检查点击的是哪个mash
 function findMash(x, y) {
   // 创建一个射线投射器
   const raycaster = new THREE.Raycaster();

   // 从鼠标点击位置计算出一个向量
   const mouse = new THREE.Vector2();
   mouse.x = (x / window.innerWidth) * 2 - 1;
   mouse.y = - (y / window.innerHeight) * 2 + 1;

   // 通过相机和鼠标点击位置计算出射线
   raycaster.setFromCamera(mouse, camera);

   // 获取射线和模型相交的部分
   const intersects = raycaster.intersectObjects(decals, true);

   if (intersects.length > 0) {
     intersection.intersects = false
     // 点击了模型的某个部分，获取该部分信息
     // const intersection = intersects[0];
     id = intersects[0].object.id
     myMesh = scene.children.find(item => item.id === id)
   }
 }
 const mouse = new THREE.Vector2();
 const intersects = [];


 const decals = [];
 let mouseHelper;
 const position = new THREE.Vector3();
 const orientation = new THREE.Euler();
 const size = new THREE.Vector3(10, 10, 10);

 const params = {
   minScale: 10,
   maxScale: 20,
   rotate: true,
   clear: function () {



   }
 };

 init();
 function init() {
   const geometry = new THREE.BufferGeometry();
   geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
   line = new THREE.Line(geometry, new THREE.LineBasicMaterial());
   scene.add(line);
   raycaster = new THREE.Raycaster();
   mouseHelper = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 10), new THREE.MeshNormalMaterial());
   mouseHelper.visible = false;
   scene.add(mouseHelper);

   let moved = false;
  //  controls.addEventListener('change', function () {
  //  	moved = true;
  //  });

  let mouseDown = false;  //拖拽
  window.addEventListener('pointerdown', function (event) {
    mesh = gltfs.getObjectByName('Side02');
    console.log(id,'id');
    findMash(event.clientX, event.clientY)
    mouseDown=true
    moved = false;
    isMove=true
  });


   window.addEventListener('pointermove', function (event) {
    
     if (event.isPrimary&&mouseDown) {
       checkIntersection(event.clientX, event.clientY);
       shoot()
     }
     isMove=false
   } );   
   window.addEventListener('pointerup', function (event) {
   
    mouseDown=false
    if (moved === false) {
      let x = event.clientX 
      let y = event.clientY
     
   
      checkIntersection(x,y);
     
      if (intersection.intersects&&isMove){
         shoot()
    
        
        id=undefined
      }
    }

  });

   function checkIntersection(x, y) {
    if(!gltfs)return 
    if (mesh === undefined) return;  
     mouse.x = (x / window.innerWidth) * 2 - 1;
     mouse.y = - (y / window.innerHeight) * 2 + 1;

     raycaster.setFromCamera(mouse, camera);
     raycaster.intersectObject(mesh, false, intersects);

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

   }


 }
 function shoot() {
   //三维向量的对象
   position.copy(intersection.point);
   //描述物体的旋转
   orientation.copy(mouseHelper.rotation);
 
   if (params.rotate) orientation.z = Math.random() * 2 * Math.PI;
   size.set(1, 1, 1);
   const material = decalMaterial.clone();
   material.color.setHex(0xffffff);
 
   if(id){
    mesh.dele=true
    scene.children=scene.children.filter(item=>!item.dele)
   }
    

   let m = new THREE.Mesh(new DecalGeometry(mesh, position, orientation, size), material,);
   paramsList.push({id: m.id, mesh, orientation, size, material})
   
   let res = scene.children.findIndex(item=>item.id===id)
   if(res!==-1&&res){
    scene.children.splice(res,1)
   
   }else{
    decals.push(m);
   }
   id=m.id
   

   console.log(paramsList,'paramsList');
   
 
   scene.add(m);

 }




}
export default CreateShow