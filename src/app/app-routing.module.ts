import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {LoggedInGuard} from "./security/logged-in.guard";
import {HomePageComponent} from "./home-page/home-page.component";
import {QuizPageComponent} from "./quiz-page/quiz-page.component";
import {NewQuizPageComponent} from "./new-quiz-page/new-quiz-page.component";
import {AccountPageComponent} from "./account-page/account-page.component";
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
  {
    path: 'quiz/:code',
    component: QuizPageComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'account',
    component: AccountPageComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'new',
    component: NewQuizPageComponent,
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
