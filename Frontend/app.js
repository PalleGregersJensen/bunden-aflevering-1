import { createNewArtistClicked, closeCreateNewArtistForm, createNewArtist } from "./crud-functions.js"

"use strict";

let endpoint = "http://localhost:3000"
let artists = [];

window.addEventListener("load", start);

async function start() {
  console.log("JS kører");
  artists = await getJsonData();
  console.log(artists);
  showArtistsOnWebsite(artists);
  // create new artist
  document.querySelector("#create-new-artist-button").addEventListener("click", createNewArtistClicked);
  document.querySelector("#form-create-new-artist").addEventListener("submit", createNewArtist);
  // search functionality
  document.querySelector("#searchfield").addEventListener("keyup", searchArtist);
  // filter categories checked
  document.querySelector("#blues-checkbox").addEventListener("change", filterByGenre);
  document.querySelector("#grunge-checkbox").addEventListener("change", filterByGenre);
  document.querySelector("#rock-checkbox").addEventListener("change", filterByGenre);
  document.querySelector("#other-checkbox").addEventListener("change", filterByGenre);
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
    const artistHtml = /*html*/ `<div>Name: ${artist.name} <br> Active since: ${artist.activeSince} <br> <img src="${artist.image}"/> <br><button class="update">Update</button> <button class="delete">Delete</button> <br> <button class="add-to-favourites">Add to favourites</button></button></div></button>`;
    document.querySelector("#artist-list").insertAdjacentHTML("beforeend", artistHtml);
  }
}

// Sort by name

// Sort by active

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


export { endpoint };