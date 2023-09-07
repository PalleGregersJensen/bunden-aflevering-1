import {
  createNewArtistClicked,
  closeCreateNewArtistForm,
  createNewArtist,
  updateArtistClicked,
  deleteArtistClicked,
  updateArtist,
  selectedArtist,
  closeUpdateForm,
  getJsonData
} from "./crud-functions.js";

import { addArtistToFavourites, setupShowFavouriteArtists } from "./favourites.js";

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
  document.querySelector("#show-favourites-button").addEventListener("click", setupShowFavouriteArtists);
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

// Show artists on website
function showArtistsOnWebsite(artistList) {
  document.querySelector("#artist-list").innerHTML = "";
  for (const artist of artistList) {
    const artistHtml = /*html*/ `<div class="artist-container-in-create"><div>Name: ${artist.name} <br> Active since: ${artist.activeSince} <br> <img src="${artist.image}"/> <br></div><button class="update-artist-button">Update</button> <button class="delete-artist-button">Delete</button> <br> <button class="add-to-favourites">Add to favourites</button></div>`;
    document.querySelector("#artist-list").insertAdjacentHTML("beforeend", artistHtml);

    // show detail view
    document
      .querySelector("#artist-list div:last-child")
      .addEventListener("click", () => showArtistInDetailView(artist));

    // delete artist
    document
      .querySelector("#artist-list div:last-child .delete-artist-button")
      .addEventListener("click", () => deleteArtistClicked(artist.id));

    // update artist
    document
      .querySelector("#artist-list div:last-child .update-artist-button")
      .addEventListener("click", () => updateArtistClicked(artist));

    // add to favourites
    document
      .querySelector("#artist-list div:last-child .add-to-favourites")
      .addEventListener("click", () => addArtistToFavourites(artist));
  }
}

// show artist in detail view
function showArtistInDetailView(artistObject) {
  console.log(artistObject);
  document.querySelector("#detail-view-name").textContent = `Name: ${artistObject.name}`;
  document.querySelector("#detail-view-birthdate").textContent = `Birthdate: ${artistObject.birthdate}`;
  document.querySelector("#detail-view-active-since").textContent = `Active since: ${artistObject.activeSince}`;
  document.querySelector("#detail-view-genres").textContent = `Genres: ${artistObject.genres}`;
  document.querySelector("#detail-view-labels").textContent = `Labels: ${artistObject.labels}`;
  document.querySelector("#detail-view-website").innerHTML="Website: ";
  const artistWebsiteHtml = /*html*/ `<a href=${artistObject.website}>Visit ${artistObject.name}'s website</a>`;
  document.querySelector(
    "#detail-view-website"
  ).insertAdjacentHTML("beforeend", artistWebsiteHtml);
  document.querySelector("#detail-view-image").src= `${artistObject.image}`;
  document.querySelector("#detail-view-short-description").textContent = `Description: ${artistObject.shortDescription}`;
  document.querySelector("#dialog-detail-view-artist").showModal();
  document.querySelector("#close-detail-view-button").addEventListener("click", closeDetailView);
}

// close detail view about artist
function closeDetailView() {
  document.querySelector("#dialog-detail-view-artist").close();
}

// Filter by genre
function filterByGenre() {
  console.log("Filter by genre");

  const rockGenre = document.querySelector("#rock-checkbox");
  const bluesGenre = document.querySelector("#blues-checkbox");
  const grungeGenre = document.querySelector("#grunge-checkbox");
  const otherGenre = document.querySelector("#other-checkbox");

  const selectedGenres = [];
  console.log(selectedGenres);
  if (rockGenre.checked) {
    selectedGenres.push("Rock");
    console.log(selectedGenres);
  }

  if (bluesGenre.checked) {
    selectedGenres.push("Blues");
    console.log(selectedGenres);
  }

  if (grungeGenre.checked) {
    selectedGenres.push("Grunge");
    console.log(selectedGenres);
  }

  if (otherGenre.checked) {
    selectedGenres.push("Other");
    console.log(selectedGenres);
  }

  if (selectedGenres.length === 0) {
    // No genres selected, show all artists
    showArtistsOnWebsite(artists);
  } else {
    // Filter artists based on selected genres
    const filteredArtists = artists.filter((artist) => selectedGenres.includes(artist.genres));
    showArtistsOnWebsite(filteredArtists);

    const sortBy = document.querySelector("#sort-by").value;
    // filteredArtists = filterByGenre();
    console.log(filteredArtists);
    if (sortBy === "name-a-z") {
      console.log("name-a-z");
      filteredArtists.sort((a, b) => a.name.localeCompare(b.name));
      showArtistsOnWebsite(filteredArtists);
    } else if (sortBy === "active-since-low-to-high") {
      console.log("active-since-low-to-high");
      filteredArtists.sort((a, b) => a.activeSince - b.activeSince);
      showArtistsOnWebsite(filteredArtists);
    }
  }
}

// Sort by name and activeSince
function handleSortBy() {
  const sortBy = document.querySelector("#sort-by").value;
  // filteredArtists = filterByGenre();
  const rockGenre = document.querySelector("#rock-checkbox");
  const bluesGenre = document.querySelector("#blues-checkbox");
  const grungeGenre = document.querySelector("#grunge-checkbox");
  const otherGenre = document.querySelector("#other-checkbox");
  
  console.log(filteredArtists);


  if (rockGenre.checked || bluesGenre.checked || otherGenre.checked || grungeGenre.checked) {
    filterByGenre()
  } else {
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


export { endpoint, start, favourites, closeDetailView };
