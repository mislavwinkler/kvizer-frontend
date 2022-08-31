export class Answer {

    id!: Number;
    answer!: String;
    questionId!: Number;
    userName!: String;

    constructor(id: Number, answer: String, questionId: Number, userName: String) {
      this.id = id;
      this.answer = answer;
      this.questionId = questionId;
      this.userName = userName;
      }
}
