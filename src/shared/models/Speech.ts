
export class Speech {
    id: string;
    title: string;
    tags: string[];
    createdBy: string;
    createdOn: Date;

    constructor(id: string, title: string, tags: string[], createdBy: string, createdOn: Date) {
        this.id = id;
        this.title = title;
        this.tags = tags;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
    }
}
