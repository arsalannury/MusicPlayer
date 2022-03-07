const musicCover = document.querySelector(".music_img");
const musicName = document.querySelector(".music_name");
const musicTime = document.querySelector(".music_time_number");
const musicTimeRange = document.querySelector(".music_time");
const playBtn = document.querySelector("#play_btn");
const pauseBtn = document.querySelector("#pause_btn");
const nextBtn = document.querySelector("#next_btn");
const prevBtn = document.querySelector("#prev_btn");
const musicTimeAll = document.querySelector(".music_time_all");
const musicRepeat = document.querySelector(".music_repeat_icon");
const musicVolumeUp = document.getElementById("music_volumeup_icon");
const musicMute = document.getElementById("music_mute_icon");
const musicListCoverOne = document.querySelector(".music_list_cover1");
const musicListCoverTwo = document.querySelector(".music_list_cover2");
const musicListCoverThree = document.querySelector(".music_list_cover3");
const musicListCoverFour = document.querySelector(".music_list_cover4");
const musicListCoverFive = document.querySelector(".music_list_cover5");
const musicListNameOne = document.querySelector(".music_list_name1");
const musicListNameTwo = document.querySelector(".music_list_name2");
const musicListNameThree = document.querySelector(".music_list_name3");
const musicListNameFour = document.querySelector(".music_list_name4");
const musicListNameFive = document.querySelector(".music_list_name5");
const musicListTimeOne = document.querySelector(".music_list_time1");
const musicListTimeTwo = document.querySelector(".music_list_time2");
const musicListTimeThree = document.querySelector(".music_list_time3");
const musicListTimeFour = document.querySelector(".music_list_time4");
const musicListTimeFive = document.querySelector(".music_list_time5");
const t = new Audio("../musics/Shayea-YeMoghehaei2.mp3")
const musicItemList = document.querySelectorAll('.music_item_list .music_list_name')


const musicsList = [
  {
    music: new Audio("../musics/Shayea-Asabani.mp3"),
    name: "Shayea - Asabani",
    time: new Audio("../musics/Shayea-Asabani.mp3").duration,
    cover: "../pictures/asabani.jpg",
  },
  {
    music: new Audio("../musics/Shayea-YeMoghehaei2.mp3"),
    name: "Shayea-Ye Moghehaei 2",
    time: fmtMSS(Math.floor(t.duration)),
    cover: "../pictures/yemoghe.jpg",
  },
  {
    music: new Audio("../musics/Shayea-Daram.mp3"),
    name: "Shayea-Daram",
    time: new Audio("../musics/Shayea-Daram.mp3").duration,
    cover: "../pictures/daram.jpg",
  },
  {
    music: new Audio("../musics/Shayea-Sabr.mp3"),
    name: "Shayea-Sabr",
    time: new Audio("../musics/Shayea-Sabr.mp3").duration,
    cover: "../pictures/Sabr.jpg",
  },
  {
    music: new Audio("../musics/Shayea-Sabr2.mp3"),
    name: "Shayea-Sabr 2",
    time: new Audio("../musics/Shayea-Sabr2.mp3").duration,
    cover: "../pictures/sabr2.jpg",
  },
];

let currentMusic = 0;

// this function return cuurent time music and you can show it in DOM
function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

// config music object
let audio = musicsList[currentMusic].music;
musicCover.src = musicsList[currentMusic].cover;
musicName.innerText = musicsList[currentMusic].name;

//  this function change everytime which click on repeat mode
let repeatAfterEnd = () => {
  repeatIconUnActive();
};

// with this we can control cartmusic when music is end
const isMusicEnd = () => {
  musicTimeRange.value = 0;
  audio.currentTime = 0;
  audio.play();
};

const repeatIconUnActive = () => {
  if (audio.currentTime === audio.duration) {
    musicTimeRange.value = 0;
    audio.currentTime = 0;
    musicCover.style.animationPlayState = "paused";
    musicCover.style.animationName = "none";
    playBtn.classList.replace("bi-play-fill", "bi-pause-fill");
    currentMusic >= 4 ? (currentMusic = 0) : (currentMusic += 1);
    audio = musicsList[currentMusic].music;
    musicCover.src = musicsList[currentMusic].cover;
    musicName.innerText = musicsList[currentMusic].name;
    audio.play();
    audio.addEventListener("timeupdate", (e) => {
      musicTimeRange.value = e.target.currentTime;
      musicTimeRange.max = e.target.duration;
      musicTimeAll.innerText = fmtMSS(Math.floor(audio.duration));
      setInterval(() => {
        musicTime.innerText = fmtMSS(Math.floor(audio.currentTime));
      }, 1000);
      repeatAfterEnd();
    });
  }
};

// handler next and prev btn
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
    musicTimeAll.innerText = fmtMSS(Math.floor(audio.duration));
    setInterval(() => {
      musicTime.innerText = fmtMSS(Math.floor(audio.currentTime));
    }, 1000);
    repeatAfterEnd();
  });
};

//  audio events can play amd time update

audio.addEventListener("canplay", (e) => {
  musicTimeRange.max = e.target.duration;
  musicTimeAll.innerText = fmtMSS(Math.floor(audio.duration));
});

audio.addEventListener("timeupdate", (e) => {
  musicTimeRange.value = e.target.currentTime;
  musicTimeRange.max = e.target.duration;
  musicTimeAll.innerText = fmtMSS(Math.floor(audio.duration));
  setInterval(() => {
    musicTime.innerText = fmtMSS(Math.floor(audio.currentTime));
  }, 1000);
  repeatAfterEnd();
});

//  setting music range input

musicTimeRange.addEventListener("input", (e) => {
  audio.currentTime = e.target.value;
});

//  buttons events handler

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

// repeat event handler

musicRepeat.addEventListener("click", (e) => {
  if (e.target.classList.contains("music_repeat_icon")) {
    e.target.classList.replace("music_repeat_icon", "active_repeat_icon");
    repeatAfterEnd = () => {
      if (audio.currentTime === audio.duration) {
        isMusicEnd();
      }
    };
  } else {
    e.target.classList.replace("active_repeat_icon", "music_repeat_icon");
    repeatAfterEnd = () => {
      repeatIconUnActive();
    };
  }
});

// mute button handler

musicVolumeUp.addEventListener("click", (e) => {
  if (!audio.muted) {
    e.target.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
    audio.muted = true;
  } else {
    e.target.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
    audio.muted = false;
  }
});

// ___________________________________________________________________________

musicListCoverOne.src = musicsList[0].cover;
musicListCoverTwo.src = musicsList[1].cover;
musicListCoverThree.src = musicsList[2].cover;
musicListCoverFour.src = musicsList[3].cover;
musicListCoverFive.src = musicsList[4].cover;

// musicListNameOne.innerText = musicsList[0].name;
// musicListNameTwo.innerText = musicsList[1].name;
// musicListNameThree.innerText = musicsList[2].name;
// musicListNameFour.innerText = musicsList[3].name;
// musicListNameFive.innerText = musicsList[4].name;

musicItemList.forEach((element,index) => {
  element[index].innerText = musicsList[index].name;
})


musicListTimeOne.innerText = musicsList[0].time
musicListTimeTwo.innerText = musicsList[1].time
musicListTimeThree.innerText = musicsList[2].time
musicListTimeFour.innerText = musicsList[3].time
musicListTimeFive.innerText = musicsList[4].time
