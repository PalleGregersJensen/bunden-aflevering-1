import { favourites, endpoint, closeDetailView } from "./app.js";

let newFavourites = [];
let favouritesAsString;

// Load favorites from localStorage when the page loads
function loadFavoritesFromLocalStorage() {
  const favoritesAsString = localStorage.getItem("favouritesToBeStored");
  if (favoritesAsString) {
    newFavourites = JSON.parse(favoritesAsString);
    console.log(newFavourites);
    showFavouritesOnWebsite(newFavourites);
  }
}

// Call the function when the page loads
loadFavoritesFromLocalStorage();

// Add artist to favourites and push to favourites-array
function addArtistToFavourites(artistObject) {
  console.log("Add artist yo favourites");
  console.log(newFavourites);
  // newFavourites.findIndex(checkFavourites);
  // console.log(checkFavourites);
  // if (favourites > -1) {
  //   console.log("Artist already in list");
  //   console.log(artistObject);
  // } else
  
    console.log(artistObject);
    favourites.push(artistObject);
    console.log(favourites);
    // lav favourites om til string
    let favouritesAsString = JSON.stringify(favourites);
    console.log(favourites);
    localStorage.setItem("favouritesToBeStored", favouritesAsString);
  }


// show favourite artists on website and hide other features, that does not work here
function setupShowFavouriteArtists() {
  closeDetailView();
  console.log("Show favourite artists");
  document.querySelector("#sort-search-filter-create").classList.add("hidden");
  document.querySelector("#show-favourites-button").classList.add("hidden");
  document.querySelector("#show-all-artists-button").classList.remove("hidden");
  let favouritesAsString = localStorage.getItem("favouritesToBeStored");
  // lav favourites om til objekter i array igen
  newFavourites = JSON.parse(favouritesAsString);
  newFavourites.sort((a, b) => a.name.localeCompare(b.name));
  console.log(newFavourites);
  showFavouritesOnWebsite(newFavourites);
}

// loop through favourites-array and displayon website
function showFavouritesOnWebsite(artistList) {
  document.querySelector("#artist-list").innerHTML = "";
  if (artistList.length === 0) {
    console.log("Empty array in favourites");
    document.querySelector("#message-empty-list").showModal();
    document.querySelector("#message-empty-list-ok-button").addEventListener("click", closeNoFavouritesSelectedDialog);
  } else {
    for (const artist of artistList) {
      const favouritesHtml = /*html*/ `<div class="artist-container-in-favourites"><div>Name: ${artist.name} <br> Active since: ${artist.activeSince} <br> <img src="${artist.image}"/> <br></div> <button class="remove-artist-from-favourites-button">Remove from favourites</button> <br></div>`;
      document.querySelector("#artist-list").insertAdjacentHTML("beforeend", favouritesHtml);

      // remove from fovurites
      document
        .querySelector("#artist-list div:last-child .remove-artist-from-favourites-button")
        .addEventListener("click", () => removeArtistFromNewFavourites(artist));
    }
  }
}

function closeNoFavouritesSelectedDialog() {
  document.querySelector("#message-empty-list").close();
}

// remove artist from favourites
function removeArtistFromNewFavourites(artistObject) {
  console.log(artistObject);
  console.log(newFavourites);
  const artistToBeRemoved = newFavourites.indexOf(artistObject);
  console.log(artistToBeRemoved);
  if (artistToBeRemoved !== -1) {
    const removedArtist = newFavourites.splice(artistToBeRemoved, 1);
    console.log(removedArtist);
    console.log(newFavourites);
    localStorage.setItem("favouritesToBeStored", JSON.stringify(newFavourites));
    showFavouritesOnWebsite(newFavourites);
  } else {
  }
}
export { addArtistToFavourites, setupShowFavouriteArtists };
