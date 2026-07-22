// ============ CORE — birlashtiruvchi qism ============
const NAV={ super:["overview","shops","requests"], owner:["analitika","kassa","cheklar","mahsulotlar","hisobot","xodimlar","sozlamalar"], cashier:["kassa","cheklar"] };
const state={ lang:localStorage.getItem("lang")||"uz", route:"", user:null, cart:[], posCat:"__all__", products:[] };
let liveTimer=null, searchTimer;

// har bir route qaysi modul funksiyasiga ulanadi
const ROUTES={ overview:renderOverview, shops:renderShops, requests:renderRequests, analitika:renderDashboard, kassa:renderKassa, cheklar:renderOrders, mahsulotlar:renderProducts, hisobot:renderReports, xodimlar:renderEmployees, sozlamalar:renderSettings };

function doLogin(){ const phone=$("#in-phone").value.trim(), password=$("#in-pass").value; $("#login-err").textContent=""; try{ state.user=Data.login(phone,password); showApp(); }catch(e){ $("#login-err").textContent=e.message; } }
function logout(){ if(liveTimer)clearInterval(liveTimer); Data.logout(); state.user=null; state.cart=[]; $("#app").classList.remove("active"); $("#login").style.display="grid"; }
function renderNav(){
  $("#nav").innerHTML=NAV[state.user.role].map(k=>`<div class="nav-item ${k===state.route?"active":""}" data-route="${k}">${I[k]||""}<span>${t().nav[k]}</span></div>`).join("");
  $("#nav").querySelectorAll(".nav-item").forEach(el=>el.onclick=()=>go(el.dataset.route));
  const rb={super:t().role_super,owner:t().role_owner,cashier:t().role_cashier}[state.user.role];
  $("#role-badge").innerHTML=rb+(state.user.shop_name?` · <b style="color:var(--ink)">${esc(state.user.shop_name)}</b>`:"");
}
function renderTopbar(){ $("#page-title").textContent=t().nav[state.route]||""; $("#search").placeholder=t().search; $("#search").style.display=state.route==="xodimlar"?"":"none"; $("#user-name").textContent=state.user?.name||"—"; document.querySelectorAll(".lang button").forEach(b=>b.classList.toggle("active",b.dataset.lang===state.lang)); }
function go(route){ if(liveTimer)clearInterval(liveTimer); state.route=route; renderNav(); renderTopbar(); renderView(); }
function renderView(){ const fn=ROUTES[state.route]; if(fn)fn(); }
function showApp(){ $("#login").style.display="none"; $("#app").classList.add("active"); state.route=NAV[state.user.role][0]; renderNav(); renderTopbar(); renderView(); }
function applyLoginLang(){ $("#login-sub").textContent=t().login_sub; $("#lbl-phone").textContent=t().phone; $("#lbl-pass").textContent=t().pass; $("#btn-login").textContent=t().enter; }
document.addEventListener("DOMContentLoaded",()=>{
  applyLoginLang();
  $("#btn-login").onclick=doLogin;
  $("#in-pass").addEventListener("keydown",e=>{if(e.key==="Enter")doLogin();});
  $("#search").addEventListener("input",()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{if(state.route==="xodimlar")loadEmployees();},250);});
  document.querySelectorAll(".lang button").forEach(b=>b.onclick=()=>{ state.lang=b.dataset.lang; localStorage.setItem("lang",state.lang); applyLoginLang(); if(state.user){ if(liveTimer)clearInterval(liveTimer); renderNav(); renderTopbar(); renderView(); } });
  $("#user-chip").onclick=()=>{ if(confirm(t().logout))logout(); };
  const sess=Data.me(); if(sess){ state.user=sess; showApp(); }
});
