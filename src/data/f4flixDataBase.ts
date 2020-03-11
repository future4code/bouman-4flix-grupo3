import { Film } from "../business/entities/films";
import { BaseDB } from "./baseDataBase";

export class F4FlixDB extends BaseDB{
    private filmTableName = "f4flix_films";

    private mapDateToDbDate(input: Date): string {
        const year = input.getFullYear();
        const month = input.getMonth() + 1;
        const date = input.getDate();
        return `${year + "-" + month + "-" + date}`;
    }

    private mapDbDateToDate(input: string): Date {
        return new Date(input);
    }

    public async createFilm(film: Film): Promise<void> {
        await this.connection.raw(`
            INSERT INTO ${this.filmTableName} (id, title, date, length, synopsis, link, picture) 
            VALUES(
                '${film.getId()}',
                '${film.getTitle()}',
                STR_TO_DATE('${this.mapDateToDbDate(film.getDate())}', '%Y-%m-%d'),
                '${film.getLength()}',
                '${film.getSynopsis()}',
                '${film.getLink()}',
                '${film.getPicture()}'
            );`
        );
    }
}