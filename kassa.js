// ============ KASSIR MODULI ============
function renderKassa(){
  state.products=Data.products(shopId());
  const cats=["__all__",...new Set(state.products.map(p=>p.category))];
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
    return list.length?list.map(p=>{ const out=typeof p.stock==="number"&&p.stock<=0;
      return `<button class="prod-card" data-id="${p.id}" ${out?"disabled style=opacity:.45":""}><div class="pc-cat">${esc(p.category)}${typeof p.stock==="number"?` · ${out?t().out_stock:p.stock+" "+t().stock.toLowerCase()}`:""}</div><div class="pc-name">${esc(p.name)}</div><div class="pc-price">${fmt(p.price)} ${t().som}</div></button>`; }).join(""):`<div class="cart-empty">${t().no_products}</div>`; };
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
    $("#pp-add").onclick=()=>{ const unit=calc(),optLabel=[size,...extras].filter(Boolean).join(", "); state.cart.push({product_id:p.id,name:p.name,size,extras:[...extras],optLabel,qty,unit,line:unit*qty}); closeOverlay(); if(window.__refreshCart)window.__refreshCart(); };
  };
  draw(); openOverlay();
}
function checkout(){
  if(!state.cart.length)return;
  const subtotal=state.cart.reduce((s,c)=>s+c.line,0);
  let discount=0, method="cash", paid=subtotal, cashback=0;
  const CB=k=>t()[k]|| ({cashback_lbl:"Keshbek",cashback_none:"Yo'q"})[k];
  const draw=()=>{
    const total=Math.max(0,subtotal-discount);
    const change=method==="cash"?Math.max(0,paid-total):0;
    const enough=method==="card"||paid>=total;
    $("#modal").innerHTML=`<div class="modal-head"><h3>${t().pay_title}</h3><button class="x">&times;</button></div>
      <div class="modal-body">
        <div class="recent-row"><span>${t().subtotal}</span><span>${fmt(subtotal)} ${t().som}</span></div>
        <div class="field" style="margin-top:10px"><label>${t().discount} (${t().som})</label><input id="pay-disc" type="number" value="${discount}" min="0"></div>
        <div class="opt-group"><div class="t">${t().pay_method}</div><div class="opt-chips">
          <div class="chip ${method==="cash"?"sel":""}" data-m="cash">💵 ${t().cash}</div>
          <div class="chip ${method==="card"?"sel":""}" data-m="card">💳 ${t().card}</div></div></div>
        <div class="opt-group"><div class="t">${CB("cashback_lbl")}</div>
          <div class="opt-chips">
            <div class="chip ${cashback===0?"sel":""}" data-cb="0">${CB("cashback_none")}</div>
            <div class="chip" data-cbp="5">5%</div><div class="chip" data-cbp="10">10%</div></div>
          <input id="pay-cb" type="number" value="${cashback}" min="0" style="margin-top:8px;width:100%;padding:9px 11px;border:1px solid var(--line-2);border-radius:9px"></div>
        ${method==="cash"?`<div class="field"><label>${t().received} (${t().som})</label><input id="pay-recv" type="number" value="${paid}" min="0"></div>`:""}
        <div class="cart-total"><span>${t().total}</span><span>${fmt(total)} ${t().som}</span></div>
        ${method==="cash"?`<div class="recent-row"><span>${t().change}</span><span class="amt" style="color:var(--green)">${fmt(change)} ${t().som}</span></div>`:""}
        ${cashback>0?`<div class="recent-row"><span>${CB("cashback_lbl")}</span><span class="amt" style="color:#2f6fe0">+${fmt(cashback)} ${t().som}</span></div>`:""}
        ${!enough?`<div class="form-err">${t().not_enough}</div>`:""}
      </div>
      <div class="modal-foot"><button class="btn" id="pay-cancel">${t().cancel}</button><button class="btn primary" id="pay-ok" ${enough?"":"disabled style=opacity:.5"}>${t().pay_now} · ${fmt(total)}</button></div>`;
    $("#modal").querySelector(".x").onclick=closeOverlay; $("#pay-cancel").onclick=closeOverlay;
    $("#modal").querySelectorAll("[data-m]").forEach(c=>c.onclick=()=>{ method=c.dataset.m; if(method==="cash")paid=Math.max(0,subtotal-discount); draw(); });
    $("#modal").querySelectorAll("[data-cbp]").forEach(c=>c.onclick=()=>{ cashback=Math.round(Math.max(0,subtotal-discount)*(+c.dataset.cbp)/100); draw(); });
    const cb0=$("#modal").querySelector("[data-cb]"); if(cb0)cb0.onclick=()=>{ cashback=0; draw(); };
    const di=$("#pay-disc"); if(di)di.oninput=()=>{ discount=Math.max(0,+di.value||0); if(method==="cash")paid=Math.max(0,subtotal-discount); draw(); di2focus("pay-disc"); };
    const cbi=$("#pay-cb"); if(cbi)cbi.oninput=()=>{ cashback=Math.max(0,+cbi.value||0); draw(); di2focus("pay-cb"); };
    const rv=$("#pay-recv"); if(rv)rv.oninput=()=>{ paid=Math.max(0,+rv.value||0); draw(); di2focus("pay-recv"); };
    $("#pay-ok").onclick=()=>{ try{ const order=Data.createOrder(shopId(),state.cart.map(c=>({product_id:c.product_id,size:c.size,extras:c.extras,qty:c.qty})),state.user,{discount,payment_method:method,paid,cashback}); state.cart=[]; closeOverlay(); showReceipt(order); toast(t().sold_ok); }catch(e){ toast(e.message,true); } };
  };
  draw(); openOverlay();
}
function di2focus(id){ const el=$("#"+id); if(el){ const v=el.value; el.focus(); el.value=""; el.value=v; } }
function receiptHTML(order){
  const shop=shopById(order.shop_id)||{name:"Qahvaxona"}; const dt=new Date(order.created_at); const pad=n=>String(n).padStart(2,"0");
  const when=`${pad(dt.getDate())}.${pad(dt.getMonth()+1)}.${dt.getFullYear()} ${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
  const CB=t().cashback_lbl||"Keshbek";
  return `<div id="receipt">
    <div class="r-shop">${esc(shop.name)}</div>
    <div class="r-meta">${when}<br>${t().receipt} #${order.id} · ${t().cashier_lbl}: ${esc(order.employee_name)}</div>
    <div class="r-line"></div>
    ${order.items.map(i=>`<div class="r-item"><span>${esc(i.product_name)}${i.size?" ("+esc(i.size)+")":""}${i.extras?" +"+esc(i.extras):""} × ${i.qty}</span><span>${fmt(i.line_total)}</span></div>`).join("")}
    <div class="r-line"></div>
    <div class="r-item"><span>${t().subtotal}</span><span>${fmt(order.subtotal)}</span></div>
    ${order.discount?`<div class="r-item"><span>${t().discount}</span><span>-${fmt(order.discount)}</span></div>`:""}
    <div class="r-item r-total"><span>${t().total}</span><span>${fmt(order.total)} ${t().som}</span></div>
    <div class="r-item"><span>${order.payment_method==="card"?t().card:t().cash}</span><span>${fmt(order.paid)}</span></div>
    ${order.payment_method==="cash"&&order.change?`<div class="r-item"><span>${t().change}</span><span>${fmt(order.change)}</span></div>`:""}
    ${order.cashback?`<div class="r-item"><span>${CB}</span><span>+${fmt(order.cashback)}</span></div>`:""}
    <div class="r-line"></div><div class="r-thanks">${t().receipt_thanks}</div></div>`;
}
function showReceipt(order){
  $("#modal").innerHTML=`<div class="modal-head"><h3>${t().receipt} #${order.id}</h3><button class="x">&times;</button></div>
    <div class="modal-body"><div class="receipt-box">${receiptHTML(order)}</div></div>
    <div class="modal-foot"><button class="btn" id="rc-close">${t().new_sale}</button><button class="btn primary" id="rc-print">${I.print} ${t().print}</button></div>`;
  openOverlay();
  const close=()=>{ closeOverlay(); if(state.route==="kassa")renderKassa(); };
  $("#modal").querySelector(".x").onclick=close; $("#rc-close").onclick=close; $("#rc-print").onclick=()=>printReceipt(order);
}
function printReceipt(order){ let a=document.getElementById("print-area"); if(!a){a=document.createElement("div");a.id="print-area";document.body.appendChild(a);} a.innerHTML=receiptHTML(order); window.print(); }
function renderOrders(){
  const rows=Data.ordersList(shopId(),100);
  $("#view").innerHTML=`<div class="card"><table><thead><tr><th>${t().col_check}</th><th>${t().col_time}</th><th>${t().cashier_lbl}</th><th>${t().col_total}</th><th>${t().col_pay}</th><th>${t().col_status}</th><th>${t().col_act}</th></tr></thead>
    <tbody>${rows.length?rows.map(o=>{ const dt=new Date(o.created_at); const hm=String(dt.getHours()).padStart(2,"0")+":"+String(dt.getMinutes()).padStart(2,"0"); const canc=o.status==="cancelled";
      return `<tr style="${canc?"opacity:.5":""}"><td><b>#${o.id}</b></td><td>${hm}</td><td>${esc(o.employee_name)}</td><td><b>${fmt(o.total)}</b> ${t().som}</td><td><span class="pill">${o.payment_method==="card"?t().card:t().cash}</span></td><td>${canc?`<span style="color:#dc2626">${t().st_cancelled}</span>`:`<span class="filial">${t().st_done}</span>`}</td><td class="td-actions"><button class="dots" data-id="${o.id}">${I.dots}</button></td></tr>`; }).join(""):`<tr><td colspan="7" class="empty">${t().no_checks}</td></tr>`}</tbody></table></div>`;
  $("#view").querySelectorAll(".dots").forEach(btn=>btn.onclick=ev=>{ ev.stopPropagation(); closeMenus();
    const o=rows.find(x=>x.id==btn.dataset.id); const m=document.createElement("div"); m.className="row-menu";
    m.innerHTML=`<button class="view">${I.print} ${t().view}</button>${o.status!=="cancelled"?`<button class="del">${I.trash} ${t().cancel_order}</button>`:""}`; btn.appendChild(m);
    m.querySelector(".view").onclick=()=>{ closeMenus(); showReceipt(o); };
    const d=m.querySelector(".del"); if(d)d.onclick=()=>{ closeMenus(); if(confirm(t().cancel_confirm)){ Data.cancelOrder(o.id); renderOrders(); } };
  });
}
