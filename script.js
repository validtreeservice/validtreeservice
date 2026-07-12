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


// iPhone/Safari video handling.
const heroVideo = document.getElementById('hero-video');
const videoStartButton = document.getElementById('video-start');
const scrollVideos = document.querySelectorAll('.scroll-video');

function prepareInlineVideo(video) {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
}

async function tryPlay(video) {
  if (!video) return false;
  prepareInlineVideo(video);
  try {
    await video.play();
    return true;
  } catch (error) {
    return false;
  }
}

prepareInlineVideo(heroVideo);
window.addEventListener('DOMContentLoaded', async () => {
  const played = await tryPlay(heroVideo);
  if (!played && videoStartButton) videoStartButton.classList.add('show');
});

if (videoStartButton) {
  videoStartButton.addEventListener('click', async () => {
    if (await tryPlay(heroVideo)) videoStartButton.classList.remove('show');
  });
}

// A real tap anywhere can unlock playback when Safari blocks autoplay.
const unlockVideos = async () => {
  await tryPlay(heroVideo);
  if (videoStartButton && !heroVideo.paused) videoStartButton.classList.remove('show');
  document.removeEventListener('touchstart', unlockVideos);
  document.removeEventListener('click', unlockVideos);
};
document.addEventListener('touchstart', unlockVideos, { passive: true });
document.addEventListener('click', unlockVideos);

// Only play the lower-page video while it is visible. This is more reliable on iPhone.
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(async (entry) => {
    const video = entry.target;
    if (entry.isIntersecting) {
      await tryPlay(video);
    } else {
      video.pause();
    }
  });
}, { threshold: 0.35 });

scrollVideos.forEach(video => {
  prepareInlineVideo(video);
  videoObserver.observe(video);
});
