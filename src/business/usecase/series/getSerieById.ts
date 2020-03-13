import { F4FlixSeriesDB } from "../../../data/f4flixSeriesDataBase";

export class GetSerieByIdUC {
    constructor(
        private DB: F4FlixSeriesDB
    ){}

    public async execute(input: GetSerieByIdUCInput): Promise<GetSerieByIdUCOutput>{
        
        const serie = await this.DB.getSerieById(input.id)

        if(!serie) {
        throw new Error("Serie not found")
        }

        return {
            id: serie.getId(),
            title: serie.getTitle(),
            date: serie.getDate(),
            synopsis: serie.getSynopsis(),
            link: serie.getLink(),
            picture: serie.getPicture(),
        }
    }
}

export interface GetSerieByIdUCInput{
    id: string
}

export interface GetSerieByIdUCOutput{
    id: string;
    title: string;
    date: Date;
    synopsis: string;
    link: string;
    picture?: string;
}