import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../model/question';
import { QuestionService } from '../../services/question.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit {
  public questionId : Number = 0;
  public question: Question = new Question(0, 0, '', '', '');
  public notImageError = false;
  public fileSizeError = false;
  public error = false;
  public questionError = false;
  updating = false;
  selectedImage!: File

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
            this.question = new Question(question.id, question.position, question.question, question.answer, question.quizCode)
            }
            else {this.questionError = true;}
        },
        error: () => {
          this.error = true;
        }
      }
    )
  }

  onFileChanged(event: any) {
    this.notImageError = false;
    this.fileSizeError = false;
    this.selectedImage = event.target.files[0]
    if(this.selectedImage.type.indexOf("image")){
      this.notImageError = true;
    }
    else if(this.selectedImage.size > 4194304){
      this.fileSizeError = true;
    }
  }

  buttonUpdateClick(){
    this.error = false;
    this.updating = true;

    this.questionService.updateQuestion(this.question).subscribe(
      {
        next: (question) => {
          if(this.selectedImage){
            this.questionService.uploadPicture(this.selectedImage, question.id).subscribe()
          }
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