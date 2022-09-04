import { Component, Inject, Input, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../model/quiz';
import { Question } from '../../model/question';
import { QuestionService } from '../../services/question.service';
import { QuizService } from '../../services/quiz.service';
import { AuthenticationService } from '../../security/authentication.service';
import { Answer } from '../../model/answer';
import { AnswerService } from '../../services/answer.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {

  public code : String = ''
  questions!: Question[];
  currentQuestionPosition: number = 0;
  answers!: String[] ;
  public userIsMakerOfThisQuiz : boolean = false
  public userAnswerdThisQuiz : boolean = false
  public quiz!: Quiz; 
  public error = false;
  public quizError = false;
  public answersError = false;
  public orderChanged = false;
  public quizStarted = false;
  elem: any;

  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
    public authenticationService: AuthenticationService,
    private router: Router,
    private activatedroute : ActivatedRoute,
    private answerService: AnswerService,
    public snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: any
  ) {
    
  }

  ngOnInit(): void {
    this.elem = document.documentElement;
    this.code = this.activatedroute.snapshot.paramMap.get("code")!;
    this.quizService.getQuizByCode(this.code)
    .subscribe(
      {
        next: (quiz) => {
          if(quiz != undefined){
          this.quiz = new Quiz(quiz.code, quiz.name, quiz.creationDate, quiz.makerName)
          this.isUserMakerOfThisQuiz();
          this.getQuestions();
          this.hasUserAnswered();
          }
          else {this.quizError = true;}
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
        this.answers = [].constructor(this.questions.length)
      });
  }

  isUserMakerOfThisQuiz() {
    if (this.authenticationService.getAuthenticatedUserUsername() as String == this.quiz.makerName)
          {
            this.userIsMakerOfThisQuiz = true
          }
  }

  hasUserAnswered(){
    this.answerService.getUsernamesWithAnswersByQuizCode(this.quiz.code)
          .subscribe(users => {
          if(users.some( user => user.username == this.authenticationService.getAuthenticatedUserUsername()))
          {this.userAnswerdThisQuiz = true}  
          })
  }

  buttonStartQuizClick(){
    this.openFullscreen();
    this.quizStarted = true;
  }
  buttonEditQuizClick(){
    this.router.navigateByUrl("/quiz/edit/"+ this.code);
  }
  buttonEndQuizClick(){
    this.closeFullscreen();
    this.quizStarted = false;
  }
  buttonAnswersClick(){
    this.router.navigateByUrl("/answers/"+ this.code);
  }

  buttonNextQuestionClick(){
    this.currentQuestionPosition = this.currentQuestionPosition + 1    
  }
  buttonPreviousQuestionClick(){
    this.currentQuestionPosition = this.currentQuestionPosition - 1
  }

  buttonSubmitAnswersClick(){
    this.answersError = false;
    for(var i = 0; i < this.questions.length; i++){
      this.answerService.addAnswer(new Answer(0, this.answers[i], this.questions[i].id, this.authenticationService.getAuthenticatedUserUsername() as String)).subscribe({
        error: () => {
          this.answersError = true;
        }
      })
    }
    if (!this.answersError){
      this.closeFullscreen()
      this.reloadCurrentRoute()
      this.snackBar.open("Answers submitted", "Dismiss", {duration: 3000})
    }
  }


  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  } 

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
  
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  trackByFn(index: any, item: any) {
    return index;
 }
}
