import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questionUrl = 'http://localhost:8080/question';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  constructor(
    private http: HttpClient
  ) { }

  getQuestionById(id: String): Observable<Question> {
    const url = `${this.questionUrl}/id=${id}`;
    return this.http.get<Question>(url)
      .pipe(
        tap(_ => console.log(`fetched question w/ id=${id}`)),
        catchError(this.handleError<Question>('getQuestionById'))
      );
    }

  getQuestionsByQuizCode(code: String): Observable<Question[]> {
    const url = `${this.questionUrl}/${code}`;
    return this.http.get<Question[]>(url)
      .pipe(
        tap(_ => console.log(`fetched questions for quiz w/ code=${code}`)),
        catchError(this.handleError<Question[]>('getQuestionsByQuizCode'))
      );
    }

  addQuestions(question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionUrl, question, this.httpOptions)
      .pipe(
        tap((newQuestion: Question) => console.log(`added question w id=${newQuestion.id}`)),
        catchError(this.handleError<Question>('addQuestion'))
      );
  }

  updateQuestion(questionId: Number, question: Question): Observable<any> {
    const url = `${this.questionUrl}/${questionId.toString()}`;
    this.http.put(url, question)
    return this.http.put(url, question, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated question`)),
        catchError(this.handleError<any>('updateQuestion'))
      );
  }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(operation);
        console.error(error);
        return of(result as T);
      };
    }
}
