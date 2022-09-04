import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../security/authentication.service';
import { User } from '../../model/user';
import { Quiz } from '../../model/quiz';
import { UserService } from '../../services/user.service';
import { QuizService } from '../../services/quiz.service';

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
      () => {this.users = this.users?.filter(u => u !== user),
        this.quizes = this.quizes?.filter(q => q.makerName !== user.username)
      }
    );
  }

}
