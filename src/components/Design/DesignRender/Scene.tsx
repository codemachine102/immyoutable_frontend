import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Html, Stage } from '@react-three/drei';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//utils
import {
  applyColorByName,
  initColor,
  changeLogo,
  checkIfObjExist,
  addTextToCard,
  sceneRemove,
} from './utils';
import { breakSentence, truncate } from '../../../utils';
//context
import { useAuth, useDesign } from '../../../context';
//components
import { Model } from './Model';
import { SpinnerLoader } from '../../SpinnerLoader';

//fonts
import Schw from '../../../assets/fonts/Schw_Regular.json';

interface SceneProps {
  loadedGLB: GLTF;
  loadingError: boolean;
  loadingModel: boolean;
}

export const Scene = React.memo((props: SceneProps) => {
  const design = useDesign();
  const auth = useAuth();
  const { scene, animations, scenes, asset } = props.loadedGLB;
  const cardRef: any = useRef(scene);
  const [loadingLogo, setLoadingLogo] = useState(false);

  //COLOR CHANGE START
  useEffect(() => {
    if (design.activeColor) {
      applyColorByName(
        scene,
        'Card',
        design.activeColor.color
        // design.activeColor.glow
      );
      initColor(scene, 'Line', design.activeColor.color);
    }
  }, [design.activeColor, scene]);
  //COLOR CHANGE END

  //LOGO CHANGE START
  const loader = new GLTFLoader();

  const loadAndChangeLogo = async (scene: any, model: string) => {
    try {
      setLoadingLogo(true);
      loader.load(model, (gltf) => {
        // console.log('gltf', gltf);
        if (gltf.scene) {
          // console.log('gltf.scene', gltf.scene);
          const logoObj = gltf.scene.getObjectByName('main-logo');
          // console.log('gltf.scene logoObj', logoObj);
          changeLogo(scene, logoObj);
          setLoadingLogo(false);
        }
      });
    } catch (e: any) {
      setLoadingLogo(false);
    }
  };

  useEffect(() => {
    if (design.activeLogo?.model) {
      loadAndChangeLogo(scene, design.activeLogo?.model);
    }
  }, [design.activeLogo, scene]);
  //LOGO CHANGE END

  //ADD OR CHANGE TEXT START
  const TEXT_SIZE = 0.05;
  const TEXT_SIZE_SMALLER = TEXT_SIZE * 0.9;

  const addTextToScene = async (
    scene: any,
    textObj: any,
    yAxis: number,
    color: THREE.Color
  ) => {
    const font = new FontLoader().parse(Schw);
    addTextToCard(
      scene,
      'Card',
      {
        ...textObj,
        font: font,
      },
      yAxis,
      color
    );
  };

  const changeTextInScene = async (
    scene: any,
    textObj: any,
    yAxis: number,
    color: THREE.Color
  ) => {
    const object = scene.getObjectByName(textObj.name);

    sceneRemove(scene, object);
    addTextToScene(scene, textObj, yAxis, color);
  };

  const checkTextInScene = async (
    scene: any,
    textObj: any,
    yAxis: number,
    color: THREE.Color
  ) => {
    const res = checkIfObjExist(scene, textObj.name);

    if (res) {
      changeTextInScene(scene, textObj, yAxis, color);
    } else {
      addTextToScene(scene, textObj, yAxis, color);
    }
  };

  const checkAndRemoveText = (scene: any, textObjName: any) => {
    const res = checkIfObjExist(scene, textObjName);
    if (res) {
      const object = scene.getObjectByName(textObjName);
      sceneRemove(scene, object);
    }
  };

  const addBreakLineToText = async (
    scene: any,
    objName: string,
    text: string,
    color: any,
    { yFull, yFirst, ySecond }: any,
    maxLength: number,
    textSize: number
  ) => {
    if (text.length > maxLength) {
      const breakedName = breakSentence(text, maxLength);
      checkAndRemoveText(scene, objName);
      checkTextInScene(
        scene,
        {
          name: `${objName}-first`,
          text: breakedName.first,
          size: textSize,
        },
        yFirst,
        color
      );
      checkTextInScene(
        scene,
        {
          name: `${objName}-second`,
          text: breakedName.second,
          size: TEXT_SIZE,
        },
        ySecond,
        color
      );
    } else {
      checkAndRemoveText(scene, `${objName}-first`);
      checkAndRemoveText(scene, `${objName}-second`);
      checkTextInScene(
        scene,
        {
          name: objName,
          text: text,
          size: TEXT_SIZE,
        },
        yFull,
        color
      );
    }
  };

  const addOrChangeStudentName = async (
    scene: any,
    name: string,
    color: THREE.Color
  ) => {
    const MAX_MAIN_TEXT_LENGTH = 25;
    addBreakLineToText(
      scene,
      'student-name',
      name,
      color,
      {
        yFull: 1.8,
        yFirst: 1.86,
        ySecond: 1.75,
      },
      MAX_MAIN_TEXT_LENGTH,
      TEXT_SIZE
    );
  };

  const addOrChangeUniInfo = async (
    scene: any,
    uniName: string,
    degree: string,
    year: string,
    color: THREE.Color
  ) => {
    const MAX_SUB_TEXT_LENGTH = 30;
    const uniTooLong = uniName.length > MAX_SUB_TEXT_LENGTH;

    const yForText = {
      uniName: {
        full: -0.25,
        first: -0.2,
        second: -0.35,
      },
      degree: !uniTooLong ? -0.4 : -0.5,
      year: !uniTooLong ? -0.55 : -0.65,
    };

    addBreakLineToText(
      scene,
      'student-uniName',
      uniName,
      color,
      {
        yFull: yForText.uniName.full,
        yFirst: yForText.uniName.first,
        ySecond: yForText.uniName.second,
      },
      MAX_SUB_TEXT_LENGTH,
      TEXT_SIZE_SMALLER
    );
    checkTextInScene(
      scene,
      {
        name: 'student-degree',
        text: truncate(degree, MAX_SUB_TEXT_LENGTH),
        size: TEXT_SIZE_SMALLER,
      },
      yForText.degree,
      color
    );
    checkTextInScene(
      scene,
      {
        name: 'student-year',
        text: truncate('Class of ' + year, MAX_SUB_TEXT_LENGTH),
        size: TEXT_SIZE_SMALLER,
      },
      yForText.year,
      color
    );
  };

  useEffect(() => {
    const textColor =
      design.activeColor?.assetTheme.theme === 'dark'
        ? new THREE.Color(0x495566)
        : new THREE.Color(0xdfe4eb);

    const userFirstName = auth.userProfile?.user?.firstName;
    const userLastName = auth.userProfile?.user?.lastName;

    const studentName = auth.userProfile?.student?.name || 'Student Name';

    addOrChangeStudentName(scene, studentName, textColor);

    const uniName = auth.userProfile?.university?.name || 'University Name';
    const degree = !!auth.userProfile?.student?.majors?.length
      ? auth.userProfile?.student?.majors[0]
      : 'Some Major';
    const year = auth.userProfile?.student?.gradYear || 'Year';

    addOrChangeUniInfo(scene, uniName, degree, year, textColor);
  }, [scene, design.activeColor, auth.userProfile]);
  //ADD OR CHANGE TEXT END

  useEffect(() => {
    design.changeActiveScene(scene);
  }, [scene, design.changeActiveScene]);

  return (
    <>
      {props?.loadingError && (
        <Html fullscreen>
          <div className='designRender__loader'>
            <h2 className='designRender__loaderError'>Loading Error</h2>
          </div>
        </Html>
      )}
      {(loadingLogo || props.loadingModel) && !props?.loadingError && (
        <Html fullscreen>
          <div className='designRender__loader'>
            <SpinnerLoader />
          </div>
        </Html>
      )}
      <Stage>
        <mesh rotation={[0, -Math.PI / 2, 0]}>
          <Model
            cardRef={cardRef}
            scene={scene}
            animations={animations}
            scenes={scenes}
            asset={asset}
          />
        </mesh>
      </Stage>
    </>
  );
});
