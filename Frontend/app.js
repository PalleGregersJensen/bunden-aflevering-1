import {
  createNewArtistClicked,
  closeCreateNewArtistForm,
  createNewArtist,
  updateArtistClicked,
  deleteArtistClicked,
  updateArtist,
  selectedArtist,
  closeUpdateForm
} from "./crud-functions.js";

import { addArtistToFavourites, showFavouriteArtists } from "./favourites.js";

("use strict");

let endpoint = "http://localhost:3000";
let artists = [];
let favourites = [];
let filteredArtists = [];

window.addEventListener("load", start);

async function start() {
  console.log("JS kører");
  artists = await getJsonData();
  console.log(artists);
  filteredArtists = artists;
  console.log(filteredArtists);
  showArtistsOnWebsite(artists);
  // create new artist
  document.querySelector("#create-new-artist-button").addEventListener("click", createNewArtistClicked);
  document.querySelector("#form-create-new-artist").addEventListener("submit", createNewArtist);
  // update artist
  document.querySelector("#form-update-artist").addEventListener("submit", updateArtist);
  // search functionality
  document.querySelector("#searchfield").addEventListener("keyup", searchArtist);
  // filter categories checked
  document.querySelector("#blues-checkbox").addEventListener("change", filterByGenre);
  document.querySelector("#grunge-checkbox").addEventListener("change", filterByGenre);
  document.querySelector("#rock-checkbox").addEventListener("change", filterByGenre);
  document.querySelector("#other-checkbox").addEventListener("change", filterByGenre);
  // sort by functionalities
  document.querySelector("#sort-by").addEventListener("change", handleSortBy);
  // show favourites
  document.querySelector("#show-favourites-button").addEventListener("click", showFavouriteArtists);
  // show all artists and end favourites view
  document.querySelector("#show-all-artists-button").addEventListener("click", start);
  document.querySelector("#sort-search-filter-create").classList.remove("hidden");
  document.querySelector("#show-favourites-button").classList.remove("hidden");
  document.querySelector("#show-all-artists-button").classList.add("hidden");
  // close create new artist form
  document.querySelector("#form-create-new-artist-close-button").addEventListener("click", closeCreateNewArtistForm);
  // close update artist form 
  document.querySelector("#form-update-artist-cancel-button").addEventListener("click", closeUpdateForm);
  // close dialog no favourites selected
}

// Get JSON-data
async function getJsonData() {
  const response = await fetch(`${endpoint}/artists`);
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
}

// Show artists on website
function showArtistsOnWebsite(artistList) {
  document.querySelector("#artist-list").innerHTML = "";
  for (const artist of artistList) {
    const artistHtml = /*html*/ `<div class="artist-container-in-create"><div>Name: ${artist.name} <br> Active since: ${artist.activeSince} <br> <img src="${artist.image}"/> <br></div><button class="update-artist-button">Update</button> <button class="delete-artist-button">Delete</button> <br> <button class="add-to-favourites">Add to favourites</button></button></div></button>`;
    document.querySelector("#artist-list").insertAdjacentHTML("beforeend", artistHtml);

    // delete artist
    document
      .querySelector("#artist-list div:last-child .delete-artist-button")
      .addEventListener("click", () => deleteArtistClicked(artist.id));

    // update artist
    document
      .querySelector("#artist-list div:last-child .update-artist-button")
      .addEventListener("click", () => updateArtistClicked(artist));

    // add to fovurites
    document
      .querySelector("#artist-list div:last-child .add-to-favourites")
      .addEventListener("click", () => addArtistToFavourites(artist));
  }
}

// Sort by name
function handleSortBy() {
  const sortBy = document.querySelector("#sort-by").value;
  // filteredArtists = filterByGenre();
  console.log(filteredArtists);
  if (sortBy === "name-a-z") {
    console.log("name-a-z");
    artists.sort((a, b) => a.name.localeCompare(b.name));
    showArtistsOnWebsite(artists);
  } else if (sortBy === "active-since-low-to-high") {
    console.log("active-since-low-to-high");
    artists.sort((a, b) => a.activeSince - b.activeSince);
    showArtistsOnWebsite(artists);
} 
}

