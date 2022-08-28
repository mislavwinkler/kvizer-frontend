import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { AuthenticationService } from '../security/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isFixedNavbar = false;

  @HostBinding('class.navbar-opened') navbarOpened = false;
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) { 
  }
  ngOnInit() {
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(offset > 10) {
      this.isFixedNavbar = true;
    } else {
      this.isFixedNavbar = false;
    }
  }

  toggleNavbar() {
    this.navbarOpened = !this.navbarOpened;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']).then();
  }
}