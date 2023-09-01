
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
function createNewArtist(event) {
    event.preventDefault();
    const form = event.target;
    console.log(form);
    const name = form.name.value;
    console.log(name);
    const birthdate = form.birthdate.value;
    console.log(birthdate);
    const activeSince = form.activeSince.value;
    console.log(activeSince);
}

export { createNewArtistClicked, closeCreateNewArtistForm, createNewArtist };