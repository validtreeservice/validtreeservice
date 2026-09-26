// User-started playback only. Pause other clips while retaining each clip's audio settings.
document.querySelectorAll('.story-film video').forEach(video=>video.addEventListener('play',()=>{
 document.querySelectorAll('.story-film video').forEach(other=>{if(other!==video)other.pause()});
}));
