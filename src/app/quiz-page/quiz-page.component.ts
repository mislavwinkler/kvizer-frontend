import { Component, Input, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {

  public code : string = ''
  questions?: Question[];

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private activatedroute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.code = this.activatedroute.snapshot.paramMap.get("code")!;

    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getQuestionsByQuizCode(this.code)
      .subscribe(questions => this.questions = questions);
  }

}
