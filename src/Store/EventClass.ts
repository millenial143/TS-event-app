
export default class EventClass{
    public id:string;
    public type:string;
    public dateStart:string;
    public dateEnd:string;
    public title:string;
    public description:string;
    public status:string;
    public members:string[];
    constructor(
         id:string,
         type:string,
         dateStart:string,
         dateEnd:string,
         title:string,
         description:string,
         status:string,
         members:string[],
    ) {
        this.id = id;
        this.type = type;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.title = title;
        this.description = description;
        this.status = status;
        this.members = members;
    }
}