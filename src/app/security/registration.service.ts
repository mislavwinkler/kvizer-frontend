import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Registration} from "./registration.model";
import {Jwt} from "./jwt.model";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  rootUrl = 'http://localhost:8080/registration';

  constructor(private http: HttpClient) {
  }

  register(registration: Registration) {
    return this.http.post<Registration>(`${this.rootUrl}`, registration);
  }
}
