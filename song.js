let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");
//Get the  play 
let playAllButton=document.querySelector(".play-all-button");
const wrapper = document.querySelector('.wrapper');
const playbutton = document.querySelector('.play-button');
const download=document.querySelector('.download-button');


// Get the song list container element
const songListContainer = document.getElementById('song-list');

// Get the playlist button element
const playlistButton = document.getElementById('.playlist-button');


let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  
  {
    img: "images/Buhe-Vich-Punjabi-2023-20230921173141-500x500.jpg",
    name: "Buhe Vich",
    artist: "Neha kakkar and Rohnpreet singh",
    music:"music/Buhe Vich Neha Kakkar 128 Kbps.mp3",
  },
  
  {
    img: "images/download.jpeg",
    name: "lamborgini",
    artist: "The Doorbeen,Ragini Tandan ",
    music: "music/lamborgini.mp3",
  },
  {
    img: "images/Ve-Haaniyaan-Punjabi-2024-20240212220137-500x500.jpg",
    name: "ve hanniyaan",
    artist: "Danny ,avvy sara",
    music: "music/Ve Haaniyaan - (Raag.Fm).mp3",
  },
  {
    img: "images/Baarish-Mein-Tum-Hindi-2022-20220902211010-500x500.jpg",
    name: "Barrish Main Tum",
    artist: "Neha Kakkar,Rohanpreet ",
    music: 'music/Baarish Mein Tum Neha Kakkar 128 Kbps.mp3',
  }
  ,
  {
    img: "images/maxresdefault.jpg",
    name: "Maahi Ve",
    artist: "Neha kakkar",
    music: "music/Maahi Ve.mp3",
  }
  ,
  {
    img: "images/yaad piya ki.jpeg",
    name: "Yaad Piya Ki Aane Lagi ",
    artist: "Neha kakkar",
    music: "music/Yaad Piya Ki Aane Lagi Neha Kakkar 128 Kbps.mp3",
  },
  {
    img: "images/Angaaron-From-Pushpa-2-The-Rule-Hindi-2024-20240528221027-500x500.jpg",
    name: "Angaaron - Pushpa 2  ",
    artist: "shreya ghoshal",
    music: "music/128-Angaaron - Pushpa 2 The Rule 128 Kbps.mp3",
  },
  {
    img: "images/I-Hate-Luv-Storys-Hindi-2010-20190603134705-500x500.jpg",
    name: "Bahara - I Hate Luv Storys ",
    artist: "shreya ghoshal,sona-mahapatra",
    music: "music/128-Bahara - I Hate Luv Storys 128 Kbps.mp3",
  } ,
  {
    img: "images/ranjhana.jpeg",
    name: "Banarasiya  ",
    artist: "jasvindar singh,shreya ghoshal",
    music: "music/128-Banarasiya - Raanjhanaa 128 Kbps.mp3",
  },
   {
    img: "images/artworks-ve2FfyWD4nvVv4VU-J41Lkg-t500x500.jpg",
    name: "Mere Dholna - Bhool Bhulaiyaa ",
    artist: "shreya ghoshal,sonu nigam",
    music: "music/128-Mere Dholna - Bhool Bhulaiyaa 128 Kbps.mp3",
  },
   {
    img: "images/tum kya mile 2.png",
    name: "Tum Kya Mile ",
    artist: "shreya ghoshal",
    music: "music/128-Tum Kya Mile Shreyas Version - Rocky Aur Rani Kii Prem Kahaani 128 Kbps.mp3",
  },
   {
    img: "images/aashiqui.jpeg",
    name: "Sunn Raha Hai (Female) - Aashiqui 2  ",
    artist: "shreya ghoshal,arjit singh",
    music: "music/128-Sunn Raha Hai (Female) - Aashiqui 2 128 Kbps.mp3",
  }
  
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();
  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  // now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate("#");
  let Color2 = populate("#");
  var angle = "to right";

  let gradient =
    "linear-gradient(" + angle + "," + Color1 + ", " + Color2 + ")";
  // document.querySelector(".wrapper").style.background = gradient;
  document.querySelector("body").style.background = gradient;
}
function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Populate the song list container with song data
music_list.forEach((song, index) => {
  const songElement = document.createElement('div');
  songElement.style.color = 'gray';
  songElement.className = 'song-box';
  songElement.innerHTML = `
  <button class="play-button" data-index="${index}"><i class="fas fa-play" ></i></button>
    <img  src="${song.img}"alt="" style="width:30px; height: 30px;  margin-right:10px; margin-left:20px;  border: 0.5px solid white;">
   <span class="song-info">
    <span class="song-name" style="color:black;">${song.name}</span>

    
    <span class="song-artist" style="color:white;">by ${song.artist}</span>
  </span>


     <button class="add-song-button" data-playlist-index="${index}"><i class="fas fa-heart" style="color:red;"></i></button>
  `;
  songListContainer.appendChild(songElement);
});





// Add event listener to play buttons
document.querySelectorAll('.play-button').forEach((button) => {
  button.addEventListener('click', () => {
    const index = button.getAttribute('data-index');
    const songElement = button.closest('.song-box');
    const icon = button.querySelector('i');

    if (isPlaying && track_index === parseInt(index)) {
      pauseTrack();
      songElement.classList.remove('playing');
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
    } else {
      // Pause currently playing song
      if (isPlaying) {
        pauseTrack();
        const currentlyPlayingSong = document.querySelector('.song-box.playing');
        currentlyPlayingSong.classList.remove('playing');
        currentlyPlayingSong.querySelector('i').classList.remove('fa-pause');
        currentlyPlayingSong.querySelector('i').classList.add('fa-play');
      }

      // Play selected song
      loadTrack(index);
      playTrack();
      songElement.classList.add('playing');
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
      track_index = parseInt(index);
    }
  });
});




// Add event listener to add song buttons
document.querySelectorAll('.add-song-button').forEach((button) => {
  button.addEventListener('click', () => {
    const index = button.getAttribute('data-playlist-index');
    addSongToPlaylist(index);
  });
});


function addSongToPlaylist(index) {
  const song = music_list[index];
  const playlist = JSON.parse(localStorage.getItem('playlist')) || [];
  if (!playlist.find((s) => s.name === song.name)) {
    playlist.push(song);
    localStorage.setItem('playlist', JSON.stringify(playlist));
  } else {
    alert('Song is already in the playlist!');
  }
}




//play all function
function playAll() {
  const firstSongIndex = 0;
  if (!isPlaying) {
    playTrack(firstSongIndex);
    document.querySelector(`.play-button[data-index="${firstSongIndex}"]`)
    .classList.add('playing');
    document.querySelector('.play-all-button').classList.add('paused');
  
    isPlaying = true;
  } else {
    pauseTrack(firstSongIndex);
    document.querySelector(`.play-button[data-index="${firstSongIndex}"]`)
    .classList.remove('playing');
    document.querySelector('.play-all-button').classList.remove('paused');
    
    isPlaying = false;
  }
}




