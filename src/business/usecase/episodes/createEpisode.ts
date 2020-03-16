import { v4 } from "uuid";
import { F4FlixEpisodesDB } from "../../../data/f4flixEpisodesDataBase";
import { Episodes } from "../../entities/episodes";

export class CreateEpisodeUC {
    constructor(
        private F4FlixEpisodesDB: F4FlixEpisodesDB
    ){}

    public async execute(input: createEpisodeUCInput): Promise<createEpisodeUCOutput>{
        const id = v4();

        const episode = new Episodes(
            id, 
            input.title, 
            input.length, 
            input.link, 
            input.picture,
            input.synopsis, 
            input.series_id
        )

        await this.F4FlixEpisodesDB.createEpisode(episode)

        return {
            message: "Episode created successfully"
        };
    }

}

export interface createEpisodeUCInput{
    title: string;
    length: number;
    link: string;
    picture: string;
    synopsis: string;
    series_id: string;
}

export interface createEpisodeUCOutput{
    message: string
}