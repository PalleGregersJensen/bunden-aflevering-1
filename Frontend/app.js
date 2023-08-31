"use strict"

let artists = [];

window.addEventListener("load", start);

async function start() {
    console.log("JS kører");
    artists = await getJsonData();
    console.log(artists);
    showArtistsOnWebsite(artists);
}

async function getJsonData() {
    const response = await fetch("artists.json");
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
}

function showArtistsOnWebsite(artistList) {
  for (const artist of artistList) {
    const artistHtml = /*html*/ `Name: ${artist.name} Name: ${artist.activeSince}`;
    document.querySelector("#artistList").insertAdjacentHTML("beforeend", artistHtml);
  }
}