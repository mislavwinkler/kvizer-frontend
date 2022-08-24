import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Quiz } from './quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizUrl = 'http://localhost:8080/quiz';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  constructor(
    private http: HttpClient
  ) { }

  getQuizByCode(code: String): Observable<Quiz> {
    const url = `${this.quizUrl}/${code}`;
    return this.http.get<Quiz>(url)
      .pipe(
        tap(_ => console.log(`fetched hardware w/ code=${code}`)),
        catchError(this.handleError<Quiz>('getHardwareByCode'))
      );
    }

  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions)
      .pipe(
        tap((newQuiz: Quiz) => console.log(`added quiz w code=${newQuiz.code}`)),
        catchError(this.handleError<Quiz>('addQuiz'))
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
