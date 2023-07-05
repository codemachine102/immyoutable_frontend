import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
//utils
import { createLights, hideObject, initColor } from './utils';
//types
import { GLTFLoaderProps } from './types';

interface ModelProps extends GLTFLoaderProps {
  cardRef: any;
}

export const Model = React.memo((props: ModelProps) => {
  const { scene, animations, scenes, asset } = props;

  const [clock, setClock] = useState(new THREE.Clock());

  //INIT COLORS START
  const INITIAL_COLOR = new THREE.Color(0x000616);

  const INITIAL_MAP = [{ childID: 'Frame', color: INITIAL_COLOR }];
  const INITIAL_HIDE_MAP = [
    { childID: 'Circle' },
    {
      childID: 'Cylinder002_Cylinder004',
    },
  ];

  useEffect(() => {
    if (scene) {
      //color to black logo background
      for (let object of INITIAL_MAP) {
        initColor(scene, object.childID, object.color);
      }
      //hide all unnecessary objects
      for (let object of INITIAL_HIDE_MAP) {
        hideObject(scene, object.childID);
      }
    }
  }, [scene]);
  //INIT COLORS END

  //ANIMATION START
  let mixer = new THREE.AnimationMixer(scene);

  useEffect(() => {
    if (scene && mixer && animations) {
      //play all animations
      animations.forEach(
        (animation) => void mixer.clipAction(animation).play()
      );
    }
  }, [scene, mixer, animations]);

  useFrame((state, delta) => {
    mixer.update(clock.getDelta() / 2);
  });
  //ANIMATION END

  useEffect(() => {
    if (scene) {
      // createLights(scene);
    }
  }, [scene]);

  return (
    <>
      <primitive
        ref={props.cardRef}
        object={scene}
        castShadow
        receiveShadow
        {...props}
      />
      {/* <directionalLight
        color={new THREE.Color(0xffffff)}
        intensity={0.2}
        position={[-180, 90, 5]}
        castShadow
        target={scene}
      />
      <directionalLight
        color={new THREE.Color(0xffffff)}
        intensity={0.2}
        position={[150, 150, 5]}
        castShadow
        target={scene}
      />
      <directionalLight
        color={new THREE.Color(0xffffff)}
        intensity={0.2}
        position={[-180, -90, 5]}
        castShadow
        target={scene}
      />
      <directionalLight
        color={new THREE.Color(0xffffff)}
        intensity={0.2}
        position={[-120, 210, 5]}
        castShadow
        target={scene}
      />
      <directionalLight
        color={new THREE.Color(0xffffff)}
        intensity={0.2}
        position={[120, 210, 5]}
        castShadow
        target={scene}
      />
      <directionalLight
        color={new THREE.Color(0xffffff)}
        intensity={0.2}
        position={[-120, -210, 5]}
        castShadow
        target={scene}
      />
      <directionalLight
        color={new THREE.Color(0xffffff)}
        intensity={0.2}
        position={[120, -210, 5]}
        castShadow
        target={scene}
      />
      <directionalLight
        color={new THREE.Color(0xffffff)}
        intensity={0.2}
        position={[10, 1, 0]}
        castShadow
        target={scene}
      />
      <hemisphereLight
        color={new THREE.Color(0xffffff)}
        groundColor={new THREE.Color(0xffffff)}
        position={[4.23, 0, -9.06]}
        intensity={0.1}
      /> */}
      {/* <ambientLight color={new THREE.Color(0xffffff)} intensity={0.5} /> */}
    </>
  );
});
