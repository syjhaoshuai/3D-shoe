import * as THREE from "three";


const textureLoader = new THREE.TextureLoader();
//Side01
const Side01Texture = textureLoader.load(
  "./Canvas/Canvas/Side01_Diffuse02.png"
);
Side01Texture.flipY = false;
const Side01NormalMap = textureLoader.load(
  "./Canvas/Canvas/Side01_Diffuse02.png"
);
Side01NormalMap.flipY = false;
export const Side01 = new THREE.MeshStandardMaterial({
  map: Side01Texture,
  normalMap: Side01NormalMap,
});

//Side02
const Side02Texture = textureLoader.load(
  "./Canvas/Canvas/Side02_Diffuse02.png"
);
Side02Texture.flipY = false;
const Side02NormalMap = textureLoader.load(
  "./Canvas/Canvas/Side02_Diffuse02.png"
);
Side02NormalMap.flipY = false;
export const Side02 = new THREE.MeshStandardMaterial({
  map: Side02Texture,
  normalMap: Side02NormalMap,
});

//ShoeLace
const ShoeLaceTexture = textureLoader.load(
  "./Canvas/Canvas/ShoeLace_Diffuse02.png"
);
ShoeLaceTexture.flipY = false;
const ShoeLaceNormalMap = textureLoader.load(
  "./Canvas/Canvas/ShoeLace_Normal.png"
);
ShoeLaceNormalMap.flipY = false;
export const ShoeLace = new THREE.MeshStandardMaterial({
  map: ShoeLaceTexture,
  normalMap: ShoeLaceNormalMap,

});

//Tongue
const TongueTexture = textureLoader.load(
  "./Canvas/Canvas/Tongue_Heel_Diffuse02a.png"
);
TongueTexture.flipY = false;
const TongueNormalMap = textureLoader.load(
  "./Canvas/Canvas/Tongue_Heel_Normal.png"
);
TongueNormalMap.flipY = false;
export const Tongue = new THREE.MeshStandardMaterial({
  map: TongueTexture,
  normalMap: TongueNormalMap,
  side: THREE.DoubleSide,
  roughness: 1,
});

//Inner
const InnerTexture = textureLoader.load(
  "./Canvas/Canvas/Inner_Diffuse02.png"
);
InnerTexture.flipY = false;
const InnerNormalMap = textureLoader.load(
  "./Canvas/Canvas/Inner_Normal.png"
);
InnerNormalMap.flipY = false;

export const Inner = new THREE.MeshStandardMaterial({
  map: InnerTexture,
  normalMap: InnerNormalMap

});



//Insole
const InsoleTexture = textureLoader.load("./Canvas/Canvas/C70_Insole.png");
InsoleTexture.flipY = false;

export const Insole = new THREE.MeshStandardMaterial({
  map: InsoleTexture,
  // side: THREE.DoubleSide,
  // roughness: 1,
});


//贴图
const decalDiffuse = textureLoader.load('./c6c7d70ad791c100241315636c819b1.png');
decalDiffuse.colorSpace = THREE.SRGBColorSpace;

export const decalMaterial = new THREE.MeshPhongMaterial({
  map: decalDiffuse,
  normalScale: new THREE.Vector2(1, 1),
  shininess: 30,
  transparent: true,
  depthTest: true,
  depthWrite: false,
  polygonOffset: true,
  polygonOffsetFactor: - 4,
  // wireframe: false
});


export const setMap = (value)=>{

  const map = textureLoader.load(value.url);
  map.colorSpace = THREE.SRGBColorSpace;

 const decalMaterial = new THREE.MeshPhongMaterial({
  map,
  normalScale: new THREE.Vector2(1, 1),
  shininess: 30,
  transparent: true,
  depthTest: true,
  depthWrite: false,
  polygonOffset: true,
  polygonOffsetFactor: - 4,
  wireframe: false
});

return decalMaterial
}
