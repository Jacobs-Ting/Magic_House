import {Vector3} from './three.module.js';
export class AmbientEvents{
 constructor(camera,witches,container){
  this.camera=camera;this.witches=witches;this.container=container;
  this.bubble=document.querySelector('#bubble');this.anchor=new Vector3();
  this.next=22;this.until=0;this.index=0;this.speaker=null;
  this.lines=[
   {speaker:'tarot',text:'露娜：芙蕾雅～星星說今天會有好運耶！ ✨'},
   {speaker:'runes',text:'芙蕾雅：嗯，符文說要先找到妳的魔法書。 🌿'},
   {speaker:'tarot',text:'露娜：咦？！原來就在我的帽子旁邊！'}
  ];
 }
 positionBubble(){
  const witch=this.witches[this.speaker];if(!witch)return;
  // Project the speaker's head into canvas coordinates, including camera rotation/zoom.
  witch.head.getWorldPosition(this.anchor);this.anchor.y+=.85;
  this.camera.updateMatrixWorld();this.anchor.project(this.camera);
  if(this.anchor.z < -1 || this.anchor.z > 1){this.bubble.classList.remove('show');return;}
  const width=this.container.clientWidth,height=this.container.clientHeight;
  const half=this.bubble.offsetWidth/2,padding=10;
  const x=Math.max(half+padding,Math.min(width-half-padding,(this.anchor.x*.5+.5)*width));
  const y=Math.max(this.bubble.offsetHeight+padding,Math.min(height-padding,(-this.anchor.y*.5+.5)*height));
  this.bubble.style.left=x+'px';this.bubble.style.top=y+'px';
 }
 update(t,active,simple){
  const b=this.bubble;
  if(active||simple){b.classList.remove('show');this.next=t+25;return;}
  if(t>this.next){const line=this.lines[this.index++%this.lines.length];this.speaker=line.speaker;b.dataset.speaker=line.speaker;b.textContent=line.text;b.classList.add('show');this.until=t+5;this.next=t+22+Math.random()*15;}
  if(t>this.until)b.classList.remove('show');
  else if(this.speaker)this.positionBubble();
 }
}
