import { favourites, endpoint } from "./app.js";

let newFavourites = [];
let favouritesAsString;

// Load favorites from localStorage when the page loads
function loadFavoritesFromLocalStorage() {
  const favoritesAsString = localStorage.getItem("favouritesToBeStored");
  if (favoritesAsString) {
    newFavourites = JSON.parse(favoritesAsString);
    showFavouritesOnWebsite(newFavourites);
  }
}

// Call the function when the page loads
loadFavoritesFromLocalStorage();

// Add artist to favourites and push to favourites-array
function addArtistToFavourites(artistObject) {
//   if (newFavourites.find((artistObject) => newFavourites.includes(artistObject))) {
//     console.log("Artist already in list");
//   } else
  {
    console.log("læses dette");
    console.log(artistObject);
    favourites.push(artistObject);
    console.log(favourites);
    // lav favourites om til string
    let favouritesAsString = JSON.stringify(favourites);
    console.log(favourites);
    localStorage.setItem("favouritesToBeStored", favouritesAsString);
  }
}

// show favourite artists on website and hide other features, that does not work here
function showFavouriteArtists() {
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
    // if (artistList.length === 0) {
    //     console.log("Empty array in favourites");
    //     document.querySelector("#message-empty-list").classList.remove("hidden");
    // } else 
    {
  document.querySelector("#artist-list").innerHTML = "";
  for (const artist of artistList) {
    const favouritesHtml = /*html*/ `<div>Name: ${artist.name} <br> Active since: ${artist.activeSince} <br> <img src="${artist.image}"/> <br> <button class="remove-artist-from-favourites-button">Remove from favourites</button> <br></button></div></button>`;
    document.querySelector("#artist-list").insertAdjacentHTML("beforeend", favouritesHtml);

    // remove from fovurites
    document
      .querySelector("#artist-list div:last-child .remove-artist-from-favourites-button")
      .addEventListener("click", () => removeArtistFromNewFavourites(artist));
  }
}
}
// remove artist from favourites
function removeArtistFromNewFavourites(artistObject) {
  console.log(artistObject);
  console.log(newFavourites);
  const artistToBeRemoved = newFavourites.indexOf(artistObject);
  console.log(artistToBeRemoved);
  // const artistToBeRemovedSeceondPosition = artistToBeRemoved;
  //   console.log(artistToBeRemovedSeceondPosition);
  if (artistToBeRemoved !== -1) {
    const removedArtist = newFavourites.splice(artistToBeRemoved, 1);
    console.log(removedArtist);
    console.log(newFavourites);
    localStorage.setItem("favouritesToBeStored", JSON.stringify(newFavourites));
    showFavouritesOnWebsite(newFavourites);
  }
}
export { addArtistToFavourites, showFavouriteArtists };
