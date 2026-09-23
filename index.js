const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const showCheckbox = document.querySelector(".showletterspiano input");
const volumeValue = document.querySelector("#volumeValue");

let allTunes = [];
let currentVolume = 1; // global volume

function playTune(key) {
  const audio = new Audio(`tunes/${key}.wav`);
  audio.volume = currentVolume; // apply global volume to each new note
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  if (clickedKey) {
    clickedKey.classList.add("active");
    setTimeout(() => clickedKey.classList.remove("active"), 150);
  }
}

pianoKeys.forEach(key => {
  allTunes.push(key.dataset.key);
  key.addEventListener("click", () => playTune(key.dataset.key));
});

function pressedKey(e) {
  if (allTunes.includes(e.key)) playTune(e.key);
}

function handleVolume(e) {
  currentVolume = e.target.value; // update global volume
  volumeValue.innerText = Math.floor(currentVolume * 100); // show percentage
}

function showHideLetters() {
  pianoKeys.forEach(key => {
    key.classList.toggle("hide");
  });
}

showCheckbox.addEventListener("click", showHideLetters);
document.addEventListener("keydown", pressedKey);
volumeSlider.addEventListener("input", handleVolume);
