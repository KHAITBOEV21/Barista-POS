// ============ BIZNES EGASI MODULI ============
function renderDashboard(){
  const draw=()=>{ if(state.route!=="analitika")return;
    const s=Data.stats(shopId());
    const hours=[]; for(let h=8;h<=22;h++){ const hh=String(h).padStart(2,"0"); const f=s.hourly.find(x=>x.h===hh); hours.push({h:hh,rev:f?f.revenue:0}); }
    const maxH=Math.max(1,...hours.map(x=>x.rev));
    $("#view").innerHTML=`
      <div class="stat-grid">
        <div class="stat accent"><div class="lab">${t().today_rev}</div><div class="val">${fmt(s.revenue)} <small>${t().som}</small></div></div>
        <div class="stat"><div class="lab">${t().sales_count}</div><div class="val">${s.orders}</div></div>
        <div class="stat"><div class="lab">${t().avg_check}</div><div class="val">${fmt(s.avg_check)} <small>${t().som}</small></div></div>
        <div class="stat"><div class="lab">${t().items_today}</div><div class="val">${s.items_sold}</div></div></div>
      <div class="panels">
        <div class="panel"><h3>${t().hourly}<span class="live">${t().live}</span></h3><div class="chart">${hours.map(x=>`<div class="bar-wrap"><div class="bar" style="height:${Math.round(x.rev/maxH*140)}px"></div><div class="bar-lab">${x.h}</div></div>`).join("")}</div></div>
        <div class="panel"><h3>${t().top5}</h3>${s.top.length?s.top.map((p,i)=>`<div class="tp-row"><div class="tp-rank">${i+1}</div><div class="tp-name">${esc(p.name)}</div><div class="tp-meta"><b>${p.qty}</b> · ${fmt(p.revenue)}</div></div>`).join(""):`<div class="cart-empty">${t().no_data}</div>`}</div></div>
      <div class="panels" style="margin-top:14px">
        <div class="panel"><h3>${t().recent_sales}<span class="live">${t().live}</span></h3>${s.recent.length?s.recent.map(o=>`<div class="recent-row"><span>#${o.id} · <span class="who">${esc(o.employee_name)}</span> · ${o.items} dona</span><span class="amt">${fmt(o.total)} ${t().som}</span></div>`).join(""):`<div class="cart-empty">${t().no_data}</div>`}</div>
        <div class="panel"><h3>${t().by_emp}</h3>${s.by_employee.length?s.by_employee.map(e=>`<div class="recent-row"><span>${esc(e.name)} <span class="who">(${e.orders})</span></span><span class="amt">${fmt(e.revenue)} ${t().som}</span></div>`).join(""):`<div class="cart-empty">${t().no_data}</div>`}</div></div>`;
  };
  draw(); liveTimer=setInterval(draw,4000);
}
function renderProducts(){
  const list=Data.products(shopId(),true);
  $("#view").innerHTML=`<div class="actions-row"><button class="btn primary" id="btn-addp">${I.plus} ${t().add_product}</button></div>
    <div class="card"><table><thead><tr><th>${t().c_name}</th><th>${t().c_cat}</th><th>${t().c_price}</th><th>${t().stock}</th><th>${t().c_opts}</th><th>${t().p_active}</th><th>${t().col_act}</th></tr></thead>
    <tbody>${list.length?list.map(p=>`<tr><td><b>${esc(p.name)}</b></td><td><span class="pill">${esc(p.category)}</span></td><td>${fmt(p.price)} ${t().som}</td><td>${typeof p.stock==="number"?(p.stock<=0?`<span style="color:#dc2626">${t().out_stock}</span>`:(p.stock<=5?`<span style="color:#d97706">${p.stock} ⚠</span>`:p.stock)):"∞"}</td><td class="tp-meta" style="text-align:left">${p.sizes.length} hajm · ${p.extras.length} qo'sh.</td><td>${p.active?'<span class="filial">✓</span>':'<span style="color:#dc2626">✕</span>'}</td><td class="td-actions"><button class="dots" data-id="${p.id}">${I.dots}</button></td></tr>`).join(""):`<tr><td colspan="7" class="empty">${t().no_products}</td></tr>`}</tbody></table></div>`;
  $("#btn-addp").onclick=()=>productForm();
  $("#view").querySelectorAll(".dots").forEach(btn=>btn.onclick=ev=>{ ev.stopPropagation(); closeMenus(); const p=list.find(x=>x.id==btn.dataset.id); const m=document.createElement("div"); m.className="row-menu"; m.innerHTML=`<button class="ed">${I.edit} ${t().edit}</button><button class="del">${I.trash} ${t().del}</button>`; btn.appendChild(m); m.querySelector(".ed").onclick=()=>{closeMenus();productForm(p);}; m.querySelector(".del").onclick=()=>{closeMenus();if(confirm(t().confirm_del)){Data.deleteProduct(p.id);renderProducts();}}; });
}
function productForm(p=null){
  const isEdit=!!p; const d=p||{name:"",category:"Qahva",price:0,sizes:[],extras:[],active:true,stock:""};
  let sizes=JSON.parse(JSON.stringify(d.sizes||[])), extras=JSON.parse(JSON.stringify(d.extras||[]));
  const draw=()=>{ $("#modal").innerHTML=`<div class="modal-head"><h3>${isEdit?t().edit_product:t().new_product}</h3><button class="x">&times;</button></div><div class="modal-body">
      <div class="field"><label>${t().p_name}</label><input id="p-name" value="${esc(d.name)}"></div>
      <div class="field"><label>${t().p_cat}</label><input id="p-cat" value="${esc(d.category)}" list="cats"><datalist id="cats"><option>Qahva</option><option>Choy</option><option>Desert</option><option>Boshqa</option></datalist></div>
      <div class="field"><label>${t().p_price} (${t().som})</label><input id="p-price" type="number" value="${d.price}"></div>
      <div class="field"><label>${t().stock} — ${t().stock_hint}</label><input id="p-stock" type="number" value="${d.stock??""}" placeholder="∞"></div>
      <div class="field"><label>${t().p_sizes}</label><div class="opt-rows" id="sz-rows">${sizes.map((s,i)=>`<div class="opt-line"><input class="nm" value="${esc(s.name)}" placeholder="${t().size_name}"><input class="pr" type="number" value="${s.delta}" placeholder="${t().price_delta}"><button class="del" data-srm="${i}">×</button></div>`).join("")}</div><button class="add-line" id="add-sz">${t().add_size}</button></div>
      <div class="field"><label>${t().p_extras}</label><div class="opt-rows" id="ex-rows">${extras.map((e,i)=>`<div class="opt-line"><input class="nm" value="${esc(e.name)}" placeholder="${t().extra_name}"><input class="pr" type="number" value="${e.price}" placeholder="${t().extra_price}"><button class="del" data-erm="${i}">×</button></div>`).join("")}</div><button class="add-line" id="add-ex">${t().add_extra}</button></div>
      <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer"><input type="checkbox" id="p-active" ${d.active?"checked":""}> ${t().p_active}</label><div class="form-err" id="p-err"></div></div>
      <div class="modal-foot"><button class="btn" id="p-cancel">${t().cancel}</button><button class="btn primary" id="p-save">${t().save}</button></div>`;
    const read=()=>{ sizes=[...$("#sz-rows").querySelectorAll(".opt-line")].map(r=>({name:r.querySelector(".nm").value.trim(),delta:+r.querySelector(".pr").value||0})).filter(s=>s.name); extras=[...$("#ex-rows").querySelectorAll(".opt-line")].map(r=>({name:r.querySelector(".nm").value.trim(),price:+r.querySelector(".pr").value||0})).filter(e=>e.name); d.name=$("#p-name").value; d.category=$("#p-cat").value; d.price=+$("#p-price").value; d.active=$("#p-active").checked; d.stock=$("#p-stock").value; };
    $("#modal").querySelector(".x").onclick=closeOverlay; $("#p-cancel").onclick=closeOverlay;
    $("#add-sz").onclick=()=>{read();sizes.push({name:"",delta:0});draw();}; $("#add-ex").onclick=()=>{read();extras.push({name:"",price:0});draw();};
    $("#sz-rows").querySelectorAll("[data-srm]").forEach(b=>b.onclick=()=>{read();sizes.splice(+b.dataset.srm,1);draw();});
    $("#ex-rows").querySelectorAll("[data-erm]").forEach(b=>b.onclick=()=>{read();extras.splice(+b.dataset.erm,1);draw();});
    $("#p-save").onclick=()=>{ read(); const payload={name:d.name.trim(),category:(d.category||"Boshqa").trim(),price:d.price||0,sizes,extras,active:d.active,stock:d.stock}; if(!payload.name){$("#p-err").textContent="Nom majburiy";return;} try{ isEdit?Data.updateProduct(p.id,payload):Data.addProduct(shopId(),payload); closeOverlay(); renderProducts(); }catch(e){$("#p-err").textContent=e.message;} };
  };
  draw(); openOverlay();
}
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
function renderReports(){
  const periods=[["today",t().p_today],["week",t().p_week],["month",t().p_month],["all",t().p_all]];
  if(!state._repPeriod)state._repPeriod="today";
  const draw=()=>{
    const now=new Date(); const to=dateKey(now); let from=to;
    if(state._repPeriod==="week"){ const d=new Date(now); d.setDate(d.getDate()-6); from=dateKey(d); }
    else if(state._repPeriod==="month"){ const d=new Date(now); d.setDate(d.getDate()-29); from=dateKey(d); }
    else if(state._repPeriod==="all"){ from="0000-00-00"; }
    const r=Data.report(shopId(),from,to); const maxD=Math.max(1,...r.by_day.map(x=>x.revenue));
    $("#view").innerHTML=`
      <div class="cat-tabs" style="margin-bottom:16px">${periods.map(([k,l])=>`<button class="cat-tab ${k===state._repPeriod?"active":""}" data-p="${k}">${l}</button>`).join("")}<button class="btn" id="rep-csv" style="margin-left:auto">${t().export_csv}</button></div>
      <div class="stat-grid">
        <div class="stat accent"><div class="lab">${t().rep_total}</div><div class="val">${fmt(r.revenue)} <small>${t().som}</small></div></div>
        <div class="stat"><div class="lab">${t().rep_orders}</div><div class="val">${r.orders}</div></div>
        <div class="stat"><div class="lab">${t().rep_avg}</div><div class="val">${fmt(r.avg_check)} <small>${t().som}</small></div></div>
        <div class="stat"><div class="lab">${t().rep_items}</div><div class="val">${r.items_sold}</div></div></div>
      <div class="stat-grid" style="grid-template-columns:repeat(3,1fr)">
        <div class="stat"><div class="lab">${t().rep_cash} 💵</div><div class="val" style="font-size:20px">${fmt(r.cash)}</div></div>
        <div class="stat"><div class="lab">${t().rep_card} 💳</div><div class="val" style="font-size:20px">${fmt(r.card)}</div></div>
        <div class="stat"><div class="lab">${t().rep_discount}</div><div class="val" style="font-size:20px">${fmt(r.discount)}</div></div></div>
      <div class="panels">
        <div class="panel"><h3>${t().rep_bydate}</h3>${r.by_day.length?`<div class="chart">${r.by_day.slice(-14).map(x=>`<div class="bar-wrap"><div class="bar" style="height:${Math.round(x.revenue/maxD*140)}px"></div><div class="bar-lab">${x.d.slice(5)}</div></div>`).join("")}</div>`:`<div class="cart-empty">${t().no_data}</div>`}</div>
        <div class="panel"><h3>${t().rep_top}</h3>${r.top.length?r.top.map((p,i)=>`<div class="tp-row"><div class="tp-rank">${i+1}</div><div class="tp-name">${esc(p.name)}</div><div class="tp-meta"><b>${p.qty}</b> · ${fmt(p.revenue)}</div></div>`).join(""):`<div class="cart-empty">${t().no_data}</div>`}</div></div>
      <div class="panel" style="margin-top:14px"><h3>${t().rep_byemp}</h3>${r.by_employee.length?r.by_employee.map(e=>`<div class="recent-row"><span>${esc(e.name)} <span class="who">(${e.orders})</span></span><span class="amt">${fmt(e.revenue)} ${t().som}</span></div>`).join(""):`<div class="cart-empty">${t().no_data}</div>`}</div>`;
    $("#view").querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{ state._repPeriod=b.dataset.p; draw(); });
    $("#rep-csv").onclick=()=>downloadFile("hisobot-"+from+"_"+to+".csv","\uFEFF"+Data.salesCSV(shopId()),"text/csv");
  };
  draw();
}
function renderSettings(){
  $("#view").innerHTML=`<div class="card" style="padding:24px;max-width:640px"><h3 style="margin:0 0 8px">${t().settings_title}</h3>
    <p style="color:var(--muted);font-size:14px;line-height:1.6">${t().backup_desc}</p>
    <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">
      <button class="btn primary" id="s-export">${I.gear} ${t().backup_download}</button>
      <button class="btn" id="s-csv">${t().export_csv}</button>
      <label class="btn" style="cursor:pointer">${t().backup_restore}<input type="file" id="s-import" accept="application/json" style="display:none"></label></div></div>`;
  $("#s-export").onclick=()=>downloadFile("qahva-zaxira-"+dateKey(new Date())+".json",Data.exportAll(),"application/json");
  $("#s-csv").onclick=()=>downloadFile("sotuvlar.csv","\uFEFF"+Data.salesCSV(state.user.role==="super"?null:shopId()),"text/csv");
  $("#s-import").onchange=ev=>{ const f=ev.target.files[0]; if(!f)return; if(!confirm(t().restore_confirm))return; const rd=new FileReader(); rd.onload=()=>{ try{ Data.importAll(rd.result); toast(t().restore_ok); showApp(); }catch(e){ toast(e.message,true); } }; rd.readAsText(f); };
}
function downloadFile(name,content,type){ const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([content],{type})); a.download=name; a.click(); URL.revokeObjectURL(a.href); }
