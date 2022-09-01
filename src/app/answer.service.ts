import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Question } from './question';
import { Answer } from './answer';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  answerUrl = 'http://localhost:8080/answer';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  constructor(
    private http: HttpClient
  ) { }

  getAnswerById(id: String): Observable<Answer> {
    const url = `${this.answerUrl}/id=${id}`;
    return this.http.get<Answer>(url)
      .pipe(
        tap(_ => console.log(`fetched answer w/ id=${id}`)),
        catchError(this.handleError<Answer>('getAnswerById'))
      );
    }

  getUsernamesWithAnswersByQuizCode(quizCode: String): Observable<User[]> {
    const url = `${this.answerUrl}/quiz=${quizCode}`;
    return this.http.get<User[]>(url)
      .pipe(
        tap(_ => console.log(`fetched users w/ quizCode=${quizCode}`)),
        catchError(this.handleError<User[]>('getUsernamesWithAnswersByQuizCode'))
      );
    }

  getAnswersByQuestionId(id: Number): Observable<Answer[]> {
    const url = `${this.answerUrl}/${id}`;
    return this.http.get<Answer[]>(url)
      .pipe(
        tap(_ => console.log(`fetched answers for question w/ id=${id}`)),
        catchError(this.handleError<Answer[]>('getAnswersByQuestionId'))
      );
    }
  getAnswersByUsernameAndQuizCode(quizCode: String, username: String): Observable<Answer[]> {
    const url = `${this.answerUrl}/${quizCode}/${username}`;
    return this.http.get<Answer[]>(url)
      .pipe(
        tap(_ => console.log(`fetched answers for username=${username} and quizCode=${quizCode}`)),
        catchError(this.handleError<Answer[]>('getAnswersByUsernameAndQuizCode'))
      );
    }

  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.answerUrl, answer, this.httpOptions)
      .pipe(
        tap((newAnswer: Answer) => console.log(`added answer w id=${newAnswer.id}`)),
        catchError(this.handleError<Answer>('addAnswer'))
      );
  }

  updateAnswer(answer: Answer): Observable<any> {
    const url = `${this.answerUrl}`;
    this.http.put(url, answer)
    return this.http.put(url, answer, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated answer`)),
        catchError(this.handleError<any>('updateAnswer'))
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
