
export class Speech {
    id: string;
    title: string;
    content: string;
    tags: string[];
    createdBy: string;
    createdOn: Date;

    constructor(id: string, title: string, content: string, tags: string[], createdBy: string, createdOn: Date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
    }
}
