import {SceneManager} from './scene.js';
import {CameraController} from './camera.js';
import {WitchController} from './witches.js';
import {NPCManager} from './customers.js';
import {InteractionManager} from './interactions.js';
import {UIManager} from './ui.js';
import {AmbientEvents} from './animations.js';
import {WITCHES} from './config.js';
const container=document.querySelector('#world');
try{
const world=new SceneManager(container),canvas=world.renderer.domElement,camera=new CameraController(container,canvas),witches=new WitchController(world.scene),npcs=new NPCManager(world.scene),events=new AmbientEvents(camera.camera,witches.witches,container);let simple=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ui=new UIManager(select,()=>{camera.reset();witches.selected=null});function select(id){if(ui.selected)return;camera.focus(WITCHES[id].x);witches.welcome(id);ui.open(id);}
new InteractionManager(canvas,camera.camera,[...world.targets,...Object.values(witches.witches).map(p=>p.group)],select,()=>{ui.toast('喵～今天也要好好休息喔。 🐾');world.cat.rotation.y+=.3});
document.querySelector('#reset').onclick=()=>{if(ui.dialog.open)ui.dialog.close();camera.reset()};const motion=document.querySelector('#motion');function quality(){motion.setAttribute('aria-pressed',simple);world.renderer.setPixelRatio(simple?1:Math.min(devicePixelRatio,1.7));world.renderer.shadowMap.enabled=!simple;world.particles.visible=!simple;}motion.onclick=()=>{simple=!simple;quality()};quality();
function resize(){camera.resize();world.renderer.setSize(container.clientWidth,container.clientHeight,false)}new ResizeObserver(resize).observe(container);resize();document.querySelector('#loading').remove();let last=performance.now(),ambientTime=0;function frame(now){requestAnimationFrame(frame);if(document.hidden){last=now;return;}let dt=Math.min((now-last)/1000,.05);last=now;ambientTime+=dt;let t=now/1000;camera.update(dt,simple);witches.update(t,simple);npcs.update(dt,t,simple);world.update(t,simple);events.update(ambientTime,!!ui.selected,simple);if(world.orb)world.orb.material.emissiveIntensity=ui.selected==='tarot'?.65:.25;if(world.runes)world.runes.forEach((r,i)=>r.position.y=1.46+(ui.selected==='runes'&&!simple?Math.sin(t*2+i)*.08+.12:0));world.renderer.render(world.scene,camera.camera)}requestAnimationFrame(frame);
}catch(error){console.error(error);document.querySelector('#loading').textContent='3D 魔法暫時無法啟動，仍可使用下方入口拜訪女巫。';let ui=new UIManager(id=>ui.open(id),()=>{});}
