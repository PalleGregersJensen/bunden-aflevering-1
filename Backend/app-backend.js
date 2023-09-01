import express, { response } from "express";
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
    console.log(artists);
    response.json(artists);
});

// Create artist
app.post("/artist", async (request, response) => {
  const newArtist = request.body;
  newUser.id = new Date().getTime();
  console.log(newUser);
  const data = await fs.readFile("data.json");
  const users = JSON.parse(data);
  users.push(newArtist);
  console.log(newArtist);
  fs.writeFile("data.json", JSON.stringify(artists));
  response.json(artists);
});

// Update artist

app.put("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);
  console.log(id);

  const data = await fs.readFile("data.json");
  const artists = JSON.parse(data);

  let artistToUpdate = artists.find((artist) => artist.id === id);
  const body = request.body;
  console.log(body);
  artistToUpdate.image = body.image;
  artistToUpdate.activeSince = body.activeSince;
  artistToUpdate.name = body.name;
  artistToUpdate.title = body.title;

  fs.writeFile("data.json", JSON.stringify(users));
  response.json(users);
});

// Delete user
app.delete("/users/:id", async (request, response) => {
  const id = Number(request.params.id);
  console.log(id);

  const data = await fs.readFile("data.json");
  const users = JSON.parse(data);

  const newUsers = users.filter((user) => user.id !== id);
  fs.writeFile("data.json", JSON.stringify(newUsers));

  response.json(users);
});