import { Request, Response } from "express";
import { GetFilmByIdUC } from "../../../business/usecase/films/getFilmById";
import { F4FlixFilmsDB } from "../../../data/f4flixFilmsDataBase";

export const getFilmByIdEndpoint = async (req: Request, res: Response) => {
  try {
    const getFilmsByIdUC = new GetFilmByIdUC(new F4FlixFilmsDB());
    const result = await getFilmsByIdUC.execute({
      id: req.params.id
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.errorCode || 400).send({
      message: err.message
    });
  }
};