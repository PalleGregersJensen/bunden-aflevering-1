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
    console.log(artists);
    response.json(artists);
});
