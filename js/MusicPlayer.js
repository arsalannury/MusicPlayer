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
const allElementMusicList = document.querySelector(".music_ul_list");
const musicListIconShow = document.querySelector(".music_list_icon_show");
const musicListResponsive = document.querySelector(".music_list");
const closeBackdrop = document.querySelector("#close_backdrop");
const downloadBtn = document.querySelector('.download_btn');

const musicItemListNames = document.querySelectorAll(
  ".music_item_list .music_list_name"
);
const musicItemListCovers = document.querySelectorAll(
  ".music_item_list .music_list_cover"
);
const musicItemListTimes = document.querySelectorAll(
  ".music_item_list .music_list_time"
);

const musicsList = [
  {
    music: new Audio("../musics/Shayea-Asabani.mp3"),
    name: "Shayea - Asabani",
    download:
      "https://dl.musicguitar.ir/Music/Shayea/128/Shayea%20-%20Asabani%20%5B128%5D.mp3",
    cover: "../pictures/asabani.jpg",
  },
  {
    music: new Audio("../musics/Shayea-YeMoghehaei2.mp3"),
    name: "Shayea-Ye Moghehaei 2",
    download:
      "https://dl.musicguitar.ir/Music/Shayea/320/Shayea%20-%20Ye%20Moghehaei%202%20%28FT.%20Mahyar%29%20%5B320%5D.mp3",
    cover: "../pictures/yemoghe.jpg",
  },
  {
    music: new Audio("../musics/Shayea-Daram.mp3"),
    name: "Shayea-Daram",
    download:
      "https://dl.sakhamusic.ir/97/shahrivar/01/Shayea-Daram-(Ft-Sajadii).mp3",
    cover: "../pictures/daram.jpg",
  },
  {
    music: new Audio("../musics/Shayea-Sabr.mp3"),
    name: "Shayea-Sabr",
    download: "https://dl.melovy.ir/2021/02/Shayea-Sabr1.mp3",
    cover: "../pictures/Sabr.jpg",
  },
  {
    music: new Audio("../musics/Shayea-Sabr2.mp3"),
    name: "Shayea-Sabr 2",
    download:
      "https://dl.my-ahangha.ir/up/2018/Shayea%20-%20Sabr%202.mp3",
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
downloadBtn.href = musicsList[currentMusic].download;

//  this function change everytime which click on repeat mode
let repeatAfterEnd = () => {
  repeatIconUnActive();
};

// with this we can control cartmusic when music is end
const isMusicEnd = () => {
  musicTimeRange.value = 0;
  audio.currentTime = 0;
  musicCover.style.animationPlayState = "running";
  audio.play();
};

// if repeat was un active music change
function repeatIconUnActive() {
  if (audio.currentTime === audio.duration) {
    playBtn.classList.replace("bi-play-fill", "bi-pause-fill");
    currentMusic >= 4 ? (currentMusic = 0) : (currentMusic += 1);
    audio = musicsList[currentMusic].music;
    musicCover.src = musicsList[currentMusic].cover;
    musicName.innerText = musicsList[currentMusic].name;
    downloadBtn.href = musicsList[currentMusic].download;
    musicTimeRange.value = 0;
    audio.currentTime = 0;
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
}

// handler next and prev btn
const changeMusic = () => {
  audio = musicsList[currentMusic].music;
  musicCover.src = musicsList[currentMusic].cover;
  musicName.innerText = musicsList[currentMusic].name;
  downloadBtn.href = musicsList[currentMusic].download;
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

  musicItemListTimes.forEach((element, index) => {
    element.innerText = fmtMSS(Math.floor(musicsList[index].music.duration));
  });
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
// music list functionality - - - - - - - - - - - - - - - - - - - - - - - - -

function clickOnEachMusicInList(indexMusic) {
  currentMusic = indexMusic;
  if (audio.played) audio.pause();
  playBtn.classList.replace("bi-pause-fill", "bi-play-fill");
  changeMusic();
  handleCloseMusicList();
}

musicItemListCovers.forEach((element, index) => {
  element.src = musicsList[index].cover;
});

musicItemListNames.forEach((element, index) => {
  element.innerText = musicsList[index].name;
});

Array.from(allElementMusicList.children).forEach((liElement, index) => {
  liElement.addEventListener("click", (e) => {
    switch (index) {
      case 1:
        clickOnEachMusicInList(0);
        break;
      case 2:
        clickOnEachMusicInList(1);
        break;
      case 3:
        clickOnEachMusicInList(2);
        break;
      case 4:
        clickOnEachMusicInList(3);
        break;
      case 5:
        clickOnEachMusicInList(4);
        break;
      default:
        null;
    }
  });
});

musicListIconShow.addEventListener("click", (e) => {
  closeBackdrop.style.display = "unset";
  musicListResponsive.style.transform = "translateX(0)";
  document.querySelector(".backdrop").style.display = "unset";
});

closeBackdrop.addEventListener("click", () => {
  handleCloseMusicList();
});

function handleCloseMusicList() {
  closeBackdrop.style.display = "none";
  musicListResponsive.style.transform = "translateX(-1000px)";
  document.querySelector(".backdrop").style.display = "none";
}
