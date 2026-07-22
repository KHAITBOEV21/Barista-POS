// ============ UMUMIY YORDAMCHILAR ============
const $=s=>document.querySelector(s);
const t=()=>T[state.lang];
const shopId=()=>state.user?.shop_id;
const fmt=n=>(Math.round(n||0)).toLocaleString("ru-RU").replace(/,/g," ");
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));
function closeMenus(){ document.querySelectorAll(".row-menu").forEach(m=>m.remove()); }
function openOverlay(){ $("#overlay").classList.add("open"); }
function closeOverlay(){ $("#overlay").classList.remove("open"); }
let toastTimer;
function toast(msg,err){ let el=$("#toast"); if(!el){ el=document.createElement("div"); el.id="toast"; el.className="toast"; document.body.appendChild(el); } el.textContent=msg; el.style.background=err?"#dc2626":"#16a266"; el.classList.add("show"); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove("show"),2400); }
document.addEventListener("click",closeMenus);
document.addEventListener("DOMContentLoaded",()=>{ const ov=$("#overlay"); if(ov)ov.addEventListener("click",e=>{ if(e.target.id==="overlay")closeOverlay(); }); });
