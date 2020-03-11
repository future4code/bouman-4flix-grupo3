import { Request, Response } from "express";
import { F4FlixDB } from "../../data/f4flixDataBase";
import { CreateFilmUC } from "../../business/usecase/films/createFilm";


export const createFilmEndpoint = async (req: Request, res: Response) => {
  try {
    const createFilmUC = new CreateFilmUC(new F4FlixDB());
    const result = await createFilmUC.execute({
      title: req.body.title,
      date: req.body.date,
      length: req.body.length,
      synopsis: req.body.synopsis,
      link: req.body.link,
      picture: req.body.picture
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.errorCode || 400).send({
      message: err.message
    });
  }
};