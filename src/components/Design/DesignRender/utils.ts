import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

//utils
import { isArray, isFunction, isObject, isPosNumber } from '../../../utils';

export function applyColorByName(
  scene: any,
  name: any,
  color: any,
  glowColor?: any
) {
  const object = scene.getObjectByName(name);

  if (!isObject(object)) return;

  for (const child of object.children) {
    if (child.isMesh && child.material && child.name === 'Cube001') {
      child.material.color = new THREE.Color(color);
      break;
    }
  }

  const clr = object.children[0].material.color.toArray();
  const material = object.children[0].material;
  const glow = object.children[1].material;

  material.emissive.setRGB(...clr.map((v: number) => v / 5));
  glow.emissive.setRGB(...clr.map((v: number) => v * 2));
  glow.emissiveIntensity = 3;

  // object.traverse((child: any) => {
  //   if (child.isMesh && child.material && checkChildName(child.name) && ) {
  //     child.material.color = new THREE.Color(color);
  //     const clr = new THREE.Color('red').toArray();
  //     //Change emissive color (Glow)
  //     console.log('child', child);
  //     if (child.material.emissive && child.name === 'Cube001_1') {
  //       console.log('child', child.material, clr);
  //       // child.emissive.setRGB(...clr.map((v) => v * 2));
  //       // if (glowColor) child.material.emissive = new THREE.Color(glowColor);
  //       child.material.emissive.setRGB(...clr.map((v) => v * 2));
  //       console.log('child.material.emissive', child.material.emissive);
  //     } else {
  //       // child.material.emissive = new THREE.Color('red');
  //       // child.emissive.setRGB(...clr.map((v) => v / 5));
  //     }
  //   }
  // });
}

const checkChildName = (name: string) => {
  return (
    name !== 'student-name' &&
    name !== 'student-uniName' &&
    name !== 'student-degree' &&
    name !== 'student-year'
  );
};

export const initColor = (parent: any, type: any, color: any) => {
  parent.traverse((o: any) => {
    if (o.isMesh && o.name === type) {
      // console.log('isMeSh initColor', o.name, o.type, o);
      const mtl = new THREE.MeshStandardMaterial({
        ...o.material,
        color: color,
      });
      o.material = mtl;
    }
  });
};

export const initGlow = (
  parent: any,
  type: any,
  color: any,
  glowColor: any
) => {
  parent.traverse((o: any) => {
    if (o.isMesh && o.name.includes(type)) {
      // console.log('isMeSh initGlow', o.name, o.type, o);
      const mtl = new THREE.MeshStandardMaterial({
        ...o.material,
        color: new THREE.Color(color),
        emissive: new THREE.Color(glowColor),
      });
      o.material = mtl;
    }
  });
};

export const hideObject = (parent: any, type: any) => {
  parent.traverse((o: any) => {
    if (o.isMesh && o.name.includes(type)) {
      // console.log('isMeSh hideObject', o.name, o.type, o);
      const mtl = new THREE.MeshStandardMaterial({
        ...o.material,
        colorWrite: false,
      });
      o.material = mtl;
    }
  });
};

export const addText = (scene: any, text: string, font: any) => {
  const geometry = new TextGeometry(text, {
    font: font,
    size: 0.06,
    height: 0.01,
    curveSegments: 12,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1,
  });
  geometry.name = 'textGeom';

  const material = new THREE.MeshBasicMaterial({
    color: 0xf3ffe2,
  });
  material.name = 'textMat';

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'textMesh';
  mesh.position.set(0.4, 0.5, 0.7);

  mesh.rotation.set(0, Math.PI / 2 + Math.PI * 4, 0);

  const mTo = scene.getObjectByName('inner-frame');

  // mTo?.copy(mesh);
};

