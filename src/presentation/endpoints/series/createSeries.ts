import { Request, Response } from "express";
import { F4FlixSeriesDB } from "../../../data/f4flixSeriesDataBase";
import { CreateSerieUC } from "../../../business/usecase/series/createSerie";


export const createSerieEndpoint = async (req: Request, res: Response) => {
  try {
    const createSerieUC = new CreateSerieUC(new F4FlixSeriesDB());
    const result = await createSerieUC.execute({
      title: req.body.title,
      date: req.body.date,
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