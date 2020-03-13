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

}