export async function createTextMesh(
  objText: any = {},
  objMesh: any = {},
  color: THREE.Color
) {
  // console.log('createTextMesh', {
  //   objText,
  //   objMesh,
  //   color,
  // });

  try {
    const name = objText.name || `auto-name-${Math.floor(Date.now() / 1000)}`;

    const geometry = new TextGeometry(objText.text, {
      font: objText.font,
      size: objText.size || 0.1,
      height: objText.height || 0.1,
      curveSegments: objText.curveSegments || 12,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    });
    geometry.name = `${name}-geom`;

    geometry.computeBoundingBox();
    geometry.center();
    // const center = geometry?.boundingBox?.getCenter(new Vector3());

    const material = new THREE.MeshBasicMaterial({
      color: color,
    });
    material.name = `${name}-material`;

    // const material = new THREE.MeshFaceMaterial([
    //    new THREE.MeshPhongMaterial({
    //       color: 0xff22cc,
    //       flatShading: true,
    //    }), // front
    //    new THREE.MeshPhongMaterial({
    //       color: 0xffcc22
    //    }), // side
    // ])

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;

    //@ts-ignore
    if (isArray(objMesh.position)) mesh.position.set(...objMesh.position);

    //@ts-ignore
    if (isArray(objMesh.rotation)) mesh.rotation.set(...objMesh.rotation);

    if (isPosNumber(objMesh.scale)) mesh.scale.multiplyScalar(objMesh.scale);

    return { success: true, data: mesh };
  } catch (e) {
    return { success: false };
  }
}

export const addTextToCard = async (
  scene: any,
  obj: any,
  textObj: any,
  yAxis: number,
  color: THREE.Color
) => {
  const res = await createTextMesh(
    {
      ...textObj,
      height: 0.1,
    },
    {},
    color
  );

  if (res.success && res.data) {
    res.data.position.set(1, yAxis, 0);
    res.data.rotation.set(0, Math.PI / 2 + Math.PI * 4, 0);
    scene.getObjectByName(obj).add(res.data);
  }
};

export const changeTextColor = (scene: any, name: any, color: THREE.Color) => {
  // console.log('changeTextColor', {
  //   name,
  //   color,
  // });
  const object = scene.getObjectByName(name);

  if (!isObject(object)) return;

  object.traverse((child: any) => {
    if (child.isMesh && child.material && child.name === name) {
      child.material.color = color;
    }
  });

  // console.log('changeTextColor object', object);
};

export function handleExport(scene: any) {
  const exporter = new GLTFExporter();

  // Get all animation clips from the scene
  const animations = scene.animations;

  // Stop the animation mixer to ensure that all animations are exported correctly
  // let mixer = new THREE.AnimationMixer(scene);
  // console.log('handleExport mixer', mixer);
  // mixer.stopAllAction();

  // const logoContainer = scene.getObjectByName('Empty_(Animation)002');
  // let mixer2 = new THREE.AnimationMixer(logoContainer);
  // console.log('handleExport mixer2', mixer2);
  // mixer2.stopAllAction();

  const options = {
    binary: false, // Set to true to export as a binary file
    trs: false, // Set to true to include transformations (position, rotation, scale)
    onlyVisible: true, // Set to true to export only visible objects
    // includeCustomExtensions: true, // Set to true to include custom extensions
    // animations: animations, // Pass the animation clips to the exporter

    truncateDrawRange: false,
    maxTextureSize: 4096 * 2,
  };

  exporter.parse(
    scene,
    (gltf) => {
      // gltf is an object containing the exported scene data
      // const jsonString = JSON.stringify(gltf);
      // You can save the JSON data to a file or send it to a server
      // console.log(jsonString);
      // gltf is an object containing the exported scene data
      // console.log('gltf', gltf);
      const jsonString = JSON.stringify(gltf, null, 2);
      // const jsonString = JSON.stringify(gltf);
      // console.log('jsonString', jsonString);
      const blob = new Blob([jsonString], { type: 'application/json' });
      // console.log('blob', blob);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'scene.gltf';
      link.click();
      URL.revokeObjectURL(url);

      // const downloadRes = download({
      //   data: jsonString,
      //   encoding: 'charset=utf-8',
      //   type: 'application/json',
      //   name: 'scene.gltf',
      // });
    },
    (error) => {
      console.log('handleExportClick error', error);
    },
    options
  );
}

