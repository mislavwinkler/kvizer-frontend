export class Question {

    position!: Number;
    question!: String;
    answer!: String;

    constructor(position: Number, question: String, answer: String) {
        this.position = position;
        this.question = question;
        this.answer = answer;
      }
}
