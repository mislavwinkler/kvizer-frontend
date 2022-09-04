import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../quiz';
import { Question } from '../question';
import { QuestionService } from '../question.service';
import { QuizService } from '../quiz.service';
import { AuthenticationService } from '../security/authentication.service';
import { Answer } from '../answer';
import { AnswerService } from '../answer.service';
import { User } from '../user';

@Component({
  selector: 'app-answer-page',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.css']
})
export class AnswerPageComponent implements OnInit {

  public code : String = ''
  questions!: Question[];
  public quiz!: Quiz; 
  public answers!: Answer[] ;
  public users!: User[] ;
  public curUser!: String;


  public userIsMakerOfThisQuiz : boolean = false
  public error = false;

  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
    public authenticationService: AuthenticationService,
    private router: Router,
    private activatedroute : ActivatedRoute,
    private answerService: AnswerService,
  ) { }

  ngOnInit(): void {
    this.code = this.activatedroute.snapshot.paramMap.get("quizCode")!;
    this.quizService.getQuizByCode(this.code)
    .subscribe(
      {
        next: (quiz) => {
          if(quiz != undefined){
          this.quiz = new Quiz(quiz.code, quiz.name, quiz.creationDate, quiz.makerName)
          this.isUserMakerOfThisQuiz();
          this.getQuestions();
          this.getUsernames();
          }
          else {this.error = true;}
        },
        error: () => {
          this.error = true;
        }
      }
    )
  }

  getQuestions() {
    this.questionService.getQuestionsByQuizCode(this.code)
      .subscribe(questions => {
        this.questions = questions
        questions.sort(function (a, b) {
          return a.position as number - (b.position as number);
        })
      });
  }

  getAnswers() {
    this.answerService.getAnswersByUsernameAndQuizCode(this.code, this.curUser)
      .subscribe(answers => {
        this.answers = answers
      });
  }

  getUsernames() {
    this.answerService.getUsernamesWithAnswersByQuizCode(this.code)
      .subscribe(users => {
        this.users = users
      });
  }

  isUserMakerOfThisQuiz() {
    if (this.authenticationService.getAuthenticatedUserUsername() as String == this.quiz.makerName)
          {
            this.userIsMakerOfThisQuiz = true
          }
  }
}
