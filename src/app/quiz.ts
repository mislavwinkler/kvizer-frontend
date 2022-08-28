export class Quiz {

    code!: String;
    name!: String;
    creationDate!: Date;
    makerName!: String;

    constructor(code: String, name: String, creationDate: Date, makerName: String) {
        this.code = code;
        this.name = name;
        this.creationDate = creationDate;
        this.makerName = makerName;
      }
}
