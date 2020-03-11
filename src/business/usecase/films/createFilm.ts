import { v4 } from "uuid";
import { F4FlixDB } from "../../../data/f4flixDataBase";
import { Film } from "../../entities/films";

export class CreateFilmUC {
    constructor(
        private f4FlixDB: F4FlixDB
    ){}

    public async execute(input: createFilmUCInput): Promise<createFilmUCOutput>{
        const id = v4();

        const date = new Date(input.date + " 00:00")

        if (Object.is(date.getFullYear(), NaN)) {
            throw new Error("Invalid date");
        }

        const film = new Film(
            id, 
            input.title, 
            date, 
            input.length, 
            input.synopsis, 
            input.link, 
            input.picture
        )

        await this.f4FlixDB.createFilm(film)

        return {
            message: "Movie created successfully"
        };
    }

}

export interface createFilmUCInput{
    title: string;
    date: string;
    length: number;
    synopsis: string;
    link: string;
    picture: string;
}

export interface createFilmUCOutput{
    message: string
}