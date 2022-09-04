import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = 'http://localhost:8080/authentication';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<  User[]> {
    const url = this.userUrl;
    return this.http.get<User[]>(url)
      .pipe(
        tap(_ => console.log(`fetched all users`)),
        catchError(this.handleError<User[]>('getAllUsers'))
      );
    }

  deleteUser(user: User | string): Observable<User> {
    const username = typeof user === 'string' ? user : user.username;
    const url = `${this.userUrl}/${username}`;

    return this.http.delete<User>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`deleted user username=${username}`)),
        catchError(this.handleError<User>('deleteUser'))
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
