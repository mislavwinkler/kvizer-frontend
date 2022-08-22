import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {LoggedInGuard} from "./security/logged-in.guard";
import {HomePageComponent} from "./home-page/home-page.component";
import {ForbiddenPageComponent} from "./forbidden-page/forbidden-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AdminAuthorityGuard} from "./security/admin-authority.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'registration',
    component: RegistrationPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [LoggedInGuard]
  },
  /*{
    path: 'new-hardware',
    component: HardwareNewComponent,
    canActivate: [AdminAuthorityGuard]
  },*/
  {
    path: 'forbidden',
    component: ForbiddenPageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
