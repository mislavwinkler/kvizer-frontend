import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  joining = false;
  joinError = false;

  public constructor(private titleService: Title) {
    this.titleService.setTitle('Kvizer');
  }

  ngOnInit(): void {
  }

  buttonJoinClick(){
    this.joinError = false;
    this.joining = true;
  }

  // this.authenticationService.login(this.login).subscribe(
  //   {
  //     next: (loginResponse: Jwt) => {
  //       this.authenticationService.saveJwtToLocalStorage(loginResponse.jwt);
  //       this.router.navigate(['/home']).then();
  //     },
  //     error: () => {
  //       this.authenticationError = true;
  //       this.authenticating = false;
  //     }
  //   })
}
