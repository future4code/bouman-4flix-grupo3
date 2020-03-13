import { BaseDB } from "./baseDataBase";
import { Series } from "../business/entities/series";

export class F4FlixSeriesDB extends BaseDB{
    private serieTableName = "f4flix_series";

    private mapDateToDbDate(input: Date): string {
        const year = input.getFullYear();
        const month = input.getMonth() + 1;
        const date = input.getDate();
        return `${year + "-" + month + "-" + date}`;
    }

    private mapDbDateToDate(input: string): Date {
        return new Date(input);
    }
    
    private mapDbSerieToSerie(input?: any): Series | undefined {
        return (
            input &&
            new Series(
                input.id,
                input.title,
                this.mapDbDateToDate(input.date),
                input.synopsis,
                input.link,
                input.picture
            )
        );
    }

    public async createSerie(serie: Series): Promise<void> {
        await this.connection.raw(`
            INSERT INTO ${this.serieTableName} (id, title, date, synopsis, link, picture) 
            VALUES(
                '${serie.getId()}',
                '${serie.getTitle()}',
                STR_TO_DATE('${this.mapDateToDbDate(serie.getDate())}', '%Y-%m-%d'),
                '${serie.getSynopsis()}',
                '${serie.getLink()}',
                '${serie.getPicture()}'
            )
        `);
    }

    public async getSerieById(id: string): Promise< Series | undefined>{
        const result = await this.connection.raw(`
            SELECT * 
            FROM ${this.serieTableName} f
            WHERE f.id='${id}'`
        );

        if (!result[0][0]) {
            return undefined;
        }

        return this.mapDbSerieToSerie(result[0][0]);
    }

}