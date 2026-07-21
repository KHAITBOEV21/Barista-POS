<!DOCTYPE html>
<html lang="uz">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>QahvaSaaS — Editor / Mijoz / Kassir</title>
<style>
:root {
  --blue: #2f6fe0;
  --blue-soft: #e8f0fd;
  --blue-border: #cadcfa;
  --green: #16a266;
  --ink: #1f2a37;
  --muted: #6b7280;
  --muted-2: #8b93a1;
  --line: #ececf0;
  --line-2: #e3e6eb;
  --bg: #ffffff;
  --page: #ffffff;
  --pill: #ffffff;
  --sidebar-w: 252px;
}

* { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0;
  font-family: "Inter", "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif;
  color: var(--ink);
  background: var(--page);
  -webkit-font-smoothing: antialiased;
}
button { font-family: inherit; cursor: pointer; }
input { font-family: inherit; }

/* ---------------- LOGIN ---------------- */
.login-wrap {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f4f6fb;
}
.login-card {
  width: 380px;
  max-width: 92vw;
  background: #fff;
  border: 1px solid var(--line-2);
  border-radius: 16px;
  padding: 34px 30px;
  box-shadow: 0 12px 40px rgba(20, 30, 60, .08);
}
.login-logo { font-size: 30px; font-weight: 800; letter-spacing: -.5px; text-align: center; margin-bottom: 4px; }
.login-logo .dot { color: var(--blue); }
.login-sub { text-align: center; color: var(--muted); margin-bottom: 24px; font-size: 14px; }
.field { margin-bottom: 14px; }
.field label { display: block; font-size: 13px; color: var(--muted); margin-bottom: 6px; }
.field input {
  width: 100%; padding: 11px 13px; border: 1px solid var(--line-2);
  border-radius: 10px; font-size: 15px; outline: none;
}
.field input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-soft); }
.login-err { color: #dc2626; font-size: 13px; min-height: 18px; margin-bottom: 6px; }
.login-hint { text-align: center; font-size: 12px; color: var(--muted-2); margin-top: 16px; line-height: 1.6; }

/* ---------------- LAYOUT ---------------- */
.app { display: none; min-height: 100vh; }
.app.active { display: block; }

.sidebar {
  position: fixed; top: 0; left: 0; bottom: 0; width: var(--sidebar-w);
  background: #fff; border-right: 1px solid var(--line);
  padding: 14px 12px; display: flex; flex-direction: column;
}
.brand {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 8px 16px;
}
.brand .logo { font-size: 24px; font-weight: 800; letter-spacing: -.6px; }
.brand .logo .dot { color: var(--blue); }
.brand .collapse { color: var(--muted-2); display: flex; }

.nav { display: flex; flex-direction: column; gap: 2px; overflow-y: auto; }
.nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: 10px;
  color: #55606f; font-size: 14.5px; font-weight: 500;
  border: 1px solid transparent; user-select: none; cursor: pointer;
}
.nav-item svg { width: 19px; height: 19px; flex: none; }
.nav-item .chev { margin-left: auto; opacity: .5; }
.nav-item .lock { margin-left: auto; opacity: .45; width: 14px; height: 14px; }
.nav-item:hover { background: #f6f7f9; }
.nav-item.active {
  background: var(--blue-soft); color: var(--blue);
  border-color: var(--blue-border); font-weight: 600;
}

/* ---------------- MAIN ---------------- */
.main { margin-left: var(--sidebar-w); padding: 22px 28px 40px; }
.topbar { display: flex; align-items: center; gap: 20px; margin-bottom: 22px; }
.page-title { font-size: 23px; font-weight: 700; white-space: nowrap; }

.search {
  flex: 1; position: relative; max-width: 560px;
}
.search svg { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: var(--muted-2); width: 17px; height: 17px; }
.search input {
  width: 100%; padding: 11px 14px 11px 40px;
  border: 1px solid var(--line-2); border-radius: 10px; font-size: 14px; outline: none;
}
.search input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-soft); }

