
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  Side01,
  Side02,
  ShoeLace,
  Tongue,
  Inner,
  Insole,
  decalMaterial,
  setMaterialFnc,
  setMap
} from "./texture";
import method from './method.js'
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {DecalGeometry} from 'three/addons/geometries/DecalGeometry.js';
import GUI from "lil-gui";
const TWEEN = require('@tweenjs/tween.js')
const CreateShow = function ({canvas,loading,Width,Height,isMobile}){
  const guiobj = {
    leftColor: "#ffffff",
    rightColor: "#ffffff",
    laceColor: "#ffffff",
    frontColor: "#ffffff",
    myNumber: 1
  };


  var gltfs
  var activeMash="Side02"
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#000000");
  // 2创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    Width / Height,
    0.1,
    1000
  );

  camera.position.set(-1.0196908942122942, 4.155478018875577,  -4.981421579096775);
  scene.add(camera);
  const manager = new THREE.LoadingManager();
  manager.onProgress = function (item, loaded, total) {
      if(loaded===total){
        loading()
      }
      
  };
  

  const loader = new GLTFLoader(manager);

  const guiDOM = document.getElementById('gui-container');
  const gui = new GUI({ domElement: guiDOM});
  guiDOM.addEventListener('click', (event) => {
    gui.toggle();
    event.stopPropagation();
  });
  
  document.body.appendChild(gui.domElement);
  gui.add(guiobj,'myNumber',1,20).name('角度').onChange((value)=>{
   if(id){
    shoot({type:'rotate',value})
   }
  }) 
   gui.add(guiobj,'myNumber',0,3).name('大小').onChange((value)=>{
    if(id){
     shoot({type:'size',value})
    }
   })
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

       
        } else if (obj.name === "Side02") {
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
          gui
            .addColor(guiobj, "frontColor")
            .name("前面")
            .onChange((value) => {
              obj.material.color.set(value);
            });
     
        } else if (obj.name === "Inner") {
          obj.material = Inner;
        } else if (obj.name === "Insole") {
          obj.material = Insole;
        }else if(obj.name==='RoundLable'){
          obj.position.set(-0.02,0,0,)
        }
      });
      gltf.scene.rotation.y = -1.7;
      gltf.scene.position.x=-0.5
      gltf.scene.position.y=-1.3
      gltfs=gltf.scene
      scene.add(gltfs)
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
 function Directional(){
  const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
  light1.position.set(0, 0, 5);

  const light2 = new THREE.DirectionalLight(0xffffff, 0.7);
  light2.position.set(0, 0, -5);

  const light3 = new THREE.DirectionalLight(0xffffff, 0.5);
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

 
 }
 Directional()


 //坐标轴
