import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

app.get("/", (request, response) => {
    response.send("My artists endpoint");
    console.log("læses dette");
});

app.get("/artists", async (request, response) => {
    const data = await fs.readFile("artists.json");
    const artists = JSON.parse(data);
    artists.sort((a, b) => a.name.localeCompare(b.name));
    // console.log(artists);
    response.json(artists);
});

// Create artist
app.post("/artists", async (request, response) => {
  const newArtist = request.body;
  console.log(newArtist);
  newArtist.id = new Date().getTime();
  console.log(newArtist.id);
  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);
  artists.push(newArtist);
  // console.log(newArtist);
  fs.writeFile("artists.json", JSON.stringify(artists));
  response.json(artists);
});

// Update artist
app.put("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);
  console.log(id);

  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);

  let artistToUpdate = artists.find((artist) => artist.id === id);
  const body = request.body;
  console.log(body);
  artistToUpdate.image = body.image;
  artistToUpdate.activeSince = body.activeSince;
  artistToUpdate.name = body.name;
  artistToUpdate.birthdate = body.birthdate;
  artistToUpdate.genres = body.genres;
  artistToUpdate.labels = body.labels;
  artistToUpdate.website = body.website;
  artistToUpdate.shortDescription = body.shortDescription;

  fs.writeFile("artists.json", JSON.stringify(artists));
  response.json(artists);
});

// Delete artist
app.delete("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);
  console.log(id);

  const data = await fs.readFile("artists.json");
  console.log(data);
  const artists = JSON.parse(data);

  const newArtists = artists.filter((artist) => artist.id !== id);
  fs.writeFile("artists.json", JSON.stringify(newArtists));

  response.json(artists);
});