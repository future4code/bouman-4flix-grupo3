import express from "express";
import { createFilmEndpoint } from "./endpoints/films/createFilm";
import { createSerieEndpoint } from "./endpoints/series/createSeries";
import { createEpisodeEndpoint } from "./endpoints/episodes/createEpisodes"
import { getFilmByIdEndpoint } from "./endpoints/films/getFilmById";
import { getEpisodeByIdEndpoint } from "./endpoints/episodes/getEpisodeById";
import { getSerieByIdEndpoint } from "./endpoints/series/getSerieById"

const app = express();
app.use(express.json());

app.post("/createFilm", createFilmEndpoint)
app.post("/createSerie", createSerieEndpoint)
app.post("/createEpisode", createEpisodeEndpoint)
app.get("/movies/:id", getFilmByIdEndpoint)
app.get("/episodes/:id", getEpisodeByIdEndpoint)
app.get("/series/:id", getSerieByIdEndpoint)

export default app;
