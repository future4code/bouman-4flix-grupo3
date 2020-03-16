import { Request, Response } from "express";
import { F4FlixEpisodesDB } from "../../../data/f4flixEpisodesDataBase";
import { CreateEpisodeUC } from "../../../business/usecase/episodes/createEpisode";


export const createEpisodeEndpoint = async (req: Request, res: Response) => {
  try {
    const createEpisodeUC = new CreateEpisodeUC(new F4FlixEpisodesDB());
    const result = await createEpisodeUC.execute({
      title: req.body.title,
      length: req.body.length,
      link: req.body.link,
      picture: req.body.picture,
      synopsis: req.body.synopsis,
      series_id: req.body.series_id
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.errorCode || 400).send({
      message: err.message
    });
  }
};