import { F4FlixFilmsDB } from "../../../data/f4flixFilmsDataBase";

export class GetFilmByIdUC {
    constructor(
        private DB: F4FlixFilmsDB
    ){}

    public async execute(input: GetFilmByIdUCInput): Promise<GetFilmByIdUCOutput>{
        
        const film = await this.DB.getFilmById(input.id)

        if(!film) {
        throw new Error("film not found")
        }

        return {
            id: film.getId(),
            title: film.getTitle(),
            date: film.getDate(),
            length: film.getLength(),
            synopsis: film.getSynopsis(),
            link: film.getLink(),
            picture: film.getPicture(),
        }
    }
}

export interface GetFilmByIdUCInput{
    id: string
}

export interface GetFilmByIdUCOutput{
    id: string;
    title: string;
    date: Date;
    length: number;
    synopsis: string;
    link: string;
    picture?: string;
}