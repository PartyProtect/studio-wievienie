(() => {
  const root = document.querySelector('.device');
  if (!(root instanceof HTMLElement) || root.dataset.ready) return;
  root.dataset.ready = 'true';

  const products = [
    { id:'toile', name:'Toile Terror Shirt', price:345, cat:'Tops', tag:'Designer fabric', sizes:['XS','S','M','L','XL'], photos:['/images/fancy-boogers/toile-terror-hero.webp','/images/fancy-boogers/toile-terror-look-01.webp','/images/fancy-boogers/toile-terror-look-02.webp'], blurb:'Boxy short-sleeve camp shirt cut from reworked designer toile de Jouy fabric — the real deal, monkeys and all. Finished with a hand-embroidered nose. Because it’s genuine designer cloth, only a handful will ever exist. Front + back are one continuous scene.' },
    { id:'blazer', name:'The Boogie Blazer', price:245, cat:'Outerwear', tag:'1 of 1', sizes:['S/M','L/XL'], photos:['/images/fancy-boogers/boogie-blazer-hero.webp','/images/fancy-boogers/boogie-blazer-look-01.webp','/images/fancy-boogers/boogie-blazer-look-02.webp'], blurb:'Reworked oversized vintage suit blazer with a felted nose brooch on the lapel and a hand-embroidered studio_wievien crest sprawled across the back. One of one — snot your dad’s old suit.' },
    { id:'nose', name:'The Original Booger', price:38, cat:'Accessories', tag:'1 of 1', sizes:['One size'], photos:['/images/fancy-boogers/fancy-boogers-nose-thumb.webp'], blurb:'A hand-knit felted nose brooch. Pin it to a lapel, a bag, a beanie — wherever needs a little snot appeal.' },
    { id:'beanie', name:'Snout Beanie', price:65, cat:'Accessories', tag:null, sizes:['One size'], photos:[], blurb:'Ribbed merino beanie with a tiny knitted nose on the cuff. Keeps your head warm, your humour warmer.' },
    { id:'tee', name:'Tissue Tee', price:55, cat:'Tops', tag:null, sizes:['XS','S','M','L','XL'], photos:[], blurb:'Boxy organic-cotton tee with a single embroidered booger. Understated. Slightly deranged. Perfect.' },
    { id:'hoodie', name:'Big Sniff Hoodie', price:185, cat:'Tops', tag:null, sizes:['XS','S','M','L','XL'], photos:[], blurb:'Heavyweight organic-cotton hoodie with a hand-embroidered nose on the chest. Oversized, unisex, snuggly.' },
    { id:'scarf', name:'Two-Tone Bogey Scarf', price:90, cat:'Knitwear', tag:'1 of 1', sizes:['One size'], photos:[], blurb:'Extra-long lambswool scarf in two clashing pinks. Wrap it twice and sniff proudly.' },
    { id:'cardi', name:'Booger Cardigan', price:280, cat:'Knitwear', tag:'Made to order', sizes:['S/M','L/XL'], photos:[], blurb:'Chunky hand-knit cardigan with wooden buttons and a nose patch pocket. Made to order in your colours.' },
    { id:'dress', name:'Nose-to-Toe Knit Dress', price:340, cat:'Dresses', tag:'1 of 1', sizes:['XS','S','M','L'], photos:[], blurb:'Floor-grazing rib-knit dress, knitted start to finish by hand. One of one. Snot for the faint-hearted.' },
    { id:'coat', name:'The Big Blanket Coat', price:460, cat:'Outerwear', tag:'Made to order', sizes:['S/M','L/XL'], photos:[], blurb:'Enormous hand-knit coat you could practically live inside. Wool blend, patch pockets, absurd warmth.' },
    { id:'tote', name:'Runny Nose Tote', price:120, cat:'Bags', tag:null, sizes:['One size'], photos:[], blurb:'Chunky hand-knit tote with a stitched booger motif. Holds your groceries and your dignity.' },
  ];
  const cats = ['All','Tops','Outerwear','Accessories','Knitwear','Dresses','Bags'];
  const featuredIds = ['toile','blazer','nose','dress'];
  let screen = 'home';
  let filter = 'All';
  let active = products[0];
  let selectedSize = active.sizes[0];
  let cart = [];
  let orderNum = 'FB-0000';
  let addTimer = null;

  const qs = (s, scope=root) => scope.querySelector(s);
  const qsa = (s, scope=root) => [...scope.querySelectorAll(s)];
  const euro = n => `€${n}`;
  const find = id => products.find(p => p.id === id) || products[0];
  const count = () => cart.reduce((n,l) => n + l.qty, 0);
  const subtotal = () => cart.reduce((n,l) => n + find(l.id).price * l.qty, 0);
  const shipping = () => count() === 0 ? 0 : (subtotal() >= 300 ? 0 : 12);
  const placeholderTone = id => ({beanie:'violet',tee:'acid',hoodie:'purple',scarf:'pink',cardi:'green',dress:'violet',coat:'acid',tote:'purple'}[id] || 'purple');

  function visual(p, className='') {
    if (p.photos.length) {
      const special = p.id === 'nose' ? ' nose-product' : '';
      return `<div class="visual ${className}${special}"><img src="${p.photos[0]}" alt="${p.name}">${p.tag ? `<span class="visual-tag">${p.tag}</span>` : ''}</div>`;
    }
    return `<div class="visual placeholder ${placeholderTone(p.id)} ${className}"><span class="placeholder-nose"><i></i><i></i></span><em>${p.name}</em>${p.tag ? `<span class="visual-tag">${p.tag}</span>` : ''}</div>`;
  }

  function card(p, variant='grid') {
    return `<button class="product-card ${variant}" type="button" data-open="${p.id}">${visual(p)}<span class="card-name">${p.name}</span><span class="card-bottom"><b>${euro(p.price)}</b>${variant === 'grid' ? `<small>${p.cat}</small>` : ''}</span></button>`;
  }

  function updateBadge() {
    const badge = qs('[data-cart-badge]');
    const n = count();
    if (badge) { badge.textContent = String(n); badge.hidden = n === 0; }
  }

  function renderFeatured() {
    const holder = qs('[data-featured]');
    if (!holder) return;
    holder.innerHTML = featuredIds.map(id => card(find(id),'featured')).join('');
    bindProductButtons(holder);
  }

  function renderHomeCats() {
    const holder = qs('[data-home-cats]');
    if (!holder) return;
    holder.innerHTML = cats.slice(1).map(cat => `<button type="button" data-home-cat="${cat}">${cat}</button>`).join('');
    holder.querySelectorAll('[data-home-cat]').forEach(btn => btn.addEventListener('click', () => { filter=btn.dataset.homeCat || 'All'; go('shop'); }));
  }

  function renderFilters() {
    const holder = qs('[data-filters]');
    if (!holder) return;
    holder.innerHTML = cats.map(cat => `<button type="button" class="filter ${cat===filter?'is-on':''}" data-filter="${cat}">${cat}</button>`).join('');
    holder.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => { filter=btn.dataset.filter || 'All'; renderShop(); }));
  }

  function renderShop() {
    renderFilters();
    const list = filter==='All' ? products : products.filter(p=>p.cat===filter);
    const countCopy = qs('[data-shop-count]');
    if (countCopy) countCopy.textContent = `${list.length} ${list.length===1?'piece':'pieces'}${filter==='All'?'':` in ${filter}`}`;
    const grid = qs('[data-shop-grid]');
    if (grid) { grid.innerHTML = list.map(p=>card(p)).join(''); bindProductButtons(grid); }
  }

  function bindProductButtons(scope=root) {
    scope.querySelectorAll('[data-open]').forEach(btn => btn.addEventListener('click', () => openProduct(btn.dataset.open)));
  }

  function openProduct(id) {
    active = find(id);
    selectedSize = active.sizes[0];
    const main = qs('[data-product-main]');
    if (main) main.innerHTML = visual(active,'product-visual');
    const extras = qs('[data-extra-views]');
    if (extras) {
      const extraPhotos = active.photos.slice(1);
      extras.hidden = extraPhotos.length === 0;
      extras.innerHTML = extraPhotos.map((src,i)=>`<button type="button" data-lightbox-src="${src}" aria-label="Open ${active.name} alternate view ${i+1}"><img src="${src}" alt="" /></button>`).join('');
      extras.querySelectorAll('[data-lightbox-src]').forEach(btn => btn.addEventListener('click',()=>openLightbox(btn.dataset.lightboxSrc || '')));
    }
    qs('[data-product-cat]').textContent = active.cat;
    qs('[data-product-name]').textContent = active.name;
    qs('[data-product-price]').textContent = euro(active.price);
    qs('[data-product-blurb]').textContent = active.blurb;
    renderSizes();
    const add = qs('[data-add]'); if(add) add.textContent = `Add to bag · ${euro(active.price)}`;
    const related = qs('[data-related]');
    if (related) { related.innerHTML = products.filter(p=>p.id!==active.id).slice(0,4).map(p=>card(p,'related-card')).join(''); bindProductButtons(related); }
    go('product', false);
  }

  function renderSizes() {
    const holder=qs('[data-sizes]'); if(!holder) return;
    holder.innerHTML=active.sizes.map(s=>`<button type="button" class="size ${s===selectedSize?'is-on':''}" data-size="${s}">${s}</button>`).join('');
    holder.querySelectorAll('[data-size]').forEach(btn=>btn.addEventListener('click',()=>{selectedSize=btn.dataset.size || active.sizes[0];renderSizes();}));
  }

  function addToBag() {
    const line=cart.find(l=>l.id===active.id && l.size===selectedSize);
    if(line) line.qty += 1; else cart.push({id:active.id,size:selectedSize,qty:1});
    updateBadge();
    const add=qs('[data-add]');
    if(add){ add.classList.add('added'); add.textContent='Added to bag ✓'; clearTimeout(addTimer); addTimer=setTimeout(()=>{add.classList.remove('added');add.textContent=`Add to bag · ${euro(active.price)}`;},1400); }
  }

  function renderCart() {
    const n=count();
    const copy=qs('[data-cart-count-copy]'); if(copy) copy.textContent=`${n} ${n===1?'item':'items'}`;
    const holder=qs('[data-cart-content]'); if(!holder) return;
    if(!n){
      holder.innerHTML=`<div class="empty-bag"><img src="/images/fancy-boogers/fancy-boogers-nose-thumb.webp" alt=""><h2>Nothing to pick yet.</h2><p>Your bag is as empty as a clean nose.</p><button type="button" data-empty-shop>Start rummaging</button></div>`;
      holder.querySelector('[data-empty-shop]')?.addEventListener('click',()=>go('shop'));
      return;
    }
    holder.innerHTML=`<div class="cart-lines">${cart.map((line,i)=>{const p=find(line.id);return `<div class="cart-line">${visual(p,'cart-thumb')}<div class="cart-line-copy"><div><strong>${p.name}</strong><button type="button" data-remove="${i}" aria-label="Remove ${p.name}">×</button></div><small>Size · ${line.size}</small><div class="qty-row"><span class="qty"><button type="button" data-dec="${i}">−</button><b>${line.qty}</b><button type="button" data-inc="${i}">+</button></span><em>${euro(p.price*line.qty)}</em></div></div></div>`}).join('')}</div><div class="totals"><p><span>Subtotal</span><b>${euro(subtotal())}</b></p><p><span>Shipping</span><b>${shipping()===0?'Free':euro(shipping())}</b></p><p class="grand"><span>Total</span><b>${euro(subtotal()+shipping())}</b></p></div><button class="checkout-button" type="button" data-go-checkout>Checkout · ${euro(subtotal()+shipping())}</button><p class="secure-note">🔒 Handmade to order · secure checkout</p>`;
    holder.querySelectorAll('[data-inc]').forEach(b=>b.addEventListener('click',()=>{cart[+b.dataset.inc].qty++;updateBadge();renderCart();}));
    holder.querySelectorAll('[data-dec]').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.dec;cart[i].qty--;if(cart[i].qty<=0)cart.splice(i,1);updateBadge();renderCart();}));
    holder.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>{cart.splice(+b.dataset.remove,1);updateBadge();renderCart();}));
    holder.querySelector('[data-go-checkout]')?.addEventListener('click',()=>go('checkout'));
  }

  function renderCheckout() {
    const summary=qs('[data-checkout-summary]');
    if(summary) summary.innerHTML=`<p><span>${count()} ${count()===1?'item':'items'}</span><b>${euro(subtotal())}</b></p><p><span>Shipping</span><b>${shipping()===0?'Free':euro(shipping())}</b></p><p class="grand"><span>Total</span><b>${euro(subtotal()+shipping())}</b></p>`;
    const place=qs('[data-place-order]'); if(place) place.textContent=`Place order · ${euro(subtotal()+shipping())}`;
  }

  function placeOrder(event) {
    event.preventDefault();
    const form=event.currentTarget;
    if(!(form instanceof HTMLFormElement)) return;
    const error=qs('[data-form-error]');
    if(!form.checkValidity()){ if(error) error.textContent='Fill in the demo checkout fields to continue.'; form.reportValidity(); return; }
    if(!cart.length){ go('shop'); return; }
    if(error) error.textContent='';
    orderNum=`FB-${Math.floor(1000+Math.random()*9000)}`;
    qs('[data-order-number]').textContent=`Order ${orderNum}`;
    cart=[];updateBadge();form.reset();go('confirmed');
  }

  function openLightbox(src){ if(!src)return; const lb=qs('[data-lightbox]');const img=qs('[data-lightbox-img]');if(lb&&img){img.src=src;lb.hidden=false;} }
  function closeLightbox(){ const lb=qs('[data-lightbox]');const img=qs('[data-lightbox-img]');if(lb&&img){lb.hidden=true;img.src='';} }

  function go(next, scroll=true) {
    screen=next;
    qsa('[data-screen]').forEach(el=>el.classList.toggle('is-active',el.dataset.screen===next));
    qsa('[data-nav]').forEach(el=>el.classList.toggle('is-current',el.dataset.nav===(next==='product'||next==='cart'||next==='checkout'?'shop':next)));
    if(next==='shop') renderShop();
    if(next==='cart') renderCart();
    if(next==='checkout') { if(!cart.length){screen='shop';renderShop();qsa('[data-screen]').forEach(el=>el.classList.toggle('is-active',el.dataset.screen==='shop'));} else renderCheckout(); }
    if(scroll){ const vp=qs('#fb-scroll'); if(vp) vp.scrollTop=0; }
  }

  qsa('[data-go]').forEach(btn=>btn.addEventListener('click',()=>{const target=btn.dataset.go; if(target) go(target);}));
  qs('[data-add]')?.addEventListener('click',addToBag);
  qs('[data-checkout-form]')?.addEventListener('submit',placeOrder);
  qs('[data-close-lightbox]')?.addEventListener('click',closeLightbox);
  qs('[data-lightbox]')?.addEventListener('click',e=>{if(e.target===qs('[data-lightbox]'))closeLightbox();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});

  renderFeatured();renderHomeCats();renderShop();updateBadge();go('home');
})();
