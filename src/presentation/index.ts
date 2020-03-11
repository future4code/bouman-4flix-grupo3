import express, { Request, Response } from "express";
import { createFilmEndpoint } from "./endpoints/createFilm";

const app = express();
app.use(express.json());

app.post("/createFilm", createFilmEndpoint)

export default app;
