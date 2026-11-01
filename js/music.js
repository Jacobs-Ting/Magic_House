const TRACKS={tea:{name:'Tea Leaves and Velvet',src:'assets/sounds/Tea_Leaves_and_Velvet.mp3'},moonlight:{name:'Moonlight Through Canvas',src:'assets/sounds/Moonlight_Through_Canvas.mp3'}};
export class MusicPlayer{
 constructor(toast){
  const audio=document.querySelector('#background-music'),toggle=document.querySelector('#sound'),panel=document.querySelector('#music-panel'),select=document.querySelector('#music-track'),play=document.querySelector('#music-play'),status=document.querySelector('#music-status'),volume=document.querySelector('#music-volume');
  let request=0;audio.volume=.35;
  const sync=()=>{play.textContent=audio.paused?'▶ 播放音樂':'Ⅱ 暫停音樂';play.setAttribute('aria-label',audio.paused?'播放背景音樂':'暫停背景音樂');toggle.title=(audio.paused?'音樂選單 · ':'播放中 · ')+TRACKS[select.value].name;status.textContent=audio.paused?'已暫停':'循環播放中';};
  const open=show=>{panel.hidden=!show;toggle.setAttribute('aria-expanded',String(show));if(show)select.focus();};
  toggle.onclick=()=>open(panel.hidden);
  document.querySelector('#music-close').onclick=()=>{open(false);toggle.focus();};
  document.addEventListener('pointerdown',e=>{if(!panel.hidden&&!panel.contains(e.target)&&!toggle.contains(e.target))open(false);});
  panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();open(false);toggle.focus();}});
  const start=async()=>{const id=++request;play.disabled=true;status.textContent='正在載入…';try{await audio.play();}catch(error){if(id===request&&error.name!=='AbortError')toast('音樂暫時無法播放，請再按一次播放按鈕。');}finally{if(id===request){play.disabled=false;sync();}}};
  play.onclick=()=>{if(audio.paused)start();else{request++;audio.pause();sync();}};
  select.onchange=()=>{request++;audio.pause();audio.src=TRACKS[select.value].src;audio.load();start();};
  volume.oninput=()=>{audio.volume=Number(volume.value)/100;document.querySelector('#music-volume-value').value=volume.value+'%';};
  audio.addEventListener('play',sync);audio.addEventListener('pause',sync);
  audio.addEventListener('error',()=>{request++;audio.pause();play.disabled=false;sync();status.textContent='載入失敗';toast('音樂暫時無法載入，請確認音訊檔案仍在 assets/sounds 資料夾。');});
  sync();status.textContent='尚未播放';
 }
}
