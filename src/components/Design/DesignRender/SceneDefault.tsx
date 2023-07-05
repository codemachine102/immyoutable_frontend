import React, { useRef, useEffect } from 'react';
import { Html, Stage } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

//context
import { useDesign } from '../../../context';
//components
import { Model } from './Model';
import { SpinnerLoader } from '../../SpinnerLoader';

interface SceneProps {
  loadedGLB: GLTF;
  loadingError: boolean;
  loadingModel: boolean;
  mintedStatus: number;
}

export const SceneDefault = React.memo((props: SceneProps) => {
  const design = useDesign();
  const { scene, animations, scenes, asset } = props.loadedGLB;

  const cardRef: any = useRef(scene);

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
      {props.loadingModel && !props?.loadingError && (
        <Html fullscreen>
          <div className='designRender__loader'>
            <SpinnerLoader />
          </div>
        </Html>
      )}
      {!isNaN(props?.mintedStatus) &&
        props?.mintedStatus > 0 &&
        !props.loadingModel &&
        !props?.loadingError && (
          <Html fullscreen>
            <div className='designRender__loader'>
              <h2 className='designRender__loaderProcessing'>
                Minting Processing
              </h2>
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