//  const axesHelper = new THREE.AxesHelper(5);
//   scene.add(axesHelper);
 const renderer = new THREE.WebGLRenderer({ canvas });
 //设置渲染的尺寸大小
 renderer.setSize(Width, Height);

 
 //轨道控制器
 const controls = new OrbitControls(camera, renderer.domElement);
 controls.maxDistance = 8;
 controls.minDistance = 1;

 // controls.minPolarAngle = 0;
 // controls.maxPolarAngle = (80 / 360) * 2 * Math.PI;
 controls.update();

 //使用渲染器 ，通过相机将场景渲染进来
 function render(time) {

  


  TWEEN.update(time)
   renderer.render(scene, camera);
   controls.update();
   //   渲染下一帧的时候就会调用render函数
   requestAnimationFrame(render);
 }

 render();
 window.addEventListener("resize", function () {
  // let Height = window.innerHeight
  if(isMobile==='Mobile'){
    Height=window.innerHeight/2
  }
  Width=window.innerWidth
   // camera
   camera.aspect = Width / Height;
   camera.updateProjectionMatrix();

   // renderer
   renderer.setSize(Width, Height);
 });





 let mesh;
 let raycaster;
 let chartletMaterial=decalMaterial
 let line;
 let myMesh
 let paramsList = []
 let id
 let isMove = false  // 滑动鼠标并不会添加
 let isCreateImg = true

 const intersection = {
   intersects: false,
   point: new THREE.Vector3(),
   normal: new THREE.Vector3()
 };
 //获取鼠标在模型上的三维向量
 function getPosition(x, y) {

   const mouse = new THREE.Vector2();
   mouse.x = (x / Width) * 2 - 1;
   mouse.y = -(y / Height) * 2 + 1;
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
   mouse.x = (x / Width) * 2 - 1;
   mouse.y = - (y / Height) * 2 + 1;

   // 通过相机和鼠标点击位置计算出射线
   raycaster.setFromCamera(mouse, camera);

   // 获取射线和模型相交的部分
   const intersects = raycaster.intersectObjects(decals, true);

   if (intersects.length > 0) {
     intersection.intersects = false
     id = intersects[0].object.id
       myMesh = scene.children.find(item => item.id === id)
      
     isCreateImg=false
   }else{
    id=undefined
    isCreateImg=true
   }
 }
 const mouse = new THREE.Vector2();
 const intersects = [];


 const decals = [];
 let mouseHelper;
 const position = new THREE.Vector3();
 let orientation = new THREE.Euler();
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
   line.visible = false;
   scene.add(line);
   raycaster = new THREE.Raycaster();
   mouseHelper = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 10), new THREE.MeshNormalMaterial());
   mouseHelper.visible = false;
   scene.add(mouseHelper);

  
  //  controls.addEventListener('change', function () {
  //  	moved = true;
  //  });

  let mouseDown = false;  //拖拽
   canvas.addEventListener('pointerdown', function (event) {
    mesh = gltfs.getObjectByName(activeMash);
    findMash(event.clientX, event.clientY)
    mouseDown=true
    isMove=true
  });


   window.addEventListener('pointermove', function (event) {

     if (event.isPrimary&&mouseDown&&id) {
       checkIntersection(event.clientX, event.clientY);
       shoot({type:'position'})
     }
     isMove=false
   } );   
   window.addEventListener('pointerup', function (event) {
    controls.enabled = true;
    mouseDown=false
      let x = event.clientX 
      let y = event.clientY
      checkIntersection(x,y);
     
      if (intersection.intersects&&isMove&&isCreateImg){
         shoot()
      }
      
    

  });

   function checkIntersection(x, y) {
    if(!gltfs)return 
    if (mesh === undefined) return;  
     mouse.x = (x / Width) * 2 - 1;
     mouse.y = - (y / Height) * 2 + 1;
     raycaster.setFromCamera(mouse, camera);
     raycaster.intersectObject(mesh, false, intersects);
     if (intersects.length > 0) {

        controls.enabled = false;

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
 
 const copy = (obj)=>{

  return JSON.parse(JSON.stringify(obj))
 }
 function shoot(move) {
 
   //三维向量的对象
   position.copy(intersection.point);
   //描述物体的旋转
   let material
   let res = scene.children.findIndex(item=>item.id===id)
   let index =  decals.findIndex(item=>item.id===id)
   let paramsindex = paramsList.findIndex(item=>item.id===id)
 
   if(paramsindex!==-1){
    orientation=  method.deepCopy(paramsList[paramsindex].orientation) 
    let setSize = paramsList[paramsindex].size
    size.set(setSize.x,setSize.y,setSize.z)
    material=paramsList[paramsindex].material
    
   } else{
    orientation=new THREE.Euler();
    orientation.copy(mouseHelper.rotation);
    size.set(1, 1, 1);
    material=chartletMaterial.clone();
   }
   
   if(res!==-1&&move&&index!==-1){
    scene.children.splice(res,1)
    decals.splice(index,1)
    
    if(move.type==='rotate'){
      orientation.z=move.value* Math.PI
    }
    if(move.type==='position'){
      // orientation.z=paramsList[paramsindex].orientation.z
    }
    if(move.type==='size'){
      size.set(move.value, move.value, move.value);
    }
    
  
    if(id){
      mesh.dele=true
     }
     
   }
   
   mesh.renderOrder = 0.1
   scene.children=scene.children.filter(item=>!item.dele)
   let m  = new THREE.Mesh(new DecalGeometry(mesh, position, orientation, size), material,);

   paramsList.push({id: m.id, orientation: method.deepCopy(orientation), size:method.deepCopy(size),material})
   if(paramsindex!==-1){
    paramsList.splice(paramsindex,1)
   }
   if(move){
    id=m.id
   }
  
   decals.push(m);
   scene.add(m);

 }

 controls.addEventListener('change',()=>{
  const camera = controls.object;
  // console.log('camera position:', camera.position);
  // console.log('camera direction:', camera.getWorldDirection(new THREE.Vector3()));

 })


 function animateCamera(startPosition, endPositions, duration) {
  const tweens = [];

  // 创建 Tween 对象，将相机依次移动到每个点位
  for (let i = 0; i < endPositions.length; i++) {
    const tween = new TWEEN.Tween(startPosition)
      .to(endPositions[i], duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate((p) => {
        camera.position.copy(p);
      });

    tweens.push(tween);
  }

  // 将所有的 Tween 对象进行链接
  for (let i = 0; i < tweens.length - 1; i++) {
    tweens[i].chain(tweens[i + 1]);
  }

  // 开始执行第一个 Tween 对象
  tweens[0].start();
}


this.Rotate = (value)=>{
  let {position,rotation}=value.rotate

    const startPosition = controls.object.position.clone(); 
    animateCamera(
      startPosition , // 初始位置的副本
      position, // 终点位置
      1500 ,// 动画持续时间为 3 秒
    )

  activeMash=value.type
  
}

//设置贴图
const setChartlet = (value)=>{
  let setChartle = setMap(value)
  chartletMaterial=setChartle
}

this.setTextures = (value)=>{

    if(value.material){
      mesh = gltfs.getObjectByName(activeMash);
      mesh.material=value.material
    }else{
      setChartlet(value)
    }

}
this.setText=(text,color)=>{
  let textImg = method.img(text,color)
  let value = {
    url:textImg
  }
  setChartlet(value)
}

}

export default CreateShow