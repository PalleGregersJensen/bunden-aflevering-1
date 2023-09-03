import {endpoint} from "./app.js"

// console.log(endpoint);

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
  const newArtist = { name, birthdate, activeSince,genres, labels, website, image, shortDescription };
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
}

function deleteArtistClicked(artistId) {
  console.log("delete artist clciked");
}


export { createNewArtistClicked, closeCreateNewArtistForm, createNewArtist, updateArtistClicked, deleteArtistClicked};
