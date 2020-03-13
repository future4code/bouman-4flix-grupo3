import { BaseDB } from "./baseDataBase";
import { Episodes, EpisodesWithSeries } from "../business/entities/episodes";
import { Series } from "../business/entities/series";


export class F4FlixEpisodesDB extends BaseDB{
    private episodeTableName = "f4flix_episodes";
    private serieTableName = "f4flix_series"

    public async createEpisode(episode: Episodes): Promise<void> {
        await this.connection.raw(`
            INSERT INTO ${this.episodeTableName} (id, title, length, link, picture, synopsis, series_id)
            VALUES(
                '${episode.getId()}',
                '${episode.getTitle()}',
                '${episode.getLength()}',
                '${episode.getLink()}',
                '${episode.getPicture()}',
                '${episode.getSynopsis()}',
                '${episode.getSeriesId()}'
            )
        `);
    }

    
    public async getEpisodeById(id: string): Promise< EpisodesWithSeries | undefined>{
        const result = await this.connection.raw(`
            SELECT * 
            FROM ${this.serieTableName} s
            JOIN ${this.episodeTableName} e
            ON s.id = e.series_id
            WHERE e.id='${id}'`
        );

        if (!result[0][0]) {
            return undefined;
        };

        const serie = new Series(
            result[0][0].id,
            result[0][0].title,
            new Date(result[0][0].date),
            result[0][0].synopsis,
            result[0][0].link,
            result[0][0].picture
        );

        return(
            result[0][0] &&
            new EpisodesWithSeries(
                result[0][0].id,
                result[0][0].title,
                result[0][0].length,
                result[0][0].link,
                result[0][0].picture,
                result[0][0].synopsis,
                serie
            )
        );
    }
}