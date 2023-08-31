"use strict";

let artists = [];

window.addEventListener("load", start);

async function start() {
  console.log("JS kører");
  artists = await getJsonData();
  console.log(artists);
  showArtistsOnWebsite(artists);
  document.querySelector("#searchfield").addEventListener("keyup", searchArtist);
  // filter categories checked
  document.querySelector("#blues-checkbox").addEventListener("change", filterByGenre);
  document.querySelector("#grunge-checkbox").addEventListener("change", filterByGenre);
  document.querySelector("#rock-checkbox").addEventListener("change", filterByGenre);
  document.querySelector("#other-checkbox").addEventListener("change", filterByGenre);
}

// Get JSON-data
async function getJsonData() {
  const response = await fetch("artists.json");
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
}

// Show artists on website
function showArtistsOnWebsite(artistList) {
  document.querySelector("#artist-list").innerHTML = "";
  for (const artist of artistList) {
    const artistHtml = /*html*/ `<div>Name: ${artist.name} <br> Active since: ${artist.activeSince} <br> <img src="${artist.image}"/><button class="update">Update</button> <button class="delete">Delete</button> <button class="add-to-favourites">Add to favourites</button></button></div></button>`;
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
  } else if (bluesGenre.checked) {
    console.log("bluesgenre checked");
    const bluesArtists = artists.filter(checkGenre);
    console.log(bluesArtists);
  } else if (grungeGenre.checked) {
    console.log("grungegenre checked");
    const grungeArtists = artists.filter(checkGenre);
    console.log(grungeArtists);
  } else if (otherGenre.checked) {
    console.log("othergenre checked");
    const otherArtists = artists.filter(checkGenre); 
    console.log(otherArtists);
  }
}

function checkGenre(artist) {
  console.log("Check genre");
  const rockGenre = document.querySelector("#rock-checkbox");
  const bluesGenre = document.querySelector("#blues-checkbox");
  const grungeGenre = document.querySelector("#grunge-checkbox");
  const otherGenre = document.querySelector("#other-checkbox");
  if (grungeGenre.checked) {
    return artist.genres === "Grunge";
  } else if (rockGenre.checked) {
    return artist.genres === "Rock";
  } else if (bluesGenre.checked) {
    return artist.genres === "Blues";
  } else if (otherGenre.checked) {
    return artist.genres === "Other";
  }
}

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
