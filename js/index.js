const music = document.getElementById("music");
const sound = document.getElementById("sound");

const setMusic = () => {
  return (
    (localStorage["music"] = music.checked),
    (localStorage["sound"] = sound.checked)
  );
};
document.addEventListener("DOMContentLoaded", setMusic);
music.addEventListener("input", setMusic);
sound.addEventListener("input", setMusic);
