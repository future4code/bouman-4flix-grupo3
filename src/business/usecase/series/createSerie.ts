import { v4 } from "uuid";
import { F4FlixSeriesDB } from "../../../data/f4flixSeriesDataBase";
import { Series } from "../../entities/series";

export class CreateSerieUC {
    constructor(
        private F4FlixSeriesDB: F4FlixSeriesDB
    ){}

    public async execute(input: createSerieUCInput): Promise<createSerieUCOutput>{
        const id = v4();

        const date = new Date(input.date + " 00:00")

        if (Object.is(date.getFullYear(), NaN)) {
            throw new Error("Invalid date");
        }

        const serie = new Series(
            id, 
            input.title, 
            date, 
            input.synopsis, 
            input.link, 
            input.picture
        )

        await this.F4FlixSeriesDB.createSerie(serie)

        return {
            message: "Serie created successfully"
        };
    }

}

export interface createSerieUCInput{
    title: string;
    date: string;
    synopsis: string;
    link: string;
    picture: string;
}

export interface createSerieUCOutput{
    message: string
}