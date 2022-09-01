import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question';
import { QuestionService } from '../question.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit {
  public questionId : Number = 0;
  public question: Question = new Question(0, 0, '', '', '', '');
  public error = false;
  public questionError = false;
  updating = false;

  constructor(
    private questionService: QuestionService,
    private activatedroute : ActivatedRoute,
    public location: Location
  ) { }

  ngOnInit(): void {
    this.questionService.getQuestionById(this.activatedroute.snapshot.paramMap.get("questionId")!)
    .subscribe(
      {
        next: (question) => {
          if(question != undefined){
            this.question = new Question(question.id, question.position, question.question, question.answer, question.imgPath, question.quizCode)
            }
            else {this.questionError = true;}
        },
        error: () => {
          this.error = true;
        }
      }
    )
  }

  buttonUpdateClick(){
    this.error = false;
    this.updating = true;

    this.questionService.updateQuestion(this.question).subscribe(
      {
        next: () => {
          this.location.back()
        },
        error: () => {
          this.error = true;
          this.updating = false;
        }
      })
  }

  delete(): void {
    this.questionService.deleteQuestion(this.question).subscribe(
      {
        next: () => {
          this.location.back()
        },
        error: () => {
          this.error = true;
          this.updating = false;
        }
      })
  }

}
