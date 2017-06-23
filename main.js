/*
  Here is a guide for the steps you could take:
*/



// 1. First select and store the elements you'll be working with

// SC API:
// id: 295688905,
// permalink: 'nh2playplay-preview',
// permalink_url: 'https://soundcloud.com/nohandsrecordings/nh2playplay-preview',
// title: 'NH2.Playplay Preview',
// stream_url: 'https://api.soundcloud.com/tracks/295688905/stream'
// artwork_url: 'https://i1.sndcdn.com/artworks-000196304785-qvqhbt-large.jpg',

var fetchedData = {};
var searchTerm = "";
var musicPlayer = document.querySelector('.music-player')
var resultsDiv = document.querySelector('.results-grid');
var nowPlaying = document.querySelector('.now-playing');
var myKey = "?client_id=41f6b5a26693fd92184ddd76aaeef8ef";

// 2. Create your `onSubmit` event for getting the user's search term
function searchSubmit() {
  console.log(document.querySelector('.search-box').value);
  searchTerm = document.querySelector('.search-box').value;
  console.log("search was: " + searchTerm);

// 3. Create your `fetch` request that is called after a submission

// https://api.soundcloud.com/tracks/?client_id=41f6b5a26693fd92184ddd76aaeef8ef/&q= &limit=18

fetch('https://api.soundcloud.com/tracks/' + myKey + '&q=' + searchTerm + '&limit=18')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return respone.json();
      }
      response.json().then(function(data) {
       fetchedData = data;

       //to-do:

// 4. Create a way to append the fetch results to your page

       function renderContent() {
         return `${fetchedData.map(track =>
           `<div class="result-item" id="${track.id}" data-src="${track.stream_url}" data-title="${track.title}">
           <div class="result-artwork">
           <img src="${track.artwork_url}"></div>
           <div class="result-title"><p>${track.title}</p></div>
           </div>`
         ).join('')}`
       }

       let markup = `${renderContent()}`;
       resultsDiv.innerHTML = markup;
      })
    }
  )
}

// 5. Create a way to listen for a click that will play the song in the audio play
resultsDiv.addEventListener("click", playTrack);

function playTrack(e) {
  var trackSource = e.target.getAttribute("data-src");
  var trackPlaying = e.target.getAttribute("data-title");
  nowPlaying.innerHTML = "Now playing: " + trackPlaying;
  musicPlayer.setAttribute("src", trackSource + myKey);
}
