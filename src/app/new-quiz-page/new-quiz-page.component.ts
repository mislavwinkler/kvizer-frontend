import { Component, OnInit } from '@angular/core';
import { Quiz } from '../quiz';
import { AuthenticationService } from '../security/authentication.service';
import { QuizService } from '../quiz.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-quiz-page',
  templateUrl: './new-quiz-page.component.html',
  styleUrls: ['./new-quiz-page.component.css']
})
export class NewQuizPageComponent implements OnInit {

  procesing = false;
  error = false;
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
    this.error = false;
    this.procesing = true;
    this.quiz.name = name.trim();

    this.quizService.addQuiz(this.quiz)
      .subscribe({
        next: () => {
          this.router.navigate([`quiz/${this.quiz.code}`]).then();
        },
        error: () => {
          this.error = true;
          this.procesing = false;
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
