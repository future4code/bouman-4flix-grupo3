import { Request, Response } from "express";
import { GetSerieByIdUC } from "../../../business/usecase/series/getSerieById"
import { F4FlixSeriesDB } from "../../../data/f4flixSeriesDataBase";

export const getSerieByIdEndpoint = async (req: Request, res: Response) => {
  try {
    const getSeriesByIdUC = new GetSerieByIdUC(new F4FlixSeriesDB());
    const result = await getSeriesByIdUC.execute({
      id: req.params.id
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.errorCode || 400).send({
      message: err.message
    });
  }
};