import './style.css'
import { selectors } from "./DOMselectors";
import { covers } from "./covers"

const URL = "https://taylorswiftapi.onrender.com";
let history = []

async function random_song(song, url){
  try {
    const response = await fetch(`${url}/get?song=${song}`, {            
      method: 'GET',
  });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function random_album(album, url){
  try {
    console.log(`${url}/get?album=${album}`)
    const response = await fetch(`${url}/get?album=${album}`, {            
      method: 'GET',
  });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function display(set){
  let bum = set.album.toLowerCase();
  return `
      <div class="polaroid">
        <img src=${covers[bum]}>
        <div class="caption">
        <h1>${set.album}</h1>
        <h2>${set.song}</h2>
        <p>${set.quote}</p>
      </div>
        
      </div>
  `
}

function history_display(set){
  return `
  <tr class="row">
    <td class="column">${set.album}</td>
    <td class="column song">${set.song}</td>
    <td class="column quote">${set.quote}</td>
  </tr>
  `
}

selectors.form.addEventListener('submit', function(e){
  e.preventDefault();
  let promise;
  if(selectors.album.checked === true){
    promise = random_album(selectors.name.value, URL)
  }
  else if(selectors.song.checked === true){
    promise = random_song(selectors.name.value, URL)
    
  }
  promise.then(function (el) {
    console.log(el);
    if (el != null) {
      history.push(el);
      selectors.display.innerHTML = display(el);
      selectors.right.innerHTML = `
      <table class="history">
          <caption>Lyric History</caption>
          <tr class="row">
        <th class="column">Album</th>
        <th class="column">Song</th>
        <th class="column">Lyric</th>
      </tr>
        </table>
      `
      selectors["history"] = document.querySelector(".history")
      history.forEach((set) => selectors.history.insertAdjacentHTML("beforeend", history_display(set)))
    }
    else{
      selectors.display.innerHTML = "Song or Album doesn't exist";
    }
    selectors.empty.innerHTML = ""
  });
  selectors.form.reset();
})