import { Request, Response } from "express";
import { GetEpisodeByIdUC } from "../../../business/usecase/episodes/getEpisodeById";
import { F4FlixEpisodesDB } from "../../../data/f4flixEpisodesDataBase";


export const getEpisodeByIdEndpoint = async (req: Request, res: Response) => {
  try {
    const getEpisodeByIdUC = new GetEpisodeByIdUC(new F4FlixEpisodesDB());
    const result = await getEpisodeByIdUC.execute({
      id: req.params.id
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.errorCode || 400).send({
      message: err.message
    });
  }
};