import { F4FlixEpisodesDB } from "../../../data/f4flixEpisodesDataBase";

export class GetEpisodeByIdUC {
    constructor(
        private DB: F4FlixEpisodesDB
    ){}

    public async execute(input: GetEpisodeByIdUCInput): Promise<GetEpisodeByIdUCOutput>{
        
        const episode = await this.DB.getEpisodeById(input.id)

        if(!episode) {
        throw new Error("episode not found")
        }

        return {
            id: episode.getId(),
            title: episode.getTitle(),
            length: episode.getLength(),
            link: episode.getLink(),
            picture: episode.getPicture(),
            synopsis: episode.getSynopsis(),
            serieName: episode.getSerie().getTitle(),
            serieId: episode.getSeriesId()
            
        }
    }
}

export interface GetEpisodeByIdUCInput{
    id: string
}

export interface GetEpisodeByIdUCOutput{
    id: string;
    title: string;
    length: number;
    link: string;
    picture?: string;
    synopsis: string;
    serieId: string;
    serieName: string;
}