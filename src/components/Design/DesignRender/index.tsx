import React, {
  FC,
  HTMLAttributes,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

//styles
import './styles.scss';
//context
import { useDesign } from '../../../context';
//components
import { Scene } from './Scene';
import { SceneDefault } from './SceneDefault';
import { SpinnerLoader } from '../../SpinnerLoader';
import { DesignMint } from '../DesignMint';
//utils
import { handleExport } from './utils';

interface DesignRenderProps extends HTMLAttributes<HTMLDivElement> {
  containerClassName?: string;
}

export const DesignRender: FC<DesignRenderProps> = ({
  className,
  containerClassName,
}) => {
  const design = useDesign();
  const [gltf, setGLTF] = useState<string | null>(null);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [loadingModel, setLoadingModel] = useState<boolean>(false);
  const [loadedGLB, setLoadedGLB] = useState<GLTF | null>(null);
  const [defaultGLB, setDefaultGLB] = useState<GLTF | null>(null);

  const handleClick = useCallback(() => {
    if (design.activeScene) {
      handleExport(design.activeScene);
    }
  }, [design.activeScene]);

  const loadGLTF = (url: string) => {
    try {
      setLoadingModel(true);
      setLoadingError(false);
      const loader = new GLTFLoader();
      loader.load(
        url,
        (gltf) => {
          // console.log('loadGLTF gltf', gltf);
          setLoadedGLB(gltf);
          setLoadingModel(false);
        },
        (progress) => {
          // console.log('loadGLTF progress', progress);
        },
        (error) => {
          console.error('loadGLTF loader error', error);
          setLoadingError(true);
          setLoadingModel(false);
          // loadGLTF('/card-wo-logo.glb');
        }
      );
    } catch (error) {
      console.error('loadGLTF error', error);
      setLoadingError(true);
      setLoadingModel(false);
    }
  };

  useEffect(() => {
    if (
      design.mintedCards &&
      !!design.mintedCards.length &&
      design.mintedCards[0]?.assetUrl &&
      !loadingModel &&
      !loadingError
    ) {
      setGLTF(design.mintedCards[0]?.assetUrl);
      loadGLTF(`${design.mintedCards[0]?.assetUrl}`);
    }
  }, [
    design.mintedCards,
    design.mintedCards?.length,
    loadingModel,
    loadingError,
  ]);

  const loadDefaultGLTF = () => {
    try {
      const loader = new GLTFLoader();
      loader.load(
        '/card-wo-logo.glb',
        (gltf) => {
          // console.log('loadDefaultGLTF gltf', gltf);
          setDefaultGLB(gltf);
        },
        (progress) => {
          // console.log('loadDefaultGLTF progress', progress);
        },
        (error) => {
          console.error('loadDefaultGLTF loader error', error);
        }
      );
    } catch (error) {
      console.error('loadDefaultGLTF error', error);
    }
  };

  useEffect(() => {
    loadDefaultGLTF();
  }, []);

  const glb = useMemo(() => loadedGLB || defaultGLB, [defaultGLB, loadedGLB]);

  useEffect(() => {
    if (design) {
      design.getMintedStatus();
    }
  }, []);

  return (
    <div className={cn('designRender', className)}>
      <div className={cn('designRender__container', containerClassName)}>
        <Suspense fallback={<SpinnerLoader />}>
          <Canvas
            camera={{
              fov: 35,
              near: 0.1,
              far: 1000,
              aspect: 420 / 640,
              zoom: 1.5,
              position: [0, 1, 5],
            }}
            className='designRender__canvas'
          >
            {glb && (
              <>
                {gltf ? (
                  <SceneDefault
                    loadedGLB={glb}
                    loadingError={loadingError}
                    loadingModel={loadingModel}
                    mintedStatus={design.mintedStatus}
                  />
                ) : (
                  <Scene
                    loadedGLB={glb}
                    loadingError={loadingError}
                    loadingModel={loadingModel}
                  />
                )}
              </>
            )}
          </Canvas>
        </Suspense>
      </div>
      {!design.mintedStatusLoading &&
        !isNaN(design?.mintedStatus) &&
        design.mintedStatus <= 0 && <DesignMint onSuccess={handleClick} />}
    </div>
  );
};
