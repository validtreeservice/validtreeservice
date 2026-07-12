const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30));
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',open);document.body.classList.toggle('menu-open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('estimate-form').addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(e.currentTarget);
  const subject=`Estimate request - ${data.get('name')} - ${data.get('service')}`;
  const body=`Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nProperty address: ${data.get('address')}\nService: ${data.get('service')}\n\nProject details:\n${data.get('details')}\n\nPlease attach any property photos before sending.`;
  window.location.href=`mailto:validtreeservice@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
