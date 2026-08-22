const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
if(header) window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30));
if(menuButton&&nav){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',open);document.body.classList.toggle('menu-open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');document.body.classList.remove('menu-open')}));}
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const form=document.getElementById('estimate-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const body=`Hi Valid Tree Service, I'd like a free estimate.\n\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nAddress: ${d.get('address')}\nService: ${d.get('service')}\nProject: ${d.get('details')}\n\nI can attach photos in this text.`;location.href=`sms:+18324456535?&body=${encodeURIComponent(body)}`});
function prepareMutedVideo(v){if(!v)return;v.muted=true;v.defaultMuted=true;v.volume=0;v.setAttribute('muted','');v.setAttribute('playsinline','');v.setAttribute('webkit-playsinline','')}
async function playMuted(v){if(!v)return false;prepareMutedVideo(v);try{await v.play();return true}catch{return false}}
const hero=document.getElementById('hero-video'),start=document.getElementById('video-start');
prepareMutedVideo(hero);
window.addEventListener('DOMContentLoaded',async()=>{if(hero&&!(await playMuted(hero))&&start)start.classList.add('show')});
if(start)start.addEventListener('click',async()=>{if(await playMuted(hero))start.classList.remove('show')});
document.querySelectorAll('.scroll-video').forEach(v=>{prepareMutedVideo(v);const videoObserver=new IntersectionObserver(async entries=>{for(const entry of entries){if(entry.isIntersecting){await playMuted(entry.target)}else{entry.target.pause()}}},{threshold:.3});videoObserver.observe(v)});
const slides=[...document.querySelectorAll('.review-slide')],dots=[...document.querySelectorAll('.review-dots button')];let current=0,timer;function showReview(i){if(!slides.length)return;current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===current));dots.forEach((d,n)=>d.classList.toggle('active',n===current))}function auto(){clearInterval(timer);timer=setInterval(()=>showReview(current+1),5500)}
document.querySelector('.review-arrow.prev')?.addEventListener('click',()=>{showReview(current-1);auto()});document.querySelector('.review-arrow.next')?.addEventListener('click',()=>{showReview(current+1);auto()});dots.forEach((d,i)=>d.addEventListener('click',()=>{showReview(i);auto()}));showReview(0);auto();
const lightbox=document.getElementById('lightbox');if(lightbox){const img=lightbox.querySelector('img');const close=()=>{lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');img.src=''};document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{img.src=item.dataset.full;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false')}));lightbox.querySelector('.lightbox-close')?.addEventListener('click',close);lightbox.addEventListener('click',e=>{if(e.target===lightbox)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
const galleryFilters=[...document.querySelectorAll('.gallery-filter a')];
function selectGalleryFilter(link){galleryFilters.forEach(item=>{item.classList.remove('is-active');item.removeAttribute('aria-current')});link.classList.add('is-active');link.setAttribute('aria-current','location')}
galleryFilters.forEach(link=>link.addEventListener('click',()=>selectGalleryFilter(link)));
if(location.hash){const matchingFilter=galleryFilters.find(link=>link.hash===location.hash);if(matchingFilter)selectGalleryFilter(matchingFilter)}
