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
        tap(_ => console.log(`fetched quiz w/ code=${code}`)),
        catchError(this.handleError<Quiz>('getQuizByCode'))
      );
    }

  getQuizesByUsername(username: String): Observable<Quiz[]> {
    const url = `${this.quizUrl}/maker=${username}`;
    return this.http.get<Quiz[]>(url)
      .pipe(
        tap(_ => console.log(`fetched quizes for username=${username}`)),
        catchError(this.handleError<Quiz[]>('getQuizesByUsername'))
      );
    }

  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions)
      .pipe(
        tap((newQuiz: Quiz) => console.log(`added quiz w code=${newQuiz.code}`)),
        catchError(this.handleError<Quiz>('addQuiz'))
      );
  }

  deleteQuiz(quiz: Quiz | string): Observable<Quiz> {
    const code = typeof quiz === 'string' ? quiz : quiz.code;
    const url = `${this.quizUrl}/${code}`;

    return this.http.delete<Quiz>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted quiz code=${code}`)),
        catchError(this.handleError<Quiz>('deleteQuiz'))
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
