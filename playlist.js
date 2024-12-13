// Get the playlist container element
const playlistContainer = document.getElementById('playlist-container');

// Get the playlist list element
const playlistList = document.getElementById('playlist-list');


// Get the playlist from local storage
const playlist = JSON.parse(localStorage.getItem('playlist')) || [];





// Populate the playlist list
playlist.forEach((song, index) => {
  
  const songElement = document.createElement('li');
  songElement.className = 'song-box';
  songElement.innerHTML = `
  <button class="play-button" data-index="${index}"><i class="fas fa-play" ></i></button>
    <img src="${song.img}"alt="" style="width:30px; height: 30px; margin-left:30px; border: 0.5px solid white;">
     <span class="song-name">${song.name}</span>
    <span class="song-artist">by ${song.artist}</span>
    

    <button class="remove-song-button" data-playlist-index="${index}">-</button>
  `;
  
  playlistContainer.appendChild(songElement);
});


function loadTrack(index) {
  clearInterval(updateTimer);
  reset();
  const currentPlaylist = JSON.parse(localStorage.getItem('playlist')) || playlist;
  curr_track.src = currentPlaylist[index].music;
  curr_track.load();
  track_art.style.backgroundImage = "url(" + currentPlaylist[index].img + ")";
  track_name.textContent = currentPlaylist[index].name;
  track_artist.textContent = currentPlaylist[index].artist;
  updateTimer = setInterval(setUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

// Add event listener to play buttons
document.querySelectorAll('.play-button').forEach((button) => {
  button.addEventListener('click', () => {
    const index = button.getAttribute('data-index');
    const songElement = button.closest('.song-box');
    if (isPlaying && track_index === parseInt(index)) {
      pauseTrack();
      songElement.classList.remove('playing');
    } else {
      loadTrack(index);
      playTrack();
      songElement.classList.add('playing');
    }
  });
});







// Add event listener to remove song buttons
document.querySelectorAll('.remove-song-button').forEach((button) => {
  button.addEventListener('click', () => {
    const index = button.getAttribute('data-playlist-index');
    removeSongFromPlaylist(index);
  });
});



// Function to remove song from playlist
function removeSongFromPlaylist(index) {
  const playlist = JSON.parse(localStorage.getItem('playlist')) || [];
  playlist.splice(index, 1);
  localStorage.setItem('playlist', JSON.stringify(playlist));
  window.location.reload();
}



