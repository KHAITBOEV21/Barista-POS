// ============ EDITOR / PROVAYDER MODULI ============
function renderOverview(){
  const draw=()=>{ if(state.route!=="overview")return;
    const o=Data.overview(); const rows=Data.shopsWithStats();
    $("#view").innerHTML=`<div class="stat-grid">
        <div class="stat accent"><div class="lab">${t().all_revenue}</div><div class="val">${fmt(o.revenue)} <small>${t().som}</small></div></div>
        <div class="stat"><div class="lab">${t().shops_total}</div><div class="val">${o.shops}</div></div>
        <div class="stat"><div class="lab">${t().all_orders}</div><div class="val">${o.orders}</div></div>
        <div class="stat"><div class="lab">${t().cashiers_total}</div><div class="val">${o.cashiers}</div></div></div>
      <div class="card"><table><thead><tr><th>${t().col_shop}</th><th>${t().col_owner}</th><th>${t().col_cashiers}</th><th>${t().sales_count}</th><th>${t().today_rev}</th></tr></thead>
      <tbody>${rows.map(s=>`<tr><td><b>${esc(s.name)}</b></td><td>${esc(s.owner_name)}</td><td>${s.cashiers}</td><td>${s.today_orders}</td><td class="filial">${fmt(s.today_revenue)} ${t().som}</td></tr>`).join("")}</tbody></table></div>`; };
  draw(); liveTimer=setInterval(draw,4000);
}
function renderShops(){
  const rows=Data.shopsWithStats();
  $("#view").innerHTML=`<div class="actions-row"><button class="btn primary" id="btn-addshop">${I.plus} ${t().add_shop}</button></div>
    <div class="card"><table><thead><tr><th>${t().col_shop}</th><th>${t().col_owner}</th><th>${t().col_login}</th><th>${t().col_cashiers}</th><th>${t().col_today}</th><th>${t().col_act}</th></tr></thead>
    <tbody>${rows.map(s=>`<tr><td><b>${esc(s.name)}</b><div class="tp-meta" style="text-align:left">${esc(s.plan)}</div></td><td>${esc(s.owner_name)}</td><td class="tp-meta" style="text-align:left">${esc(s.owner_phone)}<br>${esc(s.owner_password)}</td><td>${s.cashiers}</td><td class="filial">${fmt(s.today_revenue)} ${t().som}</td><td class="td-actions"><button class="dots" data-id="${s.id}">${I.dots}</button></td></tr>`).join("")}</tbody></table></div>`;
  $("#btn-addshop").onclick=()=>shopForm();
  $("#view").querySelectorAll(".dots").forEach(btn=>btn.onclick=ev=>{ ev.stopPropagation(); closeMenus(); const s=rows.find(x=>x.id==btn.dataset.id); const m=document.createElement("div"); m.className="row-menu"; m.innerHTML=`<button class="ed">${I.edit} ${t().edit}</button><button class="del">${I.trash} ${t().del}</button>`; btn.appendChild(m); m.querySelector(".ed").onclick=()=>{closeMenus();shopForm(s);}; m.querySelector(".del").onclick=()=>{closeMenus();if(confirm(t().confirm_del)){Data.deleteShop(s.id);renderShops();}}; });
}
function shopForm(s=null){
  const isEdit=!!s; const d=s||{name:"",owner_name:"",owner_phone:"",owner_password:"owner123",plan:"Test"};
  $("#modal").innerHTML=`<div class="modal-head"><h3>${isEdit?t().edit_shop:t().new_shop}</h3><button class="x">&times;</button></div><div class="modal-body">
      <div class="field"><label>${t().shop_name}</label><input id="sh-name" value="${esc(d.name)}"></div>
      <div class="field"><label>${t().owner_name}</label><input id="sh-oname" value="${esc(d.owner_name)}"></div>
      <div class="field"><label>${t().owner_phone}</label><input id="sh-ophone" value="${esc(d.owner_phone)}" placeholder="+998..."></div>
      <div class="field"><label>${t().owner_pass}</label><input id="sh-opass" value="${esc(d.owner_password)}"></div>
      <div class="field"><label>${t().plan}</label><input id="sh-plan" value="${esc(d.plan)}"></div><div class="form-err" id="sh-err"></div></div>
    <div class="modal-foot"><button class="btn" id="sh-cancel">${t().cancel}</button><button class="btn primary" id="sh-save">${t().save}</button></div>`;
  openOverlay(); $("#modal").querySelector(".x").onclick=closeOverlay; $("#sh-cancel").onclick=closeOverlay;
  $("#sh-save").onclick=()=>{ const b={name:$("#sh-name").value.trim(),owner_name:$("#sh-oname").value.trim(),owner_phone:$("#sh-ophone").value.trim(),owner_password:$("#sh-opass").value.trim(),plan:$("#sh-plan").value.trim()}; try{ isEdit?Data.updateShop(s.id,b):Data.addShop(b); closeOverlay(); renderShops(); }catch(e){ $("#sh-err").textContent=e.message; } };
}
function renderRequests(){
  const reqs=Data.requests();
  $("#view").innerHTML=`<div class="card" style="padding:22px;max-width:720px"><h3 style="margin:0 0 6px">${t().req_title}</h3>
    <p style="color:var(--muted);font-size:14px;line-height:1.6">${t().req_desc}</p>
    <div class="field"><label>${t().req_area}</label><select id="rq-area" style="width:100%;padding:11px 13px;border:1px solid var(--line-2);border-radius:10px"><option>Kassa</option><option>Mahsulotlar</option><option>Analitika</option><option>Do'konlar</option><option>Dizayn</option><option>Boshqa</option></select></div>
    <div class="field"><label>${t().req_text}</label><textarea id="rq-text" rows="4" style="width:100%;padding:11px 13px;border:1px solid var(--line-2);border-radius:10px;resize:vertical"></textarea></div>
    <button class="btn primary" id="rq-add">${t().req_send}</button></div>
    <div class="card" style="margin-top:14px">${reqs.length?`<table><thead><tr><th>#</th><th>${t().req_area}</th><th>${t().req_text}</th><th>${t().col_act}</th></tr></thead>
    <tbody>${reqs.map(r=>`<tr><td>${r.id}</td><td><span class="pill">${esc(r.area)}</span></td><td>${esc(r.text)}</td><td class="td-actions" style="white-space:nowrap"><button class="btn" data-copy="${r.id}" style="padding:6px 10px">${t().req_copy}</button> <button class="dots" data-del="${r.id}">${I.trash}</button></td></tr>`).join("")}</tbody></table>`:`<div class="empty">${t().req_none}</div>`}</div>`;
  $("#rq-add").onclick=()=>{ const text=$("#rq-text").value.trim(); if(!text)return; Data.addRequest({area:$("#rq-area").value,text}); renderRequests(); };
  $("#view").querySelectorAll("[data-copy]").forEach(b=>b.onclick=()=>{ const r=reqs.find(x=>x.id==b.dataset.copy); const msg=`[QahvaSaaS — o'zgartirish so'rovi]\nBo'lim: ${r.area}\nTavsif: ${r.text}\n\nIltimos shu o'zgarishni asosiy tizimga qo'shing.`; navigator.clipboard?.writeText(msg).then(()=>toast(t().req_copied)).catch(()=>prompt("Nusxa oling:",msg)); });
  $("#view").querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{ Data.deleteRequest(b.dataset.del); renderRequests(); });
}
