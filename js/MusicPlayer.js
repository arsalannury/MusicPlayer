const musicCover = document.querySelector('.music_img');
const musicName = document.querySelector('.music_name');
const musicTime = document.querySelector('.music_time_number');
const musicTimeRange = document.querySelector('.music_time');
const playBtn = document.querySelector('#play_btn');
const pauseBtn = document.querySelector('#pause_btn');
const nextBtn = document.querySelector('#next_btn');
const prevBtn = document.querySelector('#prev_btn');
let currentMusic = 0;

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

let audio = musicsList[currentMusic].music;

audio.addEventListener('timeupdate',(e) => {
   musicTimeRange.value =  e.target.currentTime
   musicTimeRange.max = e.target.duration
})
playBtn.addEventListener('click',(e) => {
    audio.play()
})