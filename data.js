const LS="qahva_saas_v1";
let store=safeLoad();
function safeLoad(){ try{ return JSON.parse(localStorage.getItem(LS)); }catch(e){ return null; } }
function persist(){ try{ localStorage.setItem(LS, JSON.stringify(store)); }catch(e){ console.warn(e); } }
function dateKey(d){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function nextId(){ return ++store.seq; }
function shopById(id){ return store.shops.find(s=>s.id==id); }

function seedIfEmpty(){
  if(store && store.shops) return;
  const cs=[{name:"S",delta:0},{name:"M",delta:4000},{name:"L",delta:8000}];
  const ce=[{name:"Qo'shimcha shot",price:4000},{name:"Sirop",price:3000},{name:"Sut (o'simlik)",price:4000}];
  store={ seq:200, session:null,
    supers:[{id:1,name:"Bosh administrator",phone:"+998900000000",password:"admin123"}],
    roles:[{id:1,name:"Администратор"},{id:2,name:"Кассир"},{id:3,name:"Менеджер"}],
    shops:[
      {id:31,name:"Qahva Vaqti",owner_name:"Aziz Karimov",owner_phone:"+998911111111",owner_password:"owner123",plan:"Test",created_at:new Date().toISOString()},
      {id:32,name:"Coffee Break",owner_name:"Dilnoza Yusupova",owner_phone:"+998922222222",owner_password:"owner123",plan:"Test",created_at:new Date().toISOString()},
    ],
    employees:[
      {id:41,shop_id:31,name:"Kassir 1",phone:"+998937421881",password:"1234",position:"xodim",role:"Кассир",kassa:"(1) kassa"},
      {id:42,shop_id:31,name:"Kassir 2",phone:"+998918591716",password:"1234",position:"xodim",role:"Кассир",kassa:"(1) kassa"},
      {id:43,shop_id:32,name:"Kassir A",phone:"+998933333333",password:"1234",position:"xodim",role:"Кассир",kassa:"(1) kassa"},
    ],
    products:[
      {id:51,shop_id:31,name:"Espresso",category:"Qahva",price:12000,sizes:[{name:"Single",delta:0},{name:"Double",delta:6000}],extras:[{name:"Qo'shimcha shot",price:4000}],active:true},
      {id:52,shop_id:31,name:"Americano",category:"Qahva",price:15000,sizes:cs,extras:ce,active:true},
      {id:53,shop_id:31,name:"Cappuccino",category:"Qahva",price:18000,sizes:cs,extras:ce,active:true},
      {id:54,shop_id:31,name:"Latte",category:"Qahva",price:20000,sizes:cs,extras:ce,active:true},
      {id:55,shop_id:31,name:"Choy",category:"Choy",price:10000,sizes:[{name:"S",delta:0},{name:"L",delta:3000}],extras:[{name:"Limon",price:2000}],active:true},
      {id:56,shop_id:31,name:"Croissant",category:"Desert",price:14000,sizes:[],extras:[],active:true,stock:8},
      {id:57,shop_id:32,name:"Flat White",category:"Qahva",price:22000,sizes:cs,extras:ce,active:true},
      {id:58,shop_id:32,name:"Raf",category:"Qahva",price:24000,sizes:cs,extras:ce,active:true},
      {id:59,shop_id:32,name:"Cheesecake",category:"Desert",price:25000,sizes:[],extras:[],active:true,stock:6},
    ],
    orders:[], requests:[],
  };
  persist();
}
seedIfEmpty();

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
  shops(){ return store.shops.map(s=>({...s})); },
  shopsWithStats(){ const today=dateKey(new Date());
    return store.shops.map(s=>{ const os=store.orders.filter(o=>o.shop_id===s.id&&o.dateKey===today&&o.status!=="cancelled");
      return {...s,today_revenue:os.reduce((a,o)=>a+o.total,0),today_orders:os.length,cashiers:store.employees.filter(e=>e.shop_id===s.id).length}; }); },
  addShop(b){ if(!b.name||!b.owner_phone)throw new Error("Do'kon nomi va telefon majburiy"); const s={id:nextId(),name:b.name,owner_name:b.owner_name||"Egasi",owner_phone:b.owner_phone,owner_password:b.owner_password||"owner123",plan:b.plan||"Test",created_at:new Date().toISOString()}; store.shops.push(s); persist(); return s; },
  updateShop(id,b){ const s=shopById(id); if(!s)throw new Error("Topilmadi"); Object.assign(s,{name:b.name??s.name,owner_name:b.owner_name??s.owner_name,owner_phone:b.owner_phone??s.owner_phone,plan:b.plan??s.plan}); if(b.owner_password)s.owner_password=b.owner_password; persist(); return s; },
  deleteShop(id){ store.shops=store.shops.filter(s=>s.id!=id); store.employees=store.employees.filter(e=>e.shop_id!=id); store.products=store.products.filter(p=>p.shop_id!=id); store.orders=store.orders.filter(o=>o.shop_id!=id); persist(); },
  products(shopId,all){ let r=store.products.filter(p=>p.shop_id==shopId); if(!all)r=r.filter(p=>p.active); return r.map(p=>({...p})); },
  addProduct(shopId,p){ const np={id:nextId(),shop_id:shopId,name:p.name,category:p.category||"Boshqa",price:Math.round(+p.price||0),sizes:p.sizes||[],extras:p.extras||[],active:p.active!==false}; if(p.stock!==""&&p.stock!=null)np.stock=Math.max(0,Math.round(+p.stock||0)); store.products.push(np); persist(); return np; },
  updateProduct(id,b){ const p=store.products.find(x=>x.id==id); if(!p)throw new Error("Topilmadi"); Object.assign(p,{name:b.name??p.name,category:b.category??p.category,price:Math.round(b.price??p.price),sizes:b.sizes??p.sizes,extras:b.extras??p.extras,active:b.active===undefined?p.active:!!b.active}); if(b.stock===""||b.stock==null)delete p.stock; else p.stock=Math.max(0,Math.round(+b.stock||0)); persist(); return p; },
  deleteProduct(id){ store.products=store.products.filter(x=>x.id!=id); persist(); },
  employees(shopId,q){ let r=store.employees.filter(e=>e.shop_id==shopId).reverse(); if(q){q=q.toLowerCase(); r=r.filter(e=>e.name.toLowerCase().includes(q)||e.phone.toLowerCase().includes(q));} return r.map(e=>({id:e.id,name:e.name,phone:e.phone,position:e.position,role:e.role,kassa:e.kassa})); },
  addEmployee(shopId,b){ if(!b.name||!b.phone)throw new Error("Ism va telefon majburiy"); const e={id:nextId(),shop_id:shopId,name:b.name,phone:b.phone,password:b.password||"1234",position:b.position||"xodim",role:b.role||"Кассир",kassa:b.kassa||"(1) kassa"}; store.employees.push(e); persist(); return e; },
  updateEmployee(id,b){ const e=store.employees.find(x=>x.id==id); if(!e)throw new Error("Topilmadi"); Object.assign(e,{name:b.name??e.name,phone:b.phone??e.phone,position:b.position??e.position,role:b.role??e.role,kassa:b.kassa??e.kassa}); if(b.password)e.password=b.password; persist(); return e; },
  deleteEmployee(id){ store.employees=store.employees.filter(x=>x.id!=id); persist(); },
  roles(){ return store.roles.slice(); },
  createOrder(shopId,items,actor,opts){
    opts=opts||{}; const built=[]; let subtotal=0;
    for(const it of items){ const p=store.products.find(x=>x.id==it.product_id); if(!p)continue;
      const sd=(p.sizes.find(s=>s.name===it.size)||{}).delta||0;
      const chosen=(it.extras||[]).filter(n=>p.extras.some(e=>e.name===n));
      const ep=chosen.reduce((s,n)=>s+((p.extras.find(e=>e.name===n)||{}).price||0),0);
      const qty=Math.max(1,+it.qty||1),unit=p.price+sd+ep,line=unit*qty; subtotal+=line;
      built.push({product_id:p.id,product_name:p.name,size:it.size||"",extras:chosen.join(", "),qty,unit_price:unit,line_total:line}); }
    if(!built.length)throw new Error("Savat bo'sh");
    let discount=Math.max(0,Math.round(+opts.discount||0)); if(discount>subtotal)discount=subtotal;
    const total=subtotal-discount,method=opts.payment_method||"cash";
    const paid=method==="cash"?Math.round(+opts.paid||total):total,change=method==="cash"?Math.max(0,paid-total):0;
    const cashback=Math.max(0,Math.round(+opts.cashback||0));
    built.forEach(b=>{ const p=store.products.find(x=>x.id==b.product_id); if(p&&typeof p.stock==="number")p.stock=Math.max(0,p.stock-b.qty); });
    const now=new Date();
    const order={id:nextId(),shop_id:shopId,employee_id:actor.ref_id,employee_name:actor.name,subtotal,discount,total,payment_method:method,paid,change,cashback,status:"done",created_at:now.toISOString(),dateKey:dateKey(now),items:built};
    store.orders.push(order); persist(); return order;
  },
  ordersList(shopId,limit){ let r=store.orders.filter(o=>o.shop_id==shopId).sort((a,b)=>b.id-a.id); if(limit)r=r.slice(0,limit); return JSON.parse(JSON.stringify(r)); },
  cancelOrder(id){ const o=store.orders.find(x=>x.id==id); if(!o||o.status==="cancelled")return; o.items.forEach(i=>{ const p=store.products.find(x=>x.id==i.product_id); if(p&&typeof p.stock==="number")p.stock+=i.qty; }); o.status="cancelled"; persist(); },
  stats(shopId){ const today=dateKey(new Date());
    const td=store.orders.filter(o=>o.shop_id==shopId&&o.dateKey===today&&o.status!=="cancelled");
    const revenue=td.reduce((s,o)=>s+o.total,0),orders=td.length,items_sold=td.reduce((s,o)=>s+o.items.reduce((a,i)=>a+i.qty,0),0);
    const m={}; td.forEach(o=>o.items.forEach(i=>{ (m[i.product_name]=m[i.product_name]||{name:i.product_name,qty:0,revenue:0}); m[i.product_name].qty+=i.qty; m[i.product_name].revenue+=i.line_total; }));
    const top=Object.values(m).sort((a,b)=>b.qty-a.qty).slice(0,5);
    const recent=store.orders.filter(o=>o.shop_id==shopId&&o.status!=="cancelled").sort((a,b)=>b.id-a.id).slice(0,8).map(o=>({id:o.id,employee_name:o.employee_name,total:o.total,items:o.items.reduce((a,i)=>a+i.qty,0)}));
    const em={}; td.forEach(o=>{ (em[o.employee_name]=em[o.employee_name]||{name:o.employee_name,orders:0,revenue:0}); em[o.employee_name].orders++; em[o.employee_name].revenue+=o.total; });
    const by_employee=Object.values(em).sort((a,b)=>b.revenue-a.revenue);
    const hh={}; td.forEach(o=>{ const h=String(new Date(o.created_at).getHours()).padStart(2,"0"); hh[h]=(hh[h]||0)+o.total; });
    const hourly=Object.entries(hh).map(([h,revenue])=>({h,revenue}));
    return {revenue,orders,avg_check:orders?Math.round(revenue/orders):0,items_sold,top,recent,by_employee,hourly};
  },
  report(shopId,fromKey,toKey){
    const rows=store.orders.filter(o=>o.shop_id==shopId&&o.status!=="cancelled"&&o.dateKey>=fromKey&&o.dateKey<=toKey);
    const revenue=rows.reduce((s,o)=>s+o.total,0),orders=rows.length,items_sold=rows.reduce((s,o)=>s+o.items.reduce((a,i)=>a+i.qty,0),0);
    const discount=rows.reduce((s,o)=>s+(o.discount||0),0);
    const cash=rows.filter(o=>o.payment_method!=="card").reduce((s,o)=>s+o.total,0);
    const card=rows.filter(o=>o.payment_method==="card").reduce((s,o)=>s+o.total,0);
    const m={}; rows.forEach(o=>o.items.forEach(i=>{ (m[i.product_name]=m[i.product_name]||{name:i.product_name,qty:0,revenue:0}); m[i.product_name].qty+=i.qty; m[i.product_name].revenue+=i.line_total; }));
    const top=Object.values(m).sort((a,b)=>b.revenue-a.revenue).slice(0,10);
    const em={}; rows.forEach(o=>{ (em[o.employee_name]=em[o.employee_name]||{name:o.employee_name,orders:0,revenue:0}); em[o.employee_name].orders++; em[o.employee_name].revenue+=o.total; });
    const by_employee=Object.values(em).sort((a,b)=>b.revenue-a.revenue);
    const dd={}; rows.forEach(o=>{ dd[o.dateKey]=(dd[o.dateKey]||0)+o.total; });
    const by_day=Object.entries(dd).map(([d,revenue])=>({d,revenue})).sort((a,b)=>a.d<b.d?-1:1);
    return {revenue,orders,items_sold,discount,cash,card,avg_check:orders?Math.round(revenue/orders):0,top,by_employee,by_day};
  },
  overview(){ const today=dateKey(new Date()); const td=store.orders.filter(o=>o.dateKey===today&&o.status!=="cancelled");
    return {shops:store.shops.length,revenue:td.reduce((a,o)=>a+o.total,0),orders:td.length,cashiers:store.employees.length}; },
  requests(){ return store.requests.slice().reverse(); },
  addRequest(b){ const r={id:nextId(),area:b.area,text:b.text,status:"Yangi",created_at:new Date().toISOString()}; store.requests.push(r); persist(); return r; },
  deleteRequest(id){ store.requests=store.requests.filter(x=>x.id!=id); persist(); },
  exportAll(){ return JSON.stringify(store,null,2); },
  importAll(txt){ const d=JSON.parse(txt); if(!d.shops)throw new Error("Noto'g'ri fayl"); store=d; persist(); },
  salesCSV(shopId){ const rows=[["Sana","Chek","Xodim","Mahsulot","Hajm","Qo'shimcha","Soni","Narx","Jami"]];
    store.orders.filter(o=>!shopId||o.shop_id==shopId).forEach(o=>o.items.forEach(i=>rows.push([o.created_at.slice(0,19).replace("T"," "),o.id,o.employee_name,i.product_name,i.size,i.extras,i.qty,i.unit_price,i.line_total])));
    return rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n"); },
};
