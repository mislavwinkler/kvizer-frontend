import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {AuthenticationService} from "../security/authentication.service";
import {RegistrationService} from "../security/registration.service";
import {Router} from "@angular/router";
import {Registration} from "../security/registration.model";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'registration-page',
  templateUrl: 'registration-page.component.html',
  styleUrls: ['registration-page.component.css'],
})
export class RegistrationPageComponent {

  registering = false;
  registration = new Registration('', '', '');
  registrationError = false;
  emailError = false;
  usernameError = false;
  passwordError = false;
  passwordLengthError = false;
  inputError = false;
  

  constructor(private title: Title, private meta: Meta,
    private authenticationService: AuthenticationService,
    private registrationService: RegistrationService,
    private router: Router,
    public snackBar: MatSnackBar
    ) {
    this.title.setTitle('Registration-Page - Kvizer')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Registration-Page - Kvizer',
      },
    ])
  }

  ngOnInit(): void {
    if(this.authenticationService.isUserAuthenticated()) {
      this.router.navigate(['/home']).then();
    }
  }

  buttonRegisterClick(email: string, username: string, password: string, passwordConfirm: string) {
    this.registrationError = false;
    this.inputError = false;
    this.emailError = false;
    this.usernameError = false;
    this.passwordError = false;
    this.passwordLengthError = false;
    this.registering = true;

    if (email.length == 0 || username.length == 0 || password.length == 0 || passwordConfirm.length == 0){
      this.inputError = true
      this.registering = false;
    }

    else if  (!(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)))
    {
      this.emailError = true;
      this.registering = false;
    }

    else if (password.length < 6)
    {
      this.passwordLengthError = true;
      this.registering = false;
    }

    else if (password != passwordConfirm)
    {
      this.passwordError = true;
      this.registering = false;
    }
    else{
    this.registration.email = email
    this.registration.username = username
    this.registration.password = password
    this.registrationService.register(this.registration).subscribe(
      {
        next: () => {
          this.snackBar.open("Registration complete, please login", "Dismiss", {duration: 3000})
          this.router.navigate(['/login']).then();
        },
        error: (error) => {
          if(error.status == 409)
          {
            this.usernameError = true;
          }
          else{
            this.registrationError = true;
          }
          this.registering = false;
        }
      })
    }
  }
}
