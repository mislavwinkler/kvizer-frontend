import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../model/quiz';
import { AuthenticationService } from '../../security/authentication.service';
import { QuizService } from '../../services/quiz.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-quiz-page',
  templateUrl: './new-quiz-page.component.html',
  styleUrls: ['./new-quiz-page.component.css']
})
export class NewQuizPageComponent implements OnInit {

  procesing = false;
  error = false;
  inputError = false;
  quiz = new Quiz(this.generateRandomCode(), '', new Date(Date.now()) ,
      this.authenticationService.getAuthenticatedUserUsername() as string);

  constructor(
    private authenticationService: AuthenticationService,
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  buttonCreateQuizClick(name: string) {
    this.quiz.name = name.trim();

    if (this.quiz.name.length == 0){
      this.inputError = true;
      this.procesing = false;
    }
    else{
      this.makeNewQuiz()
    }
  }

  private makeNewQuiz(){
    this.error = false;
    this.procesing = true;

    this.quizService.addQuiz(this.quiz)
      .subscribe({
        next: () => {
          this.router.navigate([`quiz/edit/${this.quiz.code}`]).then();
        },
        error: (error) => {
          if(error.status == 409)
          {
            this.quiz.code = this.generateRandomCode()
            this.makeNewQuiz()
          }
          else{
          this.error = true;
          this.procesing = false;
          }
        }
      })
  }

  private generateRandomCode(){
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var result = '';
      for ( var i = 0; i < 6; i++ ) {
          result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
      return result;
  }
}
