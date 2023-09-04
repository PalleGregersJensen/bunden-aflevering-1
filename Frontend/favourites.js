import { favourites, endpoint } from "./app.js";

// Add artist to favourites and push to favourites-array
function addArtistToFavourites(artistObject) {
  console.log("læses dette");
  console.log(artistObject);
  favourites.push(artistObject);
  console.log(favourites);
  let favouritesAsString = JSON.stringify(favourites);
  console.log(favourites);
  localStorage.setItem("favouritesToBeStored", favouritesAsString);
}
// show favourite artists on website and hide other features, that does not work here
function showFavouriteArtists() {
  console.log("Show favourite artists");
  document.querySelector("#sort-search-filter-create").classList.add("hidden");
  document.querySelector("#show-favourites-button").classList.add("hidden");
  document.querySelector("#show-all-artists-button").classList.remove("hidden");
  let favouritesAsString = localStorage.getItem("favouritesToBeStored");
  let newfavourites = JSON.parse(favouritesAsString);
  showFavouritesOnWebsite(newfavourites);
}

function showFavouritesOnWebsite(artistList) {
  document.querySelector("#artist-list").innerHTML = "";
  for (const artist of artistList) {
    const favouritesHtml = /*html*/ `<div>Name: ${artist.name} <br> Active since: ${artist.activeSince} <br> <img src="${artist.image}"/> <br> <button class="remove-artist-from-fvourites-button">Remove from favourites</button> <br></button></div></button>`;
    document.querySelector("#artist-list").insertAdjacentHTML("beforeend", favouritesHtml);
  }
}

export { addArtistToFavourites, showFavouriteArtists };
