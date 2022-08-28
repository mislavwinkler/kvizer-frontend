import { Component, Input, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../quiz';
import { Question } from '../question';
import { QuestionService } from '../question.service';
import { QuizService } from '../quiz.service';
import { AuthenticationService } from '../security/authentication.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {

  public code : String = ''
  questions?: Question[];
  public userIsMakerOfThisQuiz : boolean = false
  public quiz: Quiz = new Quiz('', '', new Date(''), ''); 
  public error = false;
  public quizError = false;
  public orderChanged = false;

  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedroute : ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.code = this.activatedroute.snapshot.paramMap.get("code")!;
    this.quizService.getQuizByCode(this.code)
    .subscribe(
      {
        next: (quiz) => {
          if(quiz != undefined){
          this.quiz = new Quiz(quiz.code, quiz.name, quiz.creationDate, quiz.makerName)
          this.isUserMakerOfThisQuiz();
          this.getQuestions();
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
      });
  }

  isUserMakerOfThisQuiz() {
    if (this.authenticationService.getAuthenticatedUserUsername() as String == this.quiz.makerName)
          {
            this.userIsMakerOfThisQuiz = true
          }
  }

  drop(event: CdkDragDrop<Question[]>) {
    moveItemInArray(this.questions!, event.previousIndex, event.currentIndex);
    this.orderChanged = true;
    console.log(`order changed`)
  }

  buttonSaveQuestionOrderClick(){
    for(let i=0; i < this.questions!.length; i++){
      if (this.questions![i].position != i+1){
          this.questionService.updateQuestion(this.quiz.code, this.questions![i].position,
            new Question(i+1, this.questions![i].question, this.questions![i].answer))
            .subscribe({
              next: () => {
                this.reloadCurrentRoute();
              },
              error: () => {
                this.error = true;
              }
            })
      }
    }
    this.orderChanged = false;
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
