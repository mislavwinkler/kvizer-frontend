export class Question {

    id!: Number;
    position!: Number;
    question!: String;
    answer!: String;
    quizCode!: String;

    constructor(id: Number, position: Number, question: String, answer: String, quizCode: String) {
      this.id = id;
      this.position = position;
      this.question = question;
      this.answer = answer;
      this.quizCode = quizCode;
      }
}
