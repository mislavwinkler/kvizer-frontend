import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import {AuthenticationService} from "../security/authentication.service";
import {RegistrationService} from "../security/registration.service";
import {Router} from "@angular/router";
import {Registration} from "../security/registration.model";

@Component({
  selector: 'registration-page',
  templateUrl: 'registration-page.component.html',
  styleUrls: ['registration-page.component.css'],
})
export class RegistrationPageComponent {

  registering = false;
  registration = new Registration('', '', '');
  registrationError = false;

  constructor(private title: Title, private meta: Meta,
    private authenticationService: AuthenticationService,
    private registrationService: RegistrationService,
    private router: Router) {
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

  buttonRegisterClick() {
    this.registrationError = false;
    this.registering = true;

    this.registrationService.register(this.registration).subscribe(
      {
        error: () => {
          this.registrationError = true;
          this.registering = false;
        }
      })
  }
}
