const musicCover = document.querySelector(".music_img");
const musicName = document.querySelector(".music_name");
const musicTime = document.querySelector(".music_time_number");
const musicTimeRange = document.querySelector(".music_time");
const playBtn = document.querySelector("#play_btn");
const pauseBtn = document.querySelector("#pause_btn");
const nextBtn = document.querySelector("#next_btn");
const prevBtn = document.querySelector("#prev_btn");

const musicsList = [
  {
    music: new Audio("../musics/Shayea-Asabani.mp3"),
    name: "Shayea - Asabani",
    time: "",
    cover: "../pictures/asabani.jpg",
  },
  {
    music: new Audio("../musics/Shayea-YeMoghehaei2.mp3"),
    name: "Shayea-Ye Moghehaei 2",
    time: "",
    cover: "../pictures/yemoghe.jpg",
  },
  {
    music: new Audio("../musics/Shayea-Daram.mp3"),
    name: "Shayea-Daram",
    time: "",
    cover: "../pictures/daram.jpg",
  },
  {
    music: new Audio("../musics/Shayea-Sabr.mp3"),
    name: "Shayea-Sabr",
    time: "",
    cover: "../pictures/Sabr.jpg",
  },
  {
    music: new Audio("../musics/Shayea-Sabr2.mp3"),
    name: "Shayea-Sabr 2",
    time: "",
    cover: "../pictures/sabr2.jpg",
  },
];

let currentMusic = 0;

let audio = musicsList[currentMusic].music;
musicCover.src = musicsList[currentMusic].cover;
musicName.innerText = musicsList[currentMusic].name;

const isMusicEnd = () => {
  musicTimeRange.value = 0;
  audio.currentTime = 0;
  audio.play();
};

const changeMusic = () => {
  audio = musicsList[currentMusic].music;
  musicCover.src = musicsList[currentMusic].cover;
  musicName.innerText = musicsList[currentMusic].name;
  musicCover.style.animationPlayState = "paused";
  musicCover.style.animationName = "none";
  musicTimeRange.value = 0;
  audio.currentTime = 0;
  audio.addEventListener("timeupdate", (e) => {
    musicTimeRange.value = e.target.currentTime;
    musicTimeRange.max = e.target.duration;
    musicTime.innerText = Math.floor(e.target.currentTime);
    if (audio.currentTime === audio.duration) {
      isMusicEnd();
    }
  });
};

audio.addEventListener("canplay", (e) => {
  musicTimeRange.max = e.target.duration;
});

audio.addEventListener("timeupdate", (e) => {
  musicTimeRange.value = e.target.currentTime;
  musicTimeRange.max = e.target.duration;
  musicTime.innerText = Math.floor(e.target.currentTime);
  if (audio.currentTime === audio.duration) {
    isMusicEnd();
  }
});

musicTimeRange.addEventListener("input", (e) => {
  audio.currentTime = e.target.value;
});

playBtn.addEventListener("click", (e) => {
  if (audio.paused) {
    audio.play();
    e.target.classList.replace("bi-play-fill", "bi-pause-fill");
    musicCover.style.animationPlayState = "running";
    musicCover.style.animationName = "equalizer";
  } else {
    audio.pause();
    e.target.classList.replace("bi-pause-fill", "bi-play-fill");
    musicCover.style.animationPlayState = "paused";
    musicCover.style.animationName = "none";
  }
});

nextBtn.addEventListener("click", () => {
  if (audio.played) audio.pause();
  playBtn.classList.replace("bi-pause-fill", "bi-play-fill");
  currentMusic >= 4 ? (currentMusic = 0) : (currentMusic += 1);
  changeMusic();
});

prevBtn.addEventListener("click", () => {
  if (audio.played) audio.pause();
  playBtn.classList.replace("bi-pause-fill", "bi-play-fill");
  currentMusic <= 0 ? (currentMusic = 4) : (currentMusic -= 1);
  changeMusic();
});
