import { Series } from "./series";

export class Episodes{
    constructor(
        private id: string,
        private title: string,
        private length: number,
        private link: string,
        private picture: string,
        private synopsis: string,
        private series_id: string
    ){}

    public getId(): string {
        return this.id;
    }
    
    public setId(id: string): void {
        this.id = id;
    }

    public getTitle(): string {
        return this.title;
    }
    
    public setTitle(title: string): void {
        this.title = title;
    }

    public getLength(): number {
        return this.length;
    }

    public setLength(length: number) {
        this.length = length;
    }

    public getSynopsis(): string {
        return this.synopsis;
    }
    
    public setSynopsis(synopsis: string): void {
        this.synopsis = synopsis;
    }

    public getLink(): string {
        return this.link;
    }
    
    public setLink(link: string): void {
        this.link = link;
    }

    public getPicture(): string | undefined {
        return this.picture;
    }
    
    public setPicture(picture: string): void {
    this.picture = picture;
    }

    public getSeriesId(): string {
        return this.series_id;
    }
    
    public setSeriesId(seriesId: string): void {
    this.series_id = seriesId;
    }
}

export class EpisodesWithSeries extends Episodes {
    constructor(
        id: string,
        title: string,
        length: number,
        link: string,
        picture: string,
        synopsis:string,
        private serie: Series
    ){
        super(id, title, length, link, picture, synopsis, serie.getId());
    }

    public setSerie(series: Series): void {
        this.serie = series;
    }

    public getSerie(): Series{
        return this.serie;
    }
}