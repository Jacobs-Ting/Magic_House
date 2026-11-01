import {person,mesh} from './models.js';
import {WITCHES} from './config.js';
export class WitchController{
 constructor(scene){this.witches={};this.selected=null;for(let [id,cfg] of Object.entries(WITCHES)){let p=person(cfg.color,id==='tarot'?0xbca4d3:0x997356,true);p.group.position.set(cfg.x,.53,-2.28);p.group.userData.booth=id;scene.add(p.group);this.witches[id]=p;mesh(p.group,'box',id==='tarot'?0x77618d:0x748362,[0,.54,.41],[.38,.065,.27]);}}
 welcome(id){this.selected=id;this.waveUntil=performance.now()/1000+3;}
 update(t,simple){for(let [id,p] of Object.entries(this.witches)){let wave=this.selected===id&&t<this.waveUntil;let phase=t+(id==='tarot'?0:3);p.head.rotation.y=simple?0:Math.sin(phase*.5)*.12;p.head.rotation.z=simple?0:Math.sin(phase*.8)*.035;p.arms[1].rotation.z=wave?-1.5+Math.sin(t*10)*.25:Math.sin(phase*1.4)*.1;p.arms[0].rotation.x=simple?0:Math.sin(phase*.9)*.15;for(let eye of p.eyes)eye.scale.y=(phase%5.7<.12)?.005:.044;}}
}
