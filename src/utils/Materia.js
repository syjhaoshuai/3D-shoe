import * as THREE from "three";
const textureLoader = new THREE.TextureLoader();
const setMaterial = (setMaterialList)=>{
  let obj = {
    Side02:{},
    Tongue:{},
    ShoeLace:{},
    Side01:{}
  }
  setMaterialList.forEach(item => {
    if(item.value[0]){
      item.value[0].value.forEach(t=>{
      const map = textureLoader.load(t.map);
      map.flipY = false;
    
      let normalMap
      if(t.normalMap){
        normalMap = textureLoader.load(t.normalMap);
        normalMap.flipY = false;
      }
    
      const mesh = new THREE.MeshStandardMaterial({
        map,
        normalMap,
        // roughness:0.3,
      //  metalness : 0
      });

       let name = t.type[1]
        obj[t.type[0]][name]=mesh
      })
    }
  });
  return obj

}
export default setMaterial