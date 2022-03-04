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

const changeMusic = () => {
  audio = musicsList[currentMusic].music;
  musicCover.src = musicsList[currentMusic].cover;
  musicName.innerText = musicsList[currentMusic].name;
};

// audio.addEventListener("canplay", (e) => {
//   musicTimeRange.max = e.target.duration;
//   musicTimeRange.value = e.target.currentTime;
//   console.log(22)
// });

audio.addEventListener("timeupdate", (e) => {
  musicTimeRange.value = e.target.currentTime;
  musicTimeRange.max = e.target.duration;
  musicTime.innerText = Math.floor(e.target.currentTime);
});

musicTimeRange.addEventListener("input", (e) => {
  audio.currentTime = e.target.value;
});

playBtn.addEventListener("click", (e) => {
  if (audio.paused) {
    audio.play();
    e.target.classList.replace("bi-play-fill", "bi-pause-fill");
  } else {
    audio.pause();
    e.target.classList.replace("bi-pause-fill", "bi-play-fill");
  }
});

nextBtn.addEventListener("click", (e) => {
  if(audio.played) audio.pause();
  playBtn.classList.replace("bi-pause-fill", "bi-play-fill");
  currentMusic += 1;
  changeMusic();
  musicTimeRange.value = audio.currentTime;
});
