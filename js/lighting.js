import * as T from './three.module.js';
export function lighting(scene){scene.add(new T.HemisphereLight(0xfff8e6,0xb1b6a0,2.3));let sun=new T.DirectionalLight(0xffeed5,2.8);sun.position.set(-4,9,6);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-9,right:9,top:9,bottom:-9});sun.shadow.normalBias=.04;sun.shadow.radius=4;scene.add(sun);}
