import express, { response } from "express";

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
}) 

app.get("/", (request, response)  => {
    response.send("Hello world");
}
)