// Filter by genre
function filterByGenre() {
  console.log("Filter by genre");
  const rockGenre = document.querySelector("#rock-checkbox");
  const bluesGenre = document.querySelector("#blues-checkbox");
  const grungeGenre = document.querySelector("#grunge-checkbox");
  const otherGenre = document.querySelector("#other-checkbox");
  if (rockGenre.checked) {
    console.log("rockgenre checked");
    const rockArtists = artists.filter(checkGenre);
    console.log(rockArtists);
    showArtistsOnWebsite(rockArtists);
  } else if (bluesGenre.checked) {
    console.log("bluesgenre checked");
    const bluesArtists = artists.filter(checkGenre);
    console.log(bluesArtists);
    showArtistsOnWebsite(bluesArtists);
  } else if (grungeGenre.checked) {
    console.log("grungegenre checked");
    const grungeArtists = artists.filter(checkGenre);
    console.log(grungeArtists);
    showArtistsOnWebsite(grungeArtists);
  } else if (otherGenre.checked) {
    console.log("othergenre checked");
    const otherArtists = artists.filter(checkGenre);
    console.log(otherArtists);
    showArtistsOnWebsite(otherArtists);
  } else if (!otherGenre.checked && !grungeGenre.checked && !rockGenre.checked && !bluesGenre.checked) {
    showArtistsOnWebsite(artists);
  }
}

function checkGenre(artist) {
  const rockGenre = document.querySelector("#rock-checkbox");
  const bluesGenre = document.querySelector("#blues-checkbox");
  const grungeGenre = document.querySelector("#grunge-checkbox");
  const otherGenre = document.querySelector("#other-checkbox");

  if (otherGenre.checked && rockGenre.checked) {
    return artist.genres === "Other" || artist.genres === "Rock";
  } else if (grungeGenre.checked && rockGenre.checked) {
    return artist.genres === "Grunge" || artist.genres === "Rock";
  } else if (grungeGenre.checked && bluesGenre.checked) {
    return artist.genres === "Grunge" || artist.genres === "Blues";
  } else if (otherGenre.checked && bluesGenre.checked) {
    return artist.genres === "Other" || artist.genres === "Blues";
  } else if (grungeGenre.checked) {
    return artist.genres === "Grunge";
  } else if (rockGenre.checked) {
    return artist.genres === "Rock";
  } else if (bluesGenre.checked) {
    return artist.genres === "Blues";
  } else if (otherGenre.checked) {
    return artist.genres === "Other";
  } else {
    return true; // If no genre checkboxes are checked, show all artists
  }
}

// function checkGenre(artist) {
//   console.log("Check genre");
//   const rockGenre = document.querySelector("#rock-checkbox");
//   const bluesGenre = document.querySelector("#blues-checkbox");
//   const grungeGenre = document.querySelector("#grunge-checkbox");
//   const otherGenre = document.querySelector("#other-checkbox");
//   if (grungeGenre.checked) {
//     return artist.genres === "Grunge";
//   } else if (rockGenre.checked) {
//     return artist.genres === "Rock";
//   } else if (bluesGenre.checked) {
//     return artist.genres === "Blues";
//   } else if (otherGenre.checked) {
//     return artist.genres === "Other";
//   } else if (otherGenre.checked & rockGenre.checked) {
//     return artist.genres === "Other" && "Rock";
//   }
// }

// Search artists
function searchArtist() {
  const inputInSearchfield = document.querySelector("#searchfield").value;
  console.log(inputInSearchfield);
  const resultOfSearch = checkResultOfSearch(inputInSearchfield);
  console.log(resultOfSearch);
  showArtistsOnWebsite(resultOfSearch);
}

function checkResultOfSearch(inputInSearchfield) {
  const result = artists.filter(filterByName);
  console.log(result);
  return result;

  function filterByName(input) {
    const inputLowerCase = inputInSearchfield.toLowerCase();
    return input.name.toLowerCase().includes(inputLowerCase);
  }
}

export { endpoint, start, favourites };