.top-right { margin-left: auto; display: flex; align-items: center; gap: 14px; }
.balance {
  display: flex; align-items: center; gap: 6px; color: var(--muted);
  font-size: 14px; font-weight: 600;
}
.balance .usd {
  width: 26px; height: 26px; border-radius: 50%; background: #eef1f6;
  display: grid; place-items: center; color: var(--muted); font-weight: 700;
}
.lang {
  display: flex; align-items: center; border: 1px solid var(--line-2);
  border-radius: 10px; overflow: hidden; font-size: 13px; font-weight: 600;
}
.lang button { border: none; background: #fff; color: var(--muted); padding: 8px 12px; }
.lang button.active { background: var(--blue); color: #fff; }
.user-chip {
  display: flex; align-items: center; gap: 8px; padding: 7px 12px;
  border: 1px solid var(--line-2); border-radius: 10px; max-width: 230px;
}
.user-chip .ava { width: 24px; height: 24px; border-radius: 50%; background: #eef1f6; display: grid; place-items: center; color: var(--muted); }
.user-chip .name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* actions row */
.actions-row { display: flex; justify-content: flex-end; gap: 12px; margin-bottom: 18px; }
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 16px; border-radius: 10px; font-size: 14px; font-weight: 600;
  border: 1px solid var(--line-2); background: #fff; color: var(--ink);
}
.btn svg { width: 17px; height: 17px; }
.btn:hover { background: #f7f8fa; }
.btn.primary { background: var(--blue); border-color: var(--blue); color: #fff; }
.btn.primary:hover { background: #2a63c9; }
.btn.danger { color: #dc2626; border-color: #f2c7c7; }
.btn.danger:hover { background: #fdecec; }

/* ---------------- TABLE ---------------- */
.card { border: 1px solid var(--line-2); border-radius: 14px; overflow: hidden; }
table { width: 100%; border-collapse: collapse; }
thead th {
  text-align: left; font-size: 13px; color: var(--muted-2); font-weight: 500;
  padding: 15px 18px; border-bottom: 1px solid var(--line); white-space: nowrap;
}
thead th:last-child { text-align: right; }
tbody td { padding: 16px 18px; border-bottom: 1px solid var(--line); font-size: 14px; vertical-align: middle; }
tbody tr:last-child td { border-bottom: none; }
tbody tr:hover { background: #fafbfc; }
.pill {
  display: inline-block; padding: 4px 12px; border: 1px solid var(--line-2);
  border-radius: 8px; font-size: 13px; color: #3a4453; background: #fff;
}
.filial { color: var(--green); font-weight: 500; }
.td-actions { text-align: right; }
.dots {
  width: 30px; height: 30px; border-radius: 8px; border: none; background: transparent;
  color: var(--muted); display: inline-grid; place-items: center; position: relative;
}
.dots:hover { background: #eef1f6; }

.empty { padding: 60px 20px; text-align: center; color: var(--muted-2); font-size: 14px; }
.coming {
  padding: 80px 20px; text-align: center; color: var(--muted-2);
}
.coming .big { font-size: 40px; margin-bottom: 10px; }
.coming h3 { color: var(--ink); margin: 0 0 6px; }

/* row menu */
.row-menu {
  position: absolute; right: 0; top: 34px; z-index: 30;
  background: #fff; border: 1px solid var(--line-2); border-radius: 10px;
  box-shadow: 0 10px 30px rgba(20,30,60,.12); min-width: 150px; overflow: hidden;
}
.row-menu button {
  display: flex; align-items: center; gap: 10px; width: 100%; text-align: left;
  padding: 10px 14px; border: none; background: #fff; font-size: 14px; color: var(--ink);
}
.row-menu button:hover { background: #f6f7f9; }
.row-menu button.del { color: #dc2626; }
.row-menu svg { width: 16px; height: 16px; }

/* ---------------- MODAL ---------------- */
.overlay {
  position: fixed; inset: 0; background: rgba(20, 28, 45, .38);
  display: none; place-items: center; z-index: 100; padding: 20px;
}
.overlay.open { display: grid; }
.modal {
  background: #fff; border-radius: 16px; width: 460px; max-width: 96vw;
  max-height: 92vh; overflow: auto; box-shadow: 0 20px 60px rgba(20,30,60,.2);
}
.modal-head { display: flex; align-items: center; justify-content: space-between; padding: 20px 22px; border-bottom: 1px solid var(--line); }
.modal-head h3 { margin: 0; font-size: 18px; }
.modal-head .x { border: none; background: transparent; color: var(--muted); font-size: 22px; line-height: 1; }
.modal-body { padding: 20px 22px; }
.modal-foot { padding: 16px 22px; border-top: 1px solid var(--line); display: flex; justify-content: flex-end; gap: 10px; }
.form-err { color: #dc2626; font-size: 13px; min-height: 18px; }

.roles-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.role-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border: 1px solid var(--line-2); border-radius: 10px; }
.role-row .rm { border: none; background: transparent; color: #dc2626; }
.add-role { display: flex; gap: 8px; }
.add-role input { flex: 1; padding: 10px 12px; border: 1px solid var(--line-2); border-radius: 10px; }

@media (max-width: 820px) {
  .sidebar { transform: translateX(-100%); transition: .2s; z-index: 60; box-shadow: 0 0 40px rgba(0,0,0,.15); }
  .sidebar.open { transform: none; }
  .main { margin-left: 0; padding: 16px; }
  .topbar { flex-wrap: wrap; }
}

/* ============ DASHBOARD ============ */
.stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 16px; }
.stat {
  background: #fff; border: 1px solid var(--line-2); border-radius: 14px; padding: 18px 18px;
}
.stat .lab { color: var(--muted); font-size: 13px; margin-bottom: 8px; }
.stat .val { font-size: 26px; font-weight: 800; letter-spacing: -.5px; }
.stat .val small { font-size: 14px; font-weight: 600; color: var(--muted-2); margin-left: 4px; }
.stat.accent { background: linear-gradient(135deg, #2f6fe0, #4a86f0); border-color: transparent; color: #fff; }
.stat.accent .lab { color: rgba(255,255,255,.85); }

.panels { display: grid; grid-template-columns: 1.4fr 1fr; gap: 14px; }
.panel { background: #fff; border: 1px solid var(--line-2); border-radius: 14px; padding: 18px; }
.panel h3 { margin: 0 0 14px; font-size: 15px; }
.panel h3 .live { font-size: 11px; font-weight: 600; color: var(--green); background: #e7f6ee; padding: 3px 8px; border-radius: 20px; margin-left: 8px; }
.panel h3 .live::before { content: "●"; margin-right: 4px; animation: pulse 1.4s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }

.chart { display: flex; align-items: flex-end; gap: 6px; height: 160px; padding-top: 10px; }
.bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end; }
.bar { width: 100%; max-width: 34px; background: var(--blue); border-radius: 6px 6px 0 0; min-height: 3px; transition: height .4s; }
.bar-lab { font-size: 10px; color: var(--muted-2); }

.tp-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--line); }
.tp-row:last-child { border: none; }
.tp-rank { width: 24px; height: 24px; border-radius: 7px; background: var(--blue-soft); color: var(--blue); display: grid; place-items: center; font-weight: 700; font-size: 13px; flex: none; }
.tp-name { flex: 1; font-size: 14px; }
.tp-meta { font-size: 13px; color: var(--muted); text-align: right; }
.tp-meta b { color: var(--ink); }

.recent-row { display: flex; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid var(--line); font-size: 13px; }
.recent-row:last-child { border: none; }
.recent-row .who { color: var(--muted); }
.recent-row .amt { font-weight: 700; }

/* ============ KASSA (POS) ============ */
.pos { display: grid; grid-template-columns: 1fr 360px; gap: 16px; align-items: start; }
.cat-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.cat-tab { padding: 8px 16px; border: 1px solid var(--line-2); border-radius: 20px; background: #fff; font-size: 13px; font-weight: 600; color: var(--muted); }
.cat-tab.active { background: var(--blue); border-color: var(--blue); color: #fff; }
.prod-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }
.prod-card { border: 1px solid var(--line-2); border-radius: 14px; padding: 16px 14px; background: #fff; text-align: left; transition: .15s; }
.prod-card:hover { border-color: var(--blue); box-shadow: 0 6px 18px rgba(47,111,224,.12); transform: translateY(-2px); }
.prod-card .pc-cat { font-size: 11px; color: var(--muted-2); text-transform: uppercase; letter-spacing: .3px; }
.prod-card .pc-name { font-size: 15px; font-weight: 700; margin: 6px 0 8px; }
.prod-card .pc-price { font-size: 14px; color: var(--blue); font-weight: 700; }

.cart { background: #fff; border: 1px solid var(--line-2); border-radius: 14px; padding: 16px; position: sticky; top: 20px; }
.cart h3 { margin: 0 0 12px; font-size: 16px; display: flex; justify-content: space-between; }
.cart h3 .clr { font-size: 12px; color: #dc2626; font-weight: 600; cursor: pointer; }
.cart-items { max-height: 46vh; overflow: auto; margin-bottom: 12px; }
.cart-empty { text-align: center; color: var(--muted-2); padding: 30px 0; font-size: 14px; }
.ci { border-bottom: 1px solid var(--line); padding: 10px 0; }
.ci-top { display: flex; justify-content: space-between; gap: 8px; }
.ci-name { font-weight: 600; font-size: 14px; }
.ci-opt { font-size: 12px; color: var(--muted); margin-top: 2px; }
.ci-bot { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
.qty-ctrl { display: flex; align-items: center; gap: 8px; }
.qty-ctrl button { width: 26px; height: 26px; border-radius: 7px; border: 1px solid var(--line-2); background: #fff; font-size: 16px; line-height: 1; }
.qty-ctrl span { min-width: 20px; text-align: center; font-weight: 600; }
.ci-price { font-weight: 700; font-size: 14px; }
.ci-rm { border: none; background: transparent; color: #dc2626; font-size: 12px; cursor: pointer; }
.cart-total { display: flex; justify-content: space-between; font-size: 18px; font-weight: 800; padding: 12px 0; border-top: 2px solid var(--line-2); }
.cart .checkout { width: 100%; justify-content: center; padding: 14px; font-size: 15px; }

.opt-group { margin-bottom: 16px; }
.opt-group .t { font-size: 13px; color: var(--muted); margin-bottom: 8px; }
.opt-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { padding: 8px 14px; border: 1px solid var(--line-2); border-radius: 10px; background: #fff; font-size: 13px; cursor: pointer; }
.chip.sel { border-color: var(--blue); background: var(--blue-soft); color: var(--blue); font-weight: 600; }

/* ============ MAHSULOT FORM ============ */
.opt-rows { display: flex; flex-direction: column; gap: 8px; margin-bottom: 8px; }
.opt-line { display: flex; gap: 8px; align-items: center; }
.opt-line input { padding: 9px 11px; border: 1px solid var(--line-2); border-radius: 9px; }
.opt-line input.nm { flex: 1; }
.opt-line input.pr { width: 110px; }
.opt-line .del { border: none; background: transparent; color: #dc2626; font-size: 20px; cursor: pointer; }
.add-line { font-size: 13px; color: var(--blue); font-weight: 600; cursor: pointer; background: none; border: none; padding: 2px 0; }
.toast {
  position: fixed; bottom: 26px; left: 50%; transform: translateX(-50%);
  background: #16a266; color: #fff; padding: 12px 22px; border-radius: 12px; font-weight: 600;
  box-shadow: 0 10px 30px rgba(0,0,0,.18); z-index: 200; opacity: 0; transition: .25s;
}
.toast.show { opacity: 1; bottom: 36px; }

@media (max-width: 1000px) { .stat-grid { grid-template-columns: repeat(2,1fr); } .panels { grid-template-columns: 1fr; } .pos { grid-template-columns: 1fr; } }

/* ============ v2: OMBOR / HISOBOT / CHEK ============ */
.stock-badge { display:inline-block; padding:3px 10px; border-radius:8px; font-size:13px; font-weight:600; }
.stock-ok { background:#e7f6ee; color:#16a266; }
.stock-low { background:#fff4e5; color:#c77700; }
.stock-out { background:#fdecec; color:#dc2626; }
.stock-inf { color:var(--muted-2); font-size:13px; }

.report-bar { display:flex; flex-wrap:wrap; gap:10px; align-items:end; margin-bottom:16px; }
.report-bar .fld { display:flex; flex-direction:column; gap:5px; }
.report-bar .fld label { font-size:12px; color:var(--muted); }
.report-bar input[type=date] { padding:9px 11px; border:1px solid var(--line-2); border-radius:10px; font-size:14px; }
.quick-btns { display:flex; gap:8px; margin-left:auto; }
.quick-btns button { padding:9px 14px; border:1px solid var(--line-2); border-radius:10px; background:#fff; font-size:13px; font-weight:600; color:var(--muted); }
.quick-btns button.active { background:var(--blue); border-color:var(--blue); color:#fff; }

/* receipt */
.receipt {
  width:300px; margin:0 auto; font-family:"Courier New",monospace; color:#111;
  background:#fff; padding:14px 16px; border:1px dashed #bbb;
}
.receipt .r-shop { text-align:center; font-weight:700; font-size:16px; }
.receipt .r-sub { text-align:center; font-size:11px; color:#555; margin-bottom:8px; }
.receipt .r-line { border-top:1px dashed #999; margin:8px 0; }
.receipt .r-item { display:flex; justify-content:space-between; font-size:12px; margin:3px 0; }
.receipt .r-item .rq { color:#555; }
.receipt .r-total { display:flex; justify-content:space-between; font-weight:700; font-size:14px; margin-top:6px; }
.receipt .r-foot { text-align:center; font-size:11px; margin-top:10px; color:#555; }

#print-area { display:none; }
@media print {
  body * { visibility:hidden; }
  #print-area, #print-area * { visibility:visible; }
  #print-area { display:block; position:absolute; left:0; top:0; width:100%; }
  .receipt { border:none; }
}

.settings-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
@media (max-width:700px){ .settings-grid{ grid-template-columns:1fr; } }
.warn-panel { background:#fff4e5; border:1px solid #ffd9a8; color:#8a5a00; border-radius:12px; padding:12px 16px; margin-bottom:14px; font-size:14px; }
</style>
</head>
<body>
<div id="login" class="login-wrap">
  <div class="login-card">
    <div class="login-logo">Qahva<span class="dot">SaaS</span></div>
    <div class="login-sub" id="login-sub">Tizimga kirish</div>
    <div class="field"><label id="lbl-phone">Telefon raqami</label><input id="in-phone" type="text" value="+998900000000" placeholder="+998..." /></div>
    <div class="field"><label id="lbl-pass">Parol</label><input id="in-pass" type="password" value="admin123" placeholder="••••••" /></div>
    <div class="login-err" id="login-err"></div>
    <button class="btn primary" style="width:100%;justify-content:center" id="btn-login">Kirish</button>
    <div class="login-hint" id="login-hint">
      <b>Editor (siz):</b> +998900000000 / admin123<br>
      <b>Mijoz (do'kon egasi):</b> +998911111111 / owner123<br>
      <b>Kassir:</b> +998937421881 / 1234
    </div>
  </div>
</div>

<div id="app" class="app">
  <aside class="sidebar" id="sidebar">
    <div class="brand"><span class="logo">Qahva<span class="dot">SaaS</span></span></div>
    <div id="role-badge" style="padding:4px 10px 10px;font-size:12px;color:var(--muted-2)"></div>
    <nav class="nav" id="nav"></nav>
  </aside>
  <main class="main">
    <div class="topbar">
      <h1 class="page-title" id="page-title"></h1>
      <div class="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        <input id="search" type="text" placeholder="Qidirish..." />
      </div>
      <div class="top-right">
        <div class="lang"><button data-lang="ru">RU</button><button data-lang="uz" class="active">UZ</button></div>
        <div class="user-chip" id="user-chip" title="Chiqish"><span class="ava"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg></span><span class="name" id="user-name">—</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></div>
      </div>
    </div>
    <div id="view"></div>
  </main>
</div>

<div class="overlay" id="overlay"><div class="modal" id="modal"></div></div>

<script>
// ==================== BAZA (brauzer xotirasi) ====================
const LS="qahva_saas_v1";
let store=safeLoad();
function safeLoad(){ try{ return JSON.parse(localStorage.getItem(LS)); }catch(e){ return null; } }
function persist(){ try{ localStorage.setItem(LS, JSON.stringify(store)); }catch(e){ console.warn(e); } }
function dateKey(d){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function nextId(){ return ++store.seq; }

function seedIfEmpty(){
  if(store && store.shops) return;
  const cs=[{name:"S",delta:0},{name:"M",delta:4000},{name:"L",delta:8000}];
  const ce=[{name:"Qo'shimcha shot",price:4000},{name:"Sirop",price:3000},{name:"Sut (o'simlik)",price:4000}];
  store={
    seq:200, session:null,
    supers:[{id:1, name:"Bosh administrator", phone:"+998900000000", password:"admin123"}],
    roles:[{id:1,name:"Администратор"},{id:2,name:"Кассир"},{id:3,name:"Менеджер"}],
    shops:[
      {id:31, name:"Qahva Vaqti", owner_name:"Aziz Karimov", owner_phone:"+998911111111", owner_password:"owner123", plan:"Test", created_at:new Date().toISOString()},
      {id:32, name:"Coffee Break", owner_name:"Dilnoza Yusupova", owner_phone:"+998922222222", owner_password:"owner123", plan:"Test", created_at:new Date().toISOString()},
    ],
    employees:[
      {id:41, shop_id:31, name:"Kassir 1", phone:"+998937421881", password:"1234", position:"xodim", role:"Кассир", kassa:"(1) kassa"},
      {id:42, shop_id:31, name:"Kassir 2", phone:"+998918591716", password:"1234", position:"xodim", role:"Кассир", kassa:"(1) kassa"},
      {id:43, shop_id:32, name:"Kassir A", phone:"+998933333333", password:"1234", position:"xodim", role:"Кассир", kassa:"(1) kassa"},
    ],
    products:[
      {id:51, shop_id:31, name:"Espresso", category:"Qahva", price:12000, sizes:[{name:"Single",delta:0},{name:"Double",delta:6000}], extras:[{name:"Qo'shimcha shot",price:4000}], active:true},
      {id:52, shop_id:31, name:"Americano", category:"Qahva", price:15000, sizes:cs, extras:ce, active:true},
      {id:53, shop_id:31, name:"Cappuccino", category:"Qahva", price:18000, sizes:cs, extras:ce, active:true},
      {id:54, shop_id:31, name:"Latte", category:"Qahva", price:20000, sizes:cs, extras:ce, active:true},
      {id:55, shop_id:31, name:"Choy", category:"Choy", price:10000, sizes:[{name:"S",delta:0},{name:"L",delta:3000}], extras:[{name:"Limon",price:2000}], active:true},
      {id:56, shop_id:31, name:"Croissant", category:"Desert", price:14000, sizes:[], extras:[], active:true},
      {id:57, shop_id:32, name:"Flat White", category:"Qahva", price:22000, sizes:cs, extras:ce, active:true},
      {id:58, shop_id:32, name:"Raf", category:"Qahva", price:24000, sizes:cs, extras:ce, active:true},
      {id:59, shop_id:32, name:"Cheesecake", category:"Desert", price:25000, sizes:[], extras:[], active:true},
    ],
    orders:[], requests:[],
  };
  const now=new Date();
  const mk=(shop_id, emp, prod, size, extras, qty)=>{
    const p=store.products.find(x=>x.id===prod);
    const sd=(p.sizes.find(s=>s.name===size)||{}).delta||0;
    const ep=extras.reduce((s,n)=>s+((p.extras.find(e=>e.name===n)||{}).price||0),0);
    const unit=p.price+sd+ep, line=unit*qty;
    store.orders.push({id:nextId(), shop_id, employee_id:emp.id, employee_name:emp.name, total:line, created_at:now.toISOString(), dateKey:dateKey(now), items:[{product_id:p.id,product_name:p.name,size,extras:extras.join(", "),qty,unit_price:unit,line_total:line}]});
  };
  mk(31, store.employees[0], 53, "M", ["Qo'shimcha shot"], 2);
  mk(31, store.employees[1], 54, "L", [], 1);
  mk(31, store.employees[0], 56, "", [], 3);
  mk(32, store.employees[2], 57, "M", [], 2);
  persist();
}
seedIfEmpty();

function shopById(id){ return store.shops.find(s=>s.id==id); }

const Data={
  login(phone,password){
    let s=store.supers.find(x=>x.phone===phone&&x.password===password);
    if(s){ store.session={role:"super",ref_id:s.id,name:s.name}; persist(); return store.session; }
    let o=store.shops.find(x=>x.owner_phone===phone&&x.owner_password===password);
    if(o){ store.session={role:"owner",ref_id:o.id,shop_id:o.id,name:o.owner_name,shop_name:o.name}; persist(); return store.session; }
    let e=store.employees.find(x=>x.phone===phone&&x.password===password);
    if(e){ const sh=shopById(e.shop_id); store.session={role:"cashier",ref_id:e.id,shop_id:e.shop_id,name:e.name,shop_name:sh?sh.name:""}; persist(); return store.session; }
    throw new Error(t().wrong);
  },
  logout(){ store.session=null; persist(); },
  me(){ return store.session; },

  // ---- Shops (super) ----
  shops(){ return store.shops.map(s=>({...s})); },
  shopsWithStats(){
    const today=dateKey(new Date());
    return store.shops.map(s=>{
      const os=store.orders.filter(o=>o.shop_id===s.id && o.dateKey===today);
      return {...s, today_revenue:os.reduce((a,o)=>a+o.total,0), today_orders:os.length, cashiers:store.employees.filter(e=>e.shop_id===s.id).length};
    });
  },
  addShop(b){ if(!b.name||!b.owner_phone)throw new Error("Do'kon nomi va egasi telefoni majburiy"); const s={id:nextId(),name:b.name,owner_name:b.owner_name||"Egasi",owner_phone:b.owner_phone,owner_password:b.owner_password||"owner123",plan:b.plan||"Test",created_at:new Date().toISOString()}; store.shops.push(s); persist(); return s; },
  updateShop(id,b){ const s=shopById(id); if(!s)throw new Error("Topilmadi"); Object.assign(s,{name:b.name??s.name,owner_name:b.owner_name??s.owner_name,owner_phone:b.owner_phone??s.owner_phone,plan:b.plan??s.plan}); if(b.owner_password)s.owner_password=b.owner_password; persist(); return s; },
  deleteShop(id){ store.shops=store.shops.filter(s=>s.id!=id); store.employees=store.employees.filter(e=>e.shop_id!=id); store.products=store.products.filter(p=>p.shop_id!=id); store.orders=store.orders.filter(o=>o.shop_id!=id); persist(); },

  // ---- Products (per shop) ----
  products(shopId,all){ let r=store.products.filter(p=>p.shop_id==shopId); if(!all)r=r.filter(p=>p.active); return r.map(p=>({...p})); },
  addProduct(shopId,p){ const np={id:nextId(),shop_id:shopId,name:p.name,category:p.category||"Boshqa",price:Math.round(+p.price||0),sizes:p.sizes||[],extras:p.extras||[],active:p.active!==false}; store.products.push(np); persist(); return np; },
  updateProduct(id,b){ const p=store.products.find(x=>x.id==id); if(!p)throw new Error("Topilmadi"); Object.assign(p,{name:b.name??p.name,category:b.category??p.category,price:Math.round(b.price??p.price),sizes:b.sizes??p.sizes,extras:b.extras??p.extras,active:b.active===undefined?p.active:!!b.active}); persist(); return p; },
  deleteProduct(id){ store.products=store.products.filter(x=>x.id!=id); persist(); },

  // ---- Employees (per shop) ----
  employees(shopId,q){ let r=store.employees.filter(e=>e.shop_id==shopId).reverse(); if(q){q=q.toLowerCase(); r=r.filter(e=>e.name.toLowerCase().includes(q)||e.phone.toLowerCase().includes(q));} return r.map(e=>({id:e.id,name:e.name,phone:e.phone,position:e.position,role:e.role,kassa:e.kassa})); },
  addEmployee(shopId,b){ if(!b.name||!b.phone)throw new Error("Ism va telefon majburiy"); const e={id:nextId(),shop_id:shopId,name:b.name,phone:b.phone,password:b.password||"1234",position:b.position||"xodim",role:b.role||"Кассир",kassa:b.kassa||"(1) kassa"}; store.employees.push(e); persist(); return e; },
  updateEmployee(id,b){ const e=store.employees.find(x=>x.id==id); if(!e)throw new Error("Topilmadi"); Object.assign(e,{name:b.name??e.name,phone:b.phone??e.phone,position:b.position??e.position,role:b.role??e.role,kassa:b.kassa??e.kassa}); if(b.password)e.password=b.password; persist(); return e; },
  deleteEmployee(id){ store.employees=store.employees.filter(x=>x.id!=id); persist(); },
  roles(){ return store.roles.slice(); },
  addRole(name){ if(!name)throw new Error("Nom majburiy"); if(store.roles.some(r=>r.name===name))throw new Error("Bunday rol bor"); const r={id:nextId(),name}; store.roles.push(r); persist(); return r; },
  deleteRole(id){ store.roles=store.roles.filter(x=>x.id!=id); persist(); },

  // ---- Orders ----
  createOrder(shopId,items,actor){
    const built=[]; let total=0;
    for(const it of items){
      const p=store.products.find(x=>x.id==it.product_id); if(!p)continue;
      const sd=(p.sizes.find(s=>s.name===it.size)||{}).delta||0;
      const chosen=(it.extras||[]).filter(n=>p.extras.some(e=>e.name===n));
      const ep=chosen.reduce((s,n)=>s+((p.extras.find(e=>e.name===n)||{}).price||0),0);
      const qty=Math.max(1,+it.qty||1), unit=p.price+sd+ep, line=unit*qty; total+=line;
      built.push({product_id:p.id,product_name:p.name,size:it.size||"",extras:chosen.join(", "),qty,unit_price:unit,line_total:line});
    }
    if(!built.length)throw new Error("Savat bo'sh");
    const now=new Date();
    store.orders.push({id:nextId(),shop_id:shopId,employee_id:actor.ref_id,employee_name:actor.name,total,created_at:now.toISOString(),dateKey:dateKey(now),items:built});
    persist(); return {total};
  },
  stats(shopId){
    const today=dateKey(new Date());
    const td=store.orders.filter(o=>o.shop_id==shopId && o.dateKey===today);
    const revenue=td.reduce((s,o)=>s+o.total,0), orders=td.length;
    const items_sold=td.reduce((s,o)=>s+o.items.reduce((a,i)=>a+i.qty,0),0);
    const m={}; td.forEach(o=>o.items.forEach(i=>{ (m[i.product_name]=m[i.product_name]||{name:i.product_name,qty:0,revenue:0}); m[i.product_name].qty+=i.qty; m[i.product_name].revenue+=i.line_total; }));
    const top=Object.values(m).sort((a,b)=>b.qty-a.qty).slice(0,5);
    const recent=store.orders.filter(o=>o.shop_id==shopId).sort((a,b)=>b.id-a.id).slice(0,8).map(o=>({id:o.id,employee_name:o.employee_name,total:o.total,items:o.items.reduce((a,i)=>a+i.qty,0)}));
    const em={}; td.forEach(o=>{ (em[o.employee_name]=em[o.employee_name]||{name:o.employee_name,orders:0,revenue:0}); em[o.employee_name].orders++; em[o.employee_name].revenue+=o.total; });
    const by_employee=Object.values(em).sort((a,b)=>b.revenue-a.revenue);
    const hh={}; td.forEach(o=>{ const h=String(new Date(o.created_at).getHours()).padStart(2,"0"); hh[h]=(hh[h]||0)+o.total; });
    const hourly=Object.entries(hh).map(([h,revenue])=>({h,revenue}));
    return {revenue,orders,avg_check:orders?Math.round(revenue/orders):0,items_sold,top,recent,by_employee,hourly};
  },
  overview(){
    const today=dateKey(new Date());
    const td=store.orders.filter(o=>o.dateKey===today);
    return { shops:store.shops.length, revenue:td.reduce((a,o)=>a+o.total,0), orders:td.length, cashiers:store.employees.length };
  },

  // ---- Change requests (Claude) ----
  requests(){ return store.requests.slice().reverse(); },
  addRequest(b){ const r={id:nextId(),area:b.area,text:b.text,status:"Yangi",created_at:new Date().toISOString()}; store.requests.push(r); persist(); return r; },
  deleteRequest(id){ store.requests=store.requests.filter(x=>x.id!=id); persist(); },

  exportAll(){ return JSON.stringify(store,null,2); },
  importAll(txt){ const d=JSON.parse(txt); if(!d.shops)throw new Error("Noto'g'ri fayl"); store=d; persist(); },
  salesCSV(shopId){
    const rows=[["Sana","Chek #","Xodim","Mahsulot","Hajm","Qo'shimcha","Soni","Narx","Jami"]];
    store.orders.filter(o=>!shopId||o.shop_id==shopId).forEach(o=>o.items.forEach(i=>rows.push([o.created_at.slice(0,19).replace("T"," "),o.id,o.employee_name,i.product_name,i.size,i.extras,i.qty,i.unit_price,i.line_total])));
    return rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
  },
};

// ==================== ICONS ====================
const I={
  overview:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  shops:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l1.5-5h15L21 9M4 9v11h16V9M4 9h16"/><path d="M9 20v-6h6v6"/></svg>',
  requests:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  analitika:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="4" width="3" height="14"/></svg>',
  kassa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M2 3h3l2.5 13h11l2-9H6"/></svg>',
  mahsulotlar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h12l1 6H5z"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"/><path d="M9 12h6"/></svg>',
  xodimlar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M16 5a3 3 0 0 1 0 6M22 20c0-2-1-3.5-3-4.5"/></svg>',
  sozlamalar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9 2 2 0 1 1-2.8 2.8 1.7 1.7 0 0 0-2.9 1.2 2 2 0 1 1-4 0 1.7 1.7 0 0 0-2.9-1.2 2 2 0 1 1-2.8-2.8 1.7 1.7 0 0 0-1.2-2.9 2 2 0 1 1 0-4 1.7 1.7 0 0 0 1.2-2.9 2 2 0 1 1 2.8-2.8 1.7 1.7 0 0 0 2.9-1.2 2 2 0 1 1 4 0 1.7 1.7 0 0 0 2.9 1.2 2 2 0 1 1 2.8 2.8 1.7 1.7 0 0 0 1.2 2.9 2 2 0 1 1 0 4 1.7 1.7 0 0 0-1.6 1z"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9 2 2 0 1 1-2.8 2.8 1.7 1.7 0 0 0-2.9 1.2 2 2 0 1 1-4 0 1.7 1.7 0 0 0-2.9-1.2 2 2 0 1 1-2.8-2.8 1.7 1.7 0 0 0-1.2-2.9 2 2 0 1 1 0-4 1.7 1.7 0 0 0 1.2-2.9 2 2 0 1 1 2.8-2.8 1.7 1.7 0 0 0 2.9-1.2 2 2 0 1 1 4 0 1.7 1.7 0 0 0 2.9 1.2 2 2 0 1 1 2.8 2.8 1.7 1.7 0 0 0 1.2 2.9 2 2 0 1 1 0 4 1.7 1.7 0 0 0-1.6 1z"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>',
  dots:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
};

// ==================== i18n ====================
const T={
  uz:{ login_sub:"Tizimga kirish", phone:"Telefon raqami", pass:"Parol", enter:"Kirish", search:"Qidirish...", som:"so'm", wrong:"Telefon yoki parol xato",
    manage_roles:"Rollarni boshqarish", add_emp:"Xodim qo'shish",
    col_emp:"Xodim", col_user:"Telefon", col_pos:"Lavozim", col_role:"Rol", col_kassa:"Kassa", col_act:"Amallar",
    empty:"Topilmadi", edit:"Tahrirlash", del:"O'chirish", new_emp:"Yangi kassir", edit_emp:"Kassirni tahrirlash",
    name:"Ism", position:"Lavozim", role:"Rol", cancel:"Bekor qilish", save:"Saqlash",
    roles_title:"Rollar", add_role:"Qo'shish", role_name:"Rol nomi", confirm_del:"O'chirmoqchimisiz?", logout:"Chiqish?",
    today_rev:"Bugungi tushum", sales_count:"Sotuvlar soni", avg_check:"O'rtacha chek", items_today:"Sotilgan mahsulot",
    live:"jonli", top5:"TOP-5 mahsulot", recent_sales:"So'nggi sotuvlar", by_emp:"Kassirlar kesimida", hourly:"Soatlik tushum (bugun)", no_data:"Hozircha ma'lumot yo'q",
    all_cat:"Barchasi", cart_title:"Buyurtma", cart_empty:"Savat bo'sh — mahsulot tanlang", checkout:"Sotuvni yakunlash", clear:"Tozalash",
    choose_size:"Hajmi", choose_extras:"Qo'shimchalar", qty:"Soni", add_to_cart:"Savatga qo'shish", sold_ok:"Sotuv muvaffaqiyatli!", total:"Jami",
    add_product:"Mahsulot qo'shish", new_product:"Yangi mahsulot", edit_product:"Mahsulotni tahrirlash",
    p_name:"Nomi", p_cat:"Turi (kategoriya)", p_price:"Asosiy narx", p_sizes:"Hajmlar (narx qo'shimchasi)", p_extras:"Qo'shimchalar (narxi)", p_active:"Sotuvda",
    size_name:"Hajm nomi", price_delta:"+narx", extra_name:"Qo'shimcha", extra_price:"narx", add_size:"+ Hajm qo'shish", add_extra:"+ Qo'shimcha qo'shish",
    c_name:"Nomi", c_cat:"Turi", c_price:"Narx", c_opts:"Variantlar", no_products:"Mahsulot yo'q", pass_hint:"Parol (bo'sh: 1234)",
    settings_title:"Sozlamalar va zaxira", backup_desc:"Ma'lumotlar shu kompyuter brauzerida saqlanadi. Yo'qotmaslik uchun zaxira nusxa oling.",
    backup_download:"Zaxira nusxa (JSON)", backup_restore:"Zaxiradan tiklash", export_csv:"Sotuvlarni Excel (CSV)", restore_ok:"Tiklandi!", restore_confirm:"Joriy ma'lumotlar almashtiriladi. Davom etamizmi?",
    // super
    shops_total:"Do'konlar", all_revenue:"Bugungi umumiy tushum", all_orders:"Umumiy sotuvlar", cashiers_total:"Kassirlar",
    shops_title:"Do'konlar (mijozlar)", add_shop:"Do'kon qo'shish", new_shop:"Yangi do'kon", edit_shop:"Do'konni tahrirlash",
    shop_name:"Do'kon nomi", owner_name:"Egasi (F.I.O)", owner_phone:"Egasi telefoni", owner_pass:"Egasi paroli", plan:"Tarif",
    col_shop:"Do'kon", col_owner:"Egasi", col_login:"Login", col_today:"Bugun", col_cashiers:"Kassirlar",
    req_title:"Claude'ga o'zgartirish so'rovi", req_desc:"Nimani o'zgartirishni yozing → 'Nusxa olish' bosing → Claude bilan suhbatga tashlang. Claude asosiy tizimni o'zgartiradi.",
    req_area:"Qaysi bo'lim?", req_text:"O'zgarish tavsifi", req_send:"So'rov yaratish", req_copy:"Nusxa olish (Claude'ga)", req_copied:"Nusxa olindi! Endi Claude'ga tashlang.", req_none:"So'rovlar yo'q",
    nav:{overview:"Umumiy", shops:"Do'konlar", requests:"Claude so'rovi", analitika:"Analitika", kassa:"Kassa", mahsulotlar:"Mahsulotlar", xodimlar:"Kassirlar", sozlamalar:"Sozlamalar"},
    role_super:"EDITOR — bosh boshqaruv", role_owner:"MIJOZ — do'kon egasi", role_cashier:"KASSIR" },
  ru:{ login_sub:"Вход в систему", phone:"Номер телефона", pass:"Пароль", enter:"Войти", search:"Поиск...", som:"сум", wrong:"Неверный телефон или пароль",
    manage_roles:"Роли", add_emp:"Добавить кассира",
    col_emp:"Сотрудник", col_user:"Телефон", col_pos:"Должность", col_role:"Роль", col_kassa:"Касса", col_act:"Действия",
    empty:"Не найдено", edit:"Редактировать", del:"Удалить", new_emp:"Новый кассир", edit_emp:"Редактировать кассира",
    name:"Имя", position:"Должность", role:"Роль", cancel:"Отмена", save:"Сохранить",
    roles_title:"Роли", add_role:"Добавить", role_name:"Название роли", confirm_del:"Удалить?", logout:"Выйти?",
    today_rev:"Выручка сегодня", sales_count:"Продаж", avg_check:"Средний чек", items_today:"Продано товаров",
    live:"онлайн", top5:"ТОП-5 товаров", recent_sales:"Последние продажи", by_emp:"По кассирам", hourly:"Выручка по часам (сегодня)", no_data:"Пока нет данных",
    all_cat:"Все", cart_title:"Заказ", cart_empty:"Корзина пуста", checkout:"Завершить продажу", clear:"Очистить",
    choose_size:"Размер", choose_extras:"Добавки", qty:"Кол-во", add_to_cart:"В корзину", sold_ok:"Продажа успешна!", total:"Итого",
    add_product:"Добавить товар", new_product:"Новый товар", edit_product:"Редактировать товар",
    p_name:"Название", p_cat:"Категория", p_price:"Базовая цена", p_sizes:"Размеры (доплата)", p_extras:"Добавки (цена)", p_active:"В продаже",
    size_name:"Размер", price_delta:"+цена", extra_name:"Добавка", extra_price:"цена", add_size:"+ Размер", add_extra:"+ Добавка",
    c_name:"Название", c_cat:"Категория", c_price:"Цена", c_opts:"Варианты", no_products:"Нет товаров", pass_hint:"Пароль (по умолч.: 1234)",
    settings_title:"Настройки и копия", backup_desc:"Данные хранятся в браузере этого компьютера. Делайте резервную копию.",
    backup_download:"Скачать копию (JSON)", backup_restore:"Восстановить", export_csv:"Продажи в Excel (CSV)", restore_ok:"Восстановлено!", restore_confirm:"Текущие данные будут заменены. Продолжить?",
    shops_total:"Магазинов", all_revenue:"Общая выручка сегодня", all_orders:"Всего продаж", cashiers_total:"Кассиров",
    shops_title:"Магазины (клиенты)", add_shop:"Добавить магазин", new_shop:"Новый магазин", edit_shop:"Редактировать магазин",
    shop_name:"Название", owner_name:"Владелец (ФИО)", owner_phone:"Телефон владельца", owner_pass:"Пароль владельца", plan:"Тариф",
    col_shop:"Магазин", col_owner:"Владелец", col_login:"Логин", col_today:"Сегодня", col_cashiers:"Кассиры",
    req_title:"Запрос на изменение (Claude)", req_desc:"Опишите изменение → 'Копировать' → вставьте в чат с Claude.",
    req_area:"Раздел", req_text:"Описание", req_send:"Создать запрос", req_copy:"Копировать (для Claude)", req_copied:"Скопировано! Вставьте в чат Claude.", req_none:"Нет запросов",
    nav:{overview:"Обзор", shops:"Магазины", requests:"Запрос Claude", analitika:"Аналитика", kassa:"Касса", mahsulotlar:"Товары", xodimlar:"Кассиры", sozlamalar:"Настройки"},
    role_super:"EDITOR — управление", role_owner:"КЛИЕНТ — владелец", role_cashier:"КАССИР" },
};

const NAV={ super:["overview","shops","requests"], owner:["analitika","kassa","mahsulotlar","xodimlar","sozlamalar"], cashier:["kassa"] };

const state={ lang:localStorage.getItem("lang")||"uz", route:"", user:null, cart:[], posCat:"__all__", products:[] };
let liveTimer=null;
const t=()=>T[state.lang];
const $=s=>document.querySelector(s);
const fmt=n=>(Math.round(n||0)).toLocaleString("ru-RU").replace(/,/g," ");
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));
const shopId=()=>state.user?.shop_id;

// ==================== LOGIN ====================
function doLogin(){ const phone=$("#in-phone").value.trim(), password=$("#in-pass").value; $("#login-err").textContent=""; try{ state.user=Data.login(phone,password); showApp(); }catch(e){ $("#login-err").textContent=e.message; } }
function logout(){ if(liveTimer)clearInterval(liveTimer); Data.logout(); state.user=null; state.cart=[]; $("#app").classList.remove("active"); $("#login").style.display="grid"; }

// ==================== SHELL ====================
function renderNav(){
  $("#nav").innerHTML=NAV[state.user.role].map(k=>`<div class="nav-item ${k===state.route?"active":""}" data-route="${k}">${I[k]||""}<span>${t().nav[k]}</span></div>`).join("");
  $("#nav").querySelectorAll(".nav-item").forEach(el=>el.onclick=()=>go(el.dataset.route));
  const rb={super:t().role_super,owner:t().role_owner,cashier:t().role_cashier}[state.user.role];
  $("#role-badge").innerHTML=rb+(state.user.shop_name?` · <b style="color:var(--ink)">${esc(state.user.shop_name)}</b>`:"");
}
function renderTopbar(){
  $("#page-title").textContent=t().nav[state.route]||"";
  $("#search").placeholder=t().search;
  $("#search").style.display=state.route==="xodimlar"?"":"none";
  $("#user-name").textContent=state.user?.name||"—";
  document.querySelectorAll(".lang button").forEach(b=>b.classList.toggle("active",b.dataset.lang===state.lang));
}
function go(route){ if(liveTimer)clearInterval(liveTimer); state.route=route; renderNav(); renderTopbar(); renderView(); }
function renderView(){
  const r=state.route;
  if(r==="overview")return renderOverview();
  if(r==="shops")return renderShops();
  if(r==="requests")return renderRequests();
  if(r==="analitika")return renderDashboard();
  if(r==="kassa")return renderKassa();
  if(r==="mahsulotlar")return renderProducts();
  if(r==="xodimlar")return renderEmployees();
  if(r==="sozlamalar")return renderSettings();
}

// ==================== SUPER: OVERVIEW ====================
function renderOverview(){
  const draw=()=>{
    if(state.route!=="overview")return;
    const o=Data.overview(); const rows=Data.shopsWithStats();
    $("#view").innerHTML=`
      <div class="stat-grid">
        <div class="stat accent"><div class="lab">${t().all_revenue}</div><div class="val">${fmt(o.revenue)} <small>${t().som}</small></div></div>
        <div class="stat"><div class="lab">${t().shops_total}</div><div class="val">${o.shops}</div></div>
        <div class="stat"><div class="lab">${t().all_orders}</div><div class="val">${o.orders}</div></div>
        <div class="stat"><div class="lab">${t().cashiers_total}</div><div class="val">${o.cashiers}</div></div>
      </div>
      <div class="card"><table><thead><tr><th>${t().col_shop}</th><th>${t().col_owner}</th><th>${t().col_cashiers}</th><th>${t().col_today} ${t().sales_count.toLowerCase()}</th><th>${t().col_today} ${t().today_rev.toLowerCase()}</th></tr></thead>
      <tbody>${rows.map(s=>`<tr><td><b>${esc(s.name)}</b></td><td>${esc(s.owner_name)}</td><td>${s.cashiers}</td><td>${s.today_orders}</td><td class="filial">${fmt(s.today_revenue)} ${t().som}</td></tr>`).join("")}</tbody></table></div>`;
  };
  draw(); liveTimer=setInterval(draw,4000);
}

// ==================== SUPER: SHOPS ====================
function renderShops(){
  const rows=Data.shopsWithStats();
  $("#view").innerHTML=`<div class="actions-row"><button class="btn primary" id="btn-addshop">${I.plus} ${t().add_shop}</button></div>
    <div class="card"><table><thead><tr><th>${t().col_shop}</th><th>${t().col_owner}</th><th>${t().col_login}</th><th>${t().col_cashiers}</th><th>${t().col_today}</th><th>${t().col_act}</th></tr></thead>
    <tbody>${rows.map(s=>`<tr><td><b>${esc(s.name)}</b><div class="tp-meta" style="text-align:left">${esc(s.plan)}</div></td><td>${esc(s.owner_name)}</td><td class="tp-meta" style="text-align:left">${esc(s.owner_phone)}<br>${esc(s.owner_password)}</td><td>${s.cashiers}</td><td class="filial">${fmt(s.today_revenue)} ${t().som}</td><td class="td-actions"><button class="dots" data-id="${s.id}">${I.dots}</button></td></tr>`).join("")}</tbody></table></div>`;
  $("#btn-addshop").onclick=()=>shopForm();
  $("#view").querySelectorAll(".dots").forEach(btn=>btn.onclick=ev=>{ ev.stopPropagation(); closeMenus();
    const s=rows.find(x=>x.id==btn.dataset.id); const m=document.createElement("div"); m.className="row-menu";
    m.innerHTML=`<button class="ed">${I.edit} ${t().edit}</button><button class="del">${I.trash} ${t().del}</button>`; btn.appendChild(m);
    m.querySelector(".ed").onclick=()=>{closeMenus();shopForm(s);};
    m.querySelector(".del").onclick=()=>{closeMenus();if(confirm(t().confirm_del)){Data.deleteShop(s.id);renderShops();}};
  });
}
function shopForm(s=null){
  const isEdit=!!s; const d=s||{name:"",owner_name:"",owner_phone:"",owner_password:"owner123",plan:"Test"};
  $("#modal").innerHTML=`<div class="modal-head"><h3>${isEdit?t().edit_shop:t().new_shop}</h3><button class="x">&times;</button></div>
    <div class="modal-body">
      <div class="field"><label>${t().shop_name}</label><input id="sh-name" value="${esc(d.name)}"></div>
      <div class="field"><label>${t().owner_name}</label><input id="sh-oname" value="${esc(d.owner_name)}"></div>
      <div class="field"><label>${t().owner_phone}</label><input id="sh-ophone" value="${esc(d.owner_phone)}" placeholder="+998..."></div>
      <div class="field"><label>${t().owner_pass}</label><input id="sh-opass" value="${esc(d.owner_password)}"></div>
      <div class="field"><label>${t().plan}</label><input id="sh-plan" value="${esc(d.plan)}"></div>
      <div class="form-err" id="sh-err"></div>
    </div>
    <div class="modal-foot"><button class="btn" id="sh-cancel">${t().cancel}</button><button class="btn primary" id="sh-save">${t().save}</button></div>`;
  openOverlay(); $("#modal").querySelector(".x").onclick=closeOverlay; $("#sh-cancel").onclick=closeOverlay;
  $("#sh-save").onclick=()=>{ const b={name:$("#sh-name").value.trim(),owner_name:$("#sh-oname").value.trim(),owner_phone:$("#sh-ophone").value.trim(),owner_password:$("#sh-opass").value.trim(),plan:$("#sh-plan").value.trim()};
    try{ isEdit?Data.updateShop(s.id,b):Data.addShop(b); closeOverlay(); renderShops(); }catch(e){ $("#sh-err").textContent=e.message; } };
}

// ==================== SUPER: CLAUDE REQUESTS ====================
function renderRequests(){
  const reqs=Data.requests();
  $("#view").innerHTML=`<div class="card" style="padding:22px;max-width:720px">
    <h3 style="margin:0 0 6px">${t().req_title}</h3>
    <p style="color:var(--muted);font-size:14px;line-height:1.6">${t().req_desc}</p>
    <div class="field"><label>${t().req_area}</label>
      <select id="rq-area" style="width:100%;padding:11px 13px;border:1px solid var(--line-2);border-radius:10px">
        <option>Kassa</option><option>Mahsulotlar</option><option>Analitika / Dashboard</option><option>Do'konlar</option><option>Dizayn</option><option>Boshqa</option></select></div>
    <div class="field"><label>${t().req_text}</label><textarea id="rq-text" rows="4" style="width:100%;padding:11px 13px;border:1px solid var(--line-2);border-radius:10px;resize:vertical"></textarea></div>
    <button class="btn primary" id="rq-add">${t().req_send}</button>
  </div>
  <div class="card" style="margin-top:14px">${reqs.length?`<table><thead><tr><th>#</th><th>${t().req_area}</th><th>${t().req_text}</th><th>${t().col_act}</th></tr></thead>
    <tbody>${reqs.map(r=>`<tr><td>${r.id}</td><td><span class="pill">${esc(r.area)}</span></td><td>${esc(r.text)}</td><td class="td-actions" style="white-space:nowrap"><button class="btn" data-copy="${r.id}" style="padding:6px 10px">${t().req_copy}</button> <button class="dots" data-del="${r.id}">${I.trash}</button></td></tr>`).join("")}</tbody></table>`:`<div class="empty">${t().req_none}</div>`}</div>`;
  $("#rq-add").onclick=()=>{ const text=$("#rq-text").value.trim(); if(!text)return; Data.addRequest({area:$("#rq-area").value,text}); renderRequests(); };
  $("#view").querySelectorAll("[data-copy]").forEach(b=>b.onclick=()=>{ const r=reqs.find(x=>x.id==b.dataset.copy); const msg=`[QahvaSaaS — o'zgartirish so'rovi]\nBo'lim: ${r.area}\nTavsif: ${r.text}\n\nIltimos shu o'zgarishni asosiy tizimga qo'shib bering.`; navigator.clipboard?.writeText(msg).then(()=>toast(t().req_copied)).catch(()=>{ prompt("Nusxa oling:", msg); }); });
  $("#view").querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{ Data.deleteRequest(b.dataset.del); renderRequests(); });
}

// ==================== OWNER: DASHBOARD ====================
function renderDashboard(){
  const draw=()=>{
    if(state.route!=="analitika")return;
    const s=Data.stats(shopId());
    const hours=[]; for(let h=8;h<=22;h++){ const hh=String(h).padStart(2,"0"); const f=s.hourly.find(x=>x.h===hh); hours.push({h:hh,rev:f?f.revenue:0}); }
    const maxH=Math.max(1,...hours.map(x=>x.rev));
    $("#view").innerHTML=`
      <div class="stat-grid">
        <div class="stat accent"><div class="lab">${t().today_rev}</div><div class="val">${fmt(s.revenue)} <small>${t().som}</small></div></div>
        <div class="stat"><div class="lab">${t().sales_count}</div><div class="val">${s.orders}</div></div>
        <div class="stat"><div class="lab">${t().avg_check}</div><div class="val">${fmt(s.avg_check)} <small>${t().som}</small></div></div>
        <div class="stat"><div class="lab">${t().items_today}</div><div class="val">${s.items_sold}</div></div>
      </div>
      <div class="panels">
        <div class="panel"><h3>${t().hourly}<span class="live">${t().live}</span></h3><div class="chart">${hours.map(x=>`<div class="bar-wrap"><div class="bar" style="height:${Math.round(x.rev/maxH*140)}px"></div><div class="bar-lab">${x.h}</div></div>`).join("")}</div></div>
        <div class="panel"><h3>${t().top5}</h3>${s.top.length?s.top.map((p,i)=>`<div class="tp-row"><div class="tp-rank">${i+1}</div><div class="tp-name">${esc(p.name)}</div><div class="tp-meta"><b>${p.qty}</b> dona · ${fmt(p.revenue)}</div></div>`).join(""):`<div class="cart-empty">${t().no_data}</div>`}</div>
      </div>
      <div class="panels" style="margin-top:14px">
        <div class="panel"><h3>${t().recent_sales}<span class="live">${t().live}</span></h3>${s.recent.length?s.recent.map(o=>`<div class="recent-row"><span>#${o.id} · <span class="who">${esc(o.employee_name)}</span> · ${o.items} dona</span><span class="amt">${fmt(o.total)} ${t().som}</span></div>`).join(""):`<div class="cart-empty">${t().no_data}</div>`}</div>
        <div class="panel"><h3>${t().by_emp}</h3>${s.by_employee.length?s.by_employee.map(e=>`<div class="recent-row"><span>${esc(e.name)} <span class="who">(${e.orders})</span></span><span class="amt">${fmt(e.revenue)} ${t().som}</span></div>`).join(""):`<div class="cart-empty">${t().no_data}</div>`}</div>
      </div>`;
  };
  draw(); liveTimer=setInterval(draw,4000);
}

// ==================== KASSA ====================
function renderKassa(){
  state.products=Data.products(shopId());
  const cats=["__all__",...Array.from(new Set(state.products.map(p=>p.category)))];
  const cartHTML=()=>{ const total=state.cart.reduce((s,c)=>s+c.line,0);
    return `<h3>${t().cart_title} ${state.cart.length?`<span class="clr" id="cart-clear">${t().clear}</span>`:""}</h3>
      <div class="cart-items">${state.cart.length?state.cart.map((c,i)=>`<div class="ci"><div class="ci-top"><div><div class="ci-name">${esc(c.name)}</div>${c.optLabel?`<div class="ci-opt">${esc(c.optLabel)}</div>`:""}</div><button class="ci-rm" data-i="${i}">✕</button></div><div class="ci-bot"><div class="qty-ctrl"><button data-dec="${i}">−</button><span>${c.qty}</span><button data-inc="${i}">+</button></div><div class="ci-price">${fmt(c.line)} ${t().som}</div></div></div>`).join(""):`<div class="cart-empty">${t().cart_empty}</div>`}</div>
      <div class="cart-total"><span>${t().total}</span><span>${fmt(total)} ${t().som}</span></div>
      <button class="btn primary checkout" id="cart-checkout" ${state.cart.length?"":"disabled style=opacity:.5"}>${t().checkout}</button>`; };
  const bindCart=()=>{ const c=$("#cart-clear"); if(c)c.onclick=()=>{state.cart=[];refreshCart();};
    $("#cart-box").querySelectorAll(".ci-rm").forEach(b=>b.onclick=()=>{state.cart.splice(+b.dataset.i,1);refreshCart();});
    $("#cart-box").querySelectorAll("[data-inc]").forEach(b=>b.onclick=()=>{const c=state.cart[+b.dataset.inc];c.qty++;c.line=c.unit*c.qty;refreshCart();});
    $("#cart-box").querySelectorAll("[data-dec]").forEach(b=>b.onclick=()=>{const c=state.cart[+b.dataset.dec];if(c.qty>1){c.qty--;c.line=c.unit*c.qty;refreshCart();}});
    const co=$("#cart-checkout"); if(co)co.onclick=checkout; };
  const refreshCart=()=>{ $("#cart-box").innerHTML=cartHTML(); bindCart(); };
  window.__refreshCart=refreshCart;
  const gridHTML=()=>{ const list=state.posCat==="__all__"?state.products:state.products.filter(p=>p.category===state.posCat);
    return list.length?list.map(p=>`<button class="prod-card" data-id="${p.id}"><div class="pc-cat">${esc(p.category)}</div><div class="pc-name">${esc(p.name)}</div><div class="pc-price">${fmt(p.price)} ${t().som}</div></button>`).join(""):`<div class="cart-empty">${t().no_products}</div>`; };
  $("#view").innerHTML=`<div class="pos"><div><div class="cat-tabs">${cats.map(c=>`<button class="cat-tab ${c===state.posCat?"active":""}" data-cat="${c}">${c==="__all__"?t().all_cat:esc(c)}</button>`).join("")}</div><div class="prod-grid" id="prod-grid">${gridHTML()}</div></div><div class="cart" id="cart-box">${cartHTML()}</div></div>`;
  const bindGrid=()=>$("#prod-grid").querySelectorAll(".prod-card").forEach(b=>b.onclick=()=>openPicker(state.products.find(p=>p.id==b.dataset.id)));
  $("#view").querySelectorAll(".cat-tab").forEach(b=>b.onclick=()=>{ state.posCat=b.dataset.cat; $("#prod-grid").innerHTML=gridHTML(); bindGrid(); $("#view").querySelectorAll(".cat-tab").forEach(x=>x.classList.toggle("active",x.dataset.cat===state.posCat)); });
  bindGrid(); bindCart();
}
function openPicker(p){
  let size=p.sizes[0]?.name||""; const extras=new Set(); let qty=1;
  const calc=()=>{ const sd=(p.sizes.find(s=>s.name===size)||{}).delta||0; const ep=[...extras].reduce((s,n)=>s+((p.extras.find(e=>e.name===n)||{}).price||0),0); return p.price+sd+ep; };
  const draw=()=>{ $("#modal").innerHTML=`<div class="modal-head"><h3>${esc(p.name)}</h3><button class="x">&times;</button></div><div class="modal-body">
      ${p.sizes.length?`<div class="opt-group"><div class="t">${t().choose_size}</div><div class="opt-chips">${p.sizes.map(s=>`<div class="chip ${s.name===size?"sel":""}" data-size="${esc(s.name)}">${esc(s.name)}${s.delta?` +${fmt(s.delta)}`:""}</div>`).join("")}</div></div>`:""}
      ${p.extras.length?`<div class="opt-group"><div class="t">${t().choose_extras}</div><div class="opt-chips">${p.extras.map(e=>`<div class="chip ${extras.has(e.name)?"sel":""}" data-extra="${esc(e.name)}">${esc(e.name)} +${fmt(e.price)}</div>`).join("")}</div></div>`:""}
      <div class="opt-group"><div class="t">${t().qty}</div><div class="qty-ctrl"><button id="q-dec">−</button><span>${qty}</span><button id="q-inc">+</button></div></div></div>
      <div class="modal-foot"><button class="btn primary" id="pp-add" style="width:100%;justify-content:center">${t().add_to_cart} · ${fmt(calc()*qty)} ${t().som}</button></div>`;
    $("#modal").querySelector(".x").onclick=closeOverlay;
    $("#modal").querySelectorAll("[data-size]").forEach(c=>c.onclick=()=>{size=c.dataset.size;draw();});
    $("#modal").querySelectorAll("[data-extra]").forEach(c=>c.onclick=()=>{const n=c.dataset.extra;extras.has(n)?extras.delete(n):extras.add(n);draw();});
    $("#q-dec").onclick=()=>{if(qty>1){qty--;draw();}}; $("#q-inc").onclick=()=>{qty++;draw();};
    $("#pp-add").onclick=()=>{ const unit=calc(), optLabel=[size,...extras].filter(Boolean).join(", "); state.cart.push({product_id:p.id,name:p.name,size,extras:[...extras],optLabel,qty,unit,line:unit*qty}); closeOverlay(); if(window.__refreshCart)window.__refreshCart(); };
  };
  draw(); openOverlay();
}
function checkout(){ if(!state.cart.length)return; try{ Data.createOrder(shopId(),state.cart.map(c=>({product_id:c.product_id,size:c.size,extras:c.extras,qty:c.qty})),state.user); state.cart=[]; renderKassa(); toast(t().sold_ok); }catch(e){ toast(e.message,true); } }

// ==================== MAHSULOTLAR ====================
function renderProducts(){
  const list=Data.products(shopId(),true);
  $("#view").innerHTML=`<div class="actions-row"><button class="btn primary" id="btn-addp">${I.plus} ${t().add_product}</button></div>
    <div class="card"><table><thead><tr><th>${t().c_name}</th><th>${t().c_cat}</th><th>${t().c_price}</th><th>${t().c_opts}</th><th>${t().p_active}</th><th>${t().col_act}</th></tr></thead>
    <tbody>${list.length?list.map(p=>`<tr><td><b>${esc(p.name)}</b></td><td><span class="pill">${esc(p.category)}</span></td><td>${fmt(p.price)} ${t().som}</td><td class="tp-meta" style="text-align:left">${p.sizes.length} hajm · ${p.extras.length} qo'shimcha</td><td>${p.active?'<span class="filial">✓</span>':'<span style="color:#dc2626">✕</span>'}</td><td class="td-actions"><button class="dots" data-id="${p.id}">${I.dots}</button></td></tr>`).join(""):`<tr><td colspan="6" class="empty">${t().no_products}</td></tr>`}</tbody></table></div>`;
  $("#btn-addp").onclick=()=>productForm();
  $("#view").querySelectorAll(".dots").forEach(btn=>btn.onclick=ev=>{ ev.stopPropagation(); closeMenus(); const p=list.find(x=>x.id==btn.dataset.id); const m=document.createElement("div"); m.className="row-menu"; m.innerHTML=`<button class="ed">${I.edit} ${t().edit}</button><button class="del">${I.trash} ${t().del}</button>`; btn.appendChild(m); m.querySelector(".ed").onclick=()=>{closeMenus();productForm(p);}; m.querySelector(".del").onclick=()=>{closeMenus();if(confirm(t().confirm_del)){Data.deleteProduct(p.id);renderProducts();}}; });
}
function productForm(p=null){
  const isEdit=!!p; const d=p||{name:"",category:"Qahva",price:0,sizes:[],extras:[],active:true};
  let sizes=JSON.parse(JSON.stringify(d.sizes)), extras=JSON.parse(JSON.stringify(d.extras));
  const draw=()=>{ $("#modal").innerHTML=`<div class="modal-head"><h3>${isEdit?t().edit_product:t().new_product}</h3><button class="x">&times;</button></div><div class="modal-body">
      <div class="field"><label>${t().p_name}</label><input id="p-name" value="${esc(d.name)}"></div>
      <div class="field"><label>${t().p_cat}</label><input id="p-cat" value="${esc(d.category)}" list="cats"><datalist id="cats"><option>Qahva</option><option>Choy</option><option>Desert</option><option>Boshqa</option></datalist></div>
      <div class="field"><label>${t().p_price} (${t().som})</label><input id="p-price" type="number" value="${d.price}"></div>
      <div class="field"><label>${t().p_sizes}</label><div class="opt-rows" id="sz-rows">${sizes.map((s,i)=>`<div class="opt-line"><input class="nm" value="${esc(s.name)}" placeholder="${t().size_name}"><input class="pr" type="number" value="${s.delta}" placeholder="${t().price_delta}"><button class="del" data-srm="${i}">×</button></div>`).join("")}</div><button class="add-line" id="add-sz">${t().add_size}</button></div>
      <div class="field"><label>${t().p_extras}</label><div class="opt-rows" id="ex-rows">${extras.map((e,i)=>`<div class="opt-line"><input class="nm" value="${esc(e.name)}" placeholder="${t().extra_name}"><input class="pr" type="number" value="${e.price}" placeholder="${t().extra_price}"><button class="del" data-erm="${i}">×</button></div>`).join("")}</div><button class="add-line" id="add-ex">${t().add_extra}</button></div>
      <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer"><input type="checkbox" id="p-active" ${d.active?"checked":""}> ${t().p_active}</label><div class="form-err" id="p-err"></div></div>
      <div class="modal-foot"><button class="btn" id="p-cancel">${t().cancel}</button><button class="btn primary" id="p-save">${t().save}</button></div>`;
    const read=()=>{ sizes=[...$("#sz-rows").querySelectorAll(".opt-line")].map(r=>({name:r.querySelector(".nm").value.trim(),delta:+r.querySelector(".pr").value||0})).filter(s=>s.name); extras=[...$("#ex-rows").querySelectorAll(".opt-line")].map(r=>({name:r.querySelector(".nm").value.trim(),price:+r.querySelector(".pr").value||0})).filter(e=>e.name); d.name=$("#p-name").value; d.category=$("#p-cat").value; d.price=+$("#p-price").value; d.active=$("#p-active").checked; };
    $("#modal").querySelector(".x").onclick=closeOverlay; $("#p-cancel").onclick=closeOverlay;
    $("#add-sz").onclick=()=>{read();sizes.push({name:"",delta:0});draw();}; $("#add-ex").onclick=()=>{read();extras.push({name:"",price:0});draw();};
    $("#sz-rows").querySelectorAll("[data-srm]").forEach(b=>b.onclick=()=>{read();sizes.splice(+b.dataset.srm,1);draw();});
    $("#ex-rows").querySelectorAll("[data-erm]").forEach(b=>b.onclick=()=>{read();extras.splice(+b.dataset.erm,1);draw();});
    $("#p-save").onclick=()=>{ read(); const payload={name:d.name.trim(),category:(d.category||"Boshqa").trim(),price:d.price||0,sizes,extras,active:d.active}; if(!payload.name){$("#p-err").textContent="Nom majburiy";return;} try{ isEdit?Data.updateProduct(p.id,payload):Data.addProduct(shopId(),payload); closeOverlay(); renderProducts(); }catch(e){$("#p-err").textContent=e.message;} };
  };
  draw(); openOverlay();
}

// ==================== KASSIRLAR ====================
function renderEmployees(){
  $("#view").innerHTML=`<div class="actions-row"><button class="btn primary" id="btn-add">${I.plus} ${t().add_emp}</button></div>
    <div class="card"><table><thead><tr><th>${t().col_emp}</th><th>${t().col_user}</th><th>${t().col_pos}</th><th>${t().col_role}</th><th>${t().col_kassa}</th><th>${t().col_act}</th></tr></thead><tbody id="emp-body"></tbody></table></div>`;
  $("#btn-add").onclick=()=>empModal(); loadEmployees();
}
function loadEmployees(){
  const q=$("#search").value.trim(); const rows=Data.employees(shopId(),q); const body=$("#emp-body"); if(!body)return;
  body.innerHTML=rows.length?rows.map(e=>`<tr><td>${esc(e.name)}</td><td>${esc(e.phone)}</td><td>${esc(e.position)}</td><td><span class="pill">${esc(e.role)}</span></td><td><span class="pill">${esc(e.kassa)}</span></td><td class="td-actions"><button class="dots" data-id="${e.id}">${I.dots}</button></td></tr>`).join(""):`<tr><td colspan="6" class="empty">${t().empty}</td></tr>`;
  body.querySelectorAll(".dots").forEach(btn=>btn.onclick=ev=>{ ev.stopPropagation(); closeMenus(); const emp=rows.find(r=>r.id==btn.dataset.id); const m=document.createElement("div"); m.className="row-menu"; m.innerHTML=`<button class="ed">${I.edit} ${t().edit}</button><button class="del">${I.trash} ${t().del}</button>`; btn.appendChild(m); m.querySelector(".ed").onclick=()=>{closeMenus();empModal(emp);}; m.querySelector(".del").onclick=()=>{closeMenus();if(confirm(t().confirm_del)){Data.deleteEmployee(emp.id);loadEmployees();}}; });
}
function empModal(emp=null){
  const isEdit=!!emp; const e=emp||{name:"",phone:"",position:"xodim",role:"Кассир",kassa:"(1) kassa"};
  $("#modal").innerHTML=`<div class="modal-head"><h3>${isEdit?t().edit_emp:t().new_emp}</h3><button class="x">&times;</button></div><div class="modal-body">
      <div class="field"><label>${t().name}</label><input id="m-name" value="${esc(e.name)}"></div>
      <div class="field"><label>${t().phone}</label><input id="m-phone" value="${esc(e.phone)}" placeholder="+998..."></div>
      <div class="field"><label>${t().pass} — ${t().pass_hint}</label><input id="m-pass" placeholder="1234"></div>
      <div class="field"><label>${t().position}</label><input id="m-pos" value="${esc(e.position)}"></div>
      <div class="field"><label>${t().role}</label><select id="m-role" style="width:100%;padding:11px 13px;border:1px solid var(--line-2);border-radius:10px">${Data.roles().map(r=>`<option ${r.name===e.role?"selected":""}>${esc(r.name)}</option>`).join("")}</select></div>
      <div class="form-err" id="m-err"></div></div>
    <div class="modal-foot"><button class="btn" id="m-cancel">${t().cancel}</button><button class="btn primary" id="m-save">${t().save}</button></div>`;
  openOverlay(); $("#modal").querySelector(".x").onclick=closeOverlay; $("#m-cancel").onclick=closeOverlay;
  $("#m-save").onclick=()=>{ const payload={name:$("#m-name").value.trim(),phone:$("#m-phone").value.trim(),position:$("#m-pos").value.trim(),role:$("#m-role").value}; const pw=$("#m-pass").value.trim(); if(pw)payload.password=pw; try{ isEdit?Data.updateEmployee(emp.id,payload):Data.addEmployee(shopId(),payload); closeOverlay(); loadEmployees(); }catch(err){$("#m-err").textContent=err.message;} };
}

// ==================== SOZLAMALAR ====================
function renderSettings(){
  $("#view").innerHTML=`<div class="card" style="padding:24px;max-width:640px"><h3 style="margin:0 0 8px">${t().settings_title}</h3>
    <p style="color:var(--muted);font-size:14px;line-height:1.6">${t().backup_desc}</p>
    <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">
      <button class="btn primary" id="s-export">${I.gear} ${t().backup_download}</button>
      <button class="btn" id="s-csv">${t().export_csv}</button>
      <label class="btn" style="cursor:pointer">${t().backup_restore}<input type="file" id="s-import" accept="application/json" style="display:none"></label>
    </div></div>`;
  $("#s-export").onclick=()=>downloadFile("qahva-zaxira-"+dateKey(new Date())+".json",Data.exportAll(),"application/json");
  $("#s-csv").onclick=()=>downloadFile("sotuvlar-"+dateKey(new Date())+".csv","\uFEFF"+Data.salesCSV(state.user.role==="super"?null:shopId()),"text/csv");
  $("#s-import").onchange=ev=>{ const f=ev.target.files[0]; if(!f)return; if(!confirm(t().restore_confirm))return; const rd=new FileReader(); rd.onload=()=>{ try{ Data.importAll(rd.result); toast(t().restore_ok); showApp(); }catch(e){ toast(e.message,true); } }; rd.readAsText(f); };
}
function downloadFile(name,content,type){ const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([content],{type})); a.download=name; a.click(); URL.revokeObjectURL(a.href); }

// ==================== HELPERS ====================
function closeMenus(){ document.querySelectorAll(".row-menu").forEach(m=>m.remove()); }
document.addEventListener("click",closeMenus);
function openOverlay(){ $("#overlay").classList.add("open"); }
function closeOverlay(){ $("#overlay").classList.remove("open"); }
$("#overlay").addEventListener("click",e=>{ if(e.target.id==="overlay")closeOverlay(); });
let toastTimer;
function toast(msg,err=false){ let el=$("#toast"); if(!el){ el=document.createElement("div"); el.id="toast"; el.className="toast"; document.body.appendChild(el); } el.textContent=msg; el.style.background=err?"#dc2626":"#16a266"; el.classList.add("show"); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove("show"),2400); }
let searchTimer;

// ==================== BOOT ====================
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
</script>
</body>
</html>
