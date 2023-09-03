import { endpoint, start } from "./app.js";

let selectedArtist;

// create new artist button clicked
function createNewArtistClicked() {
  console.log("create new artist clicked");
  document.querySelector("#dialog-create-new-artist").showModal();
}

// close create new artist form
function closeCreateNewArtistForm() {
  // event.preventDefault();
  console.log("close create new artist clicked");
  document.querySelector("#dialog-create-new-artist").close();
}

// create new artist
async function createNewArtist(event) {
  event.preventDefault();
  const form = event.target;
  console.log(form);
  const name = form.name.value;
  console.log(name);
  const birthdate = form.birthdate.value;
  console.log(birthdate);
  const activeSince = form.elements[`active-since`].value;
  console.log(activeSince);
  const genres = form.genres.value;
  console.log(genres);
  const labels = form.labels.value;
  console.log(labels);
  const website = form.website.value;
  console.log(website);
  const image = form.image.value;
  console.log(image);
  const shortDescription = form.elements[`short-description`].value;
  console.log(shortDescription);
  // create a new user
  const newArtist = { name, birthdate, activeSince, genres, labels, website, image, shortDescription };
  const artistAsJson = JSON.stringify(newArtist);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: artistAsJson,
    headers: {
      "content-Type": "application/json",
    },
  });

  if (response.ok) {
    // if success, start the app and update artists grid
    start();
  }
}

function updateArtistClicked(artistObject) {
  console.log("update artist clciked");
  selectedArtist = artistObject;
  console.log(selectedArtist);
  const form = document.querySelector("#form-update-artist");
  form.image.value = artistObject.image;
  form.name.value = artistObject.name;
  form.birthdate.value = artistObject.birthdate;
  form.elements["active-since"].value = artistObject.activeSince;
  form.genres.value = artistObject.genres;
  form.labels.value = artistObject.labels;
  form.website.value = artistObject.website;
  form.elements["short-description"].value = artistObject.shortDescription;
  document.querySelector("#dialog-update-artist").showModal();
}

async function updateArtist(event) {
  console.log("update artist");
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const birthdate = form.birthdate.value;
  const activeSince = form.elements["active-since"].value;
  const image = form.image.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const shortDescription = form.elements["short-description"].value;
  // update user
  const artistToUpdate = { name, birthdate, activeSince, image, genres, labels, website, shortDescription, };
  const artistAsJson = JSON.stringify(artistToUpdate);
  const response = await fetch(`${endpoint}/artists/${selectedArtist.id}`, {
    method: "PUT",
    body: artistAsJson,
    headers: {
      "content-Type": "application/json",
    },
  });
  if (response.ok) {
    // if success, run start
    start();
  }
}

async function deleteArtistClicked(artistId) {
  console.log("delete artist clciked");
  console.log(artistId);
  const response = await fetch(`${endpoint}/artists/${artistId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    // if success, update the users grid
    start();
  }
}

export {
  createNewArtistClicked,
  closeCreateNewArtistForm,
  createNewArtist,
  updateArtistClicked,
  deleteArtistClicked,
  updateArtist,
  selectedArtist
};
