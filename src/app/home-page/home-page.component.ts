import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  joining = false;
  joinError = false;
  codeError = false;
  noQuizError = false;

  public constructor(
    private titleService: Title,
    private router: Router,
    private quizService: QuizService
    ) {
    this.titleService.setTitle('Kvizer');
  }

  ngOnInit(): void {
  }

  buttonJoinClick(input: string){
    this.joining = true;
    this.joinError = false;
    this.codeError = false;
    this.noQuizError = false;
    let code = input.toUpperCase()

    if (code.length != 6){
      this.codeError = true;
    }
    else{
      this.quizService.getQuizByCode(code).subscribe(quiz => {
        if(quiz == undefined) {
          this.noQuizError = true;
        }
        else{
          this.router.navigate([`quiz/${code}`]).then();
          this.joinError = false;
        }
      })
    }
    this.joining = false;
  }
}
