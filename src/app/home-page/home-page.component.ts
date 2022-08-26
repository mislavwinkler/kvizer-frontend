import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  joining = false;
  joinError = false;
  codeError = false;

  public constructor(
    private titleService: Title,
    private router: Router
    ) {
    this.titleService.setTitle('Kvizer');
  }

  ngOnInit(): void {
  }

  buttonJoinClick(input: string){
    this.joining = true;
    let code = input.toUpperCase()

    if (code.length != 6){
      this.codeError = true;
      this.joining = false;
    }
    else{
    this.router.navigate([`quiz/${code}`]).then();
    this.joinError = false;
    }
  }

}
