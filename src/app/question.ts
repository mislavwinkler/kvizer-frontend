export class Question {

    id!: Number;
    position!: Number;
    question!: String;
    answer!: String;
    imgPath!: String;
    quizCode!: String;

    constructor(id: Number, position: Number, question: String, answer: String, imgPath: String, quizCode: String) {
      this.id = id;
      this.position = position;
      this.question = question;
      this.answer = answer;
      this.imgPath = imgPath;
      this.quizCode = quizCode;
      }
}
