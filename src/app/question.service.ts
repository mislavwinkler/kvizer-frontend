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
        tap((newQuestion: Question) => console.log(`added question w position=${newQuestion.position}`)),
        catchError(this.handleError<Question>('addQuestion'))
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
