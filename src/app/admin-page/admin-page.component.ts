import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../security/authentication.service';
import { User } from '../user';
import { Quiz } from '../quiz';
import { Answer } from '../answer';
import { UserService } from '../user.service';
import { Question } from '../question';
import { QuizService } from '../quiz.service';
import { QuestionService } from '../question.service';
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  public quizes!: Quiz[]
  public users!: User[]
  public error = false;

  constructor(
    private userService: UserService,
    private quizService: QuizService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.quizService.getAllQuizes()
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
    this.userService.getAllUsers()
    .subscribe(
      {
        next: (users) => {
          if(users != undefined){
          this.users= users.filter(u => u.username != this.authenticationService.getAuthenticatedUserUsername())
          }
          else {this.error = true;}
        },
        error: () => {
          this.error = true;
        }
      }
    )
  }

  deleteQuiz(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz).subscribe(
      () => this.quizes = this.quizes?.filter(q => q !== quiz)
    );
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe(
      () => this.users = this.users?.filter(u => u !== user)
    );
  }

}
