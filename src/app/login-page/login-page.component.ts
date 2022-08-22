import { Component, OnInit } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {AuthenticationService} from "../security/authentication.service";
import {Login} from "../security/login.model";
import {Jwt} from "../security/jwt.model";
import {Router} from "@angular/router";

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

  authenticating = false;
  login = new Login('', '');
  authenticationError = false;

  constructor(private title: Title, private meta: Meta,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.title.setTitle('Login Page - Kvizer')
  }

  ngOnInit(): void {
    if(this.authenticationService.isUserAuthenticated()) {
      this.router.navigate(['/home']).then();
    }
  }

  buttonLoginClick() {
    this.authenticationError = false;
    this.authenticating = true;

    this.authenticationService.login(this.login).subscribe(
      {
        next: (loginResponse: Jwt) => {
          this.authenticationService.saveJwtToLocalStorage(loginResponse.jwt);
          this.router.navigate(['/home']).then();
        },
        error: () => {
          this.authenticationError = true;
          this.authenticating = false;
        }
      })
  }
}
