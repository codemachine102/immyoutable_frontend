import { AnimationClip, Group, Material, Object3D } from 'three';

export interface GLTFLoaderProps {
  scene: Group;
  animations: AnimationClip[];
  scenes: Group[];
  asset: {
    copyright?: string | undefined;
    generator?: string | undefined;
    version?: string | undefined;
    minVersion?: string | undefined;
    extensions?: any;
    extras?: any;
  };
}
