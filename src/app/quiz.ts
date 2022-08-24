export class Quiz {

    code!: String;
    name!: String;
    creationDate!: Date;
    makerName!: String;

    constructor(code: string, name: string, creationDate: Date, makerName: string) {
        this.code = code;
        this.name = name;
        this.creationDate = creationDate;
        this.makerName = makerName;
      }
}
