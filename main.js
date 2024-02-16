//*html eleman çağırma
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");

const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

//şarkı sırası
let index;

//döngü durumu
let loop = true;

const songLists = [
  {
    name: "Kül",
    link: "assets/kül.mp3",
    artist: "Cem Adrian",
    image: "assets/cem-adrian.jpg",
  },
  {
    name: "Nalan",
    link: "assets/nalan.mp3",
    artist: "Emircan İğrek",
    image: "assets/emircan-iğrek.jpg",
  },
  {
    name: "Beni anla",
    link: "assets/beni anla.mp3",
    artist: "Emre Aydın & Çağan Şengül",
    image: "assets/emre-çağan.jpg",
  },
  {
    name: "Fırtınadayım",
    link: "assets/fırtınadayım.mp3",
    artist: "Mabel Matiz",
    image: "assets/mabel-matiz.jpg",
  },
  {
    name: "Seni dert etmeler",
    link: "assets/seni dert etmeler.mp3",
    artist: "Madrigal",
    image: "assets/madrigal.jpg",
  },
  {
    name: "Ateşe düştüm",
    link: "assets/ateşe düştüm.mp3",
    artist: "Mert Demir",
    image: "assets/mert-demir.jpg",
  },
  {
    name: "Galiba",
    link: "assets/galiba.mp3",
    artist: "Sagopa Kajmer",
    image: "assets/sagopa.jpg",
  },
];

//zaman düzenleme
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;

  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;

  return `${minute}:${second}`;
};

//sarkı atama
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songLists[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
  playListContainer.classList.add("hide");
  playAudio();
};

//sesi aç
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

//ses ilerlemesi
progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;

  let coordEnd = event.clientX;

  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";

  audio.currentTime = progress * audio.duration;

  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});
//başlangıç süresi f.
setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);
//çizgiye tıklandığında saniyeyi aynı anda değiştiren f.
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//sonraki sarkı
const nextSong = () => {
  if (loop) {
    if (index == songLists.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songLists.length);
    setSong(randIndex);
  }
};

//sarkı bittiğinde
audio.onended = () => {
  nextSong();
};

//tekrar durumu
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
  }
});

//karıştırıcı ac (shuffle)
shuffleButton.addEventListener("click", () => {
    if (shuffleButton.classList.contains("active")) {
      shuffleButton.classList.remove("active");
      audio.loop = true;
    } else {
      shuffleButton.classList.add("active");
      audio.loop = false;
    }
  });


//önceki sarkı
const prevSong = () => {
  if (index > 0) {
    //sarkıyı durdur
    index -= 1;
  } else {
    index = songLists.length - 1;
  }
  setSong(index);
};

//pause butonu
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//sarkı listesi aç
playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

//sarkı listesi kapat
closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

//sarkı listesini oluştur
const initializePlayList = () => {
  for (let i in songLists) {
    playListSongs.innerHTML += `<li class="playlistSong" 
        onclick ="setSong(${i})">
        <div class="playlist-image-container">
            <img src="${songLists[i].image}"/>
        </div>
        <div class="playlist-song-detailes">
            <span id="playlist-song-name">
                ${songLists[i].name}
            </span>
            <span id="playlist-song-artist-name">
                ${songLists[i].artist}
            </span>
        </div>
    </li> `;
  }
};

//ekran yüklenildiğinde
window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initializePlayList();
};

//play button
playButton.addEventListener("click", playAudio);

//next button
nextButton.addEventListener("click", nextSong);

//prev button
prevButton.addEventListener("click", prevSong);

//pause button
pauseButton.addEventListener("click", pauseAudio);