export const changeLogo = (scene: any, newLogo: any) => {
  //Remove old logo
  deleteLogo(scene);
  //Add new logo
  addLogo(scene, newLogo);
};

export const addLogo = (scene: any, newLogo: any) => {
  try {
    //Add emissive
    newLogo?.material?.emissive?.setRGB(0.05, 0.05, 0.05);
    //Get logo container object
    const logoContainer = scene.getObjectByName('Empty_(Animation)002');
    //Add new logo
    logoContainer.add(newLogo);
  } catch (e: any) {
    console.log('addLogo error', e);
  }
};

export const deleteLogo = (scene: any) => {
  try {
    const check = checkIfObjExist(scene, 'main-logo');
    if (!check) return;
    //Get logo container object
    const logoContainer = scene.getObjectByName('Empty_(Animation)002');
    //Get old logo object
    const oldLogo = scene.getObjectByName('main-logo');
    //Remove old logo
    logoContainer.remove(oldLogo);
  } catch (e: any) {
    console.log('deleteLogo error', e);
  }
};

function download(params: any) {
  try {
    const data = params.data;
    const name = params.name || 'download-1.json';
    const type = params.type || 'application/json';
    const encoding = params.encoding || 'charset=utf-8';
    const workElement = document.createElement('a');
    if ('download' in workElement) {
      workElement.href = `data:${type};${encoding},${escape(data)}`;
      workElement.setAttribute('download', name);
      document.body.appendChild(workElement);
      const eventMouse = document.createEvent('MouseEvents');
      eventMouse.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      workElement.dispatchEvent(eventMouse);
      document.body.removeChild(workElement);
      // return this.res(true, 'success');
    }

    // return this.res(false, 'Current does not support download-on-element');
  } catch (e: any) {
    console.log(` #download: ${e.message} `);
    // return this.res(false, 'Filed to initiate download file');
  }
}

export const checkIfObjExist = (scene: any, name: string) => {
  const object = scene.getObjectByName(name);

  if (!isObject(object)) return false;
  return true;
};

export function sceneRemove(scene: any, mObj: any, isInitial = true) {
  if (!isObject(mObj)) return console.warn(`#mObj: is not valid object`);

  if (mObj.material && isFunction(mObj.material.dispose)) {
    mObj.material.visible = false;
    mObj.material.dispose();
  }

  if (mObj.geometry && isFunction(mObj.geometry.dispose)) {
    mObj.geometry.visible = false;
    mObj.geometry.dispose();
  }

  for (const child of mObj.children || []) sceneRemove(child, false);

  if (isInitial) {
    mObj.visible = false;

    if (isFunction(mObj.dispose)) mObj.dispose();

    mObj.parent.remove(mObj);
    scene.remove(mObj);
  }
}

export function createLights({
  scene,
  color = '#ffFFff',
  target = false,
  castShadow = false,
}: any = {}) {
  // source: 1
  let light = new THREE.DirectionalLight(color, 0.2);
  light.name = '_dir_light_';

  // this.#light.position.set(150,-50,10);
  // this.#light.position.set(4.23, 0, -9.06);
  light.position.set(10, 1, 0);
  if (castShadow) light.castShadow = true;
  // if( target ) light.target = target; // this.#light.lookAt(target);

  // this.#light.intensity = 1;
  scene.add(light);
  // this.createDevMesh(`${this.#light.name}-box`, 0xff0000, 0.25, this.#light );

  // source: 2
  const mHemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
  mHemisphereLight.name = '_hemi_light_';
  mHemisphereLight.position.set(4.23, 0, -9.06);
  scene.add(mHemisphereLight);
  // this.createDevMesh( `${mHemisphereLight.name}-box`, 0xff0000, 0.25, mHemisphereLight );

  // source: 3
  const mAmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
  mAmbientLight.name = '_ambi_light_';
  scene.add(mAmbientLight);
  return light;
}
