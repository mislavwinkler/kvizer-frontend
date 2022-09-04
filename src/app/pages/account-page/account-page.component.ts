import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../model/quiz';
import { QuizService } from '../../services/quiz.service';
import { AuthenticationService } from '../../security/authentication.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  public quizes!: Quiz[];

  public error = false;

  constructor(
    private authenticationService: AuthenticationService,
    private quizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.quizService.getQuizesByUsername(this.authenticationService.getAuthenticatedUserUsername() as String)
      .subscribe(
        {
          next: (quizes) => {
            if(quizes != undefined){
            this.quizes= quizes
            }
            else {this.error = true;}
          },
          error: () => {
            this.error = true;
          }
        }
      )
  }
  delete(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz).subscribe(
      () => this.quizes = this.quizes?.filter(q => q !== quiz)
    );
  }
}
