import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module';
import {AppComponent } from './app.component'
import {FormsModule} from "@angular/forms";
import {AuthenticationInterceptor} from "./security/authentication.interceptor";
import {ForbiddenPageComponent} from "./forbidden-page/forbidden-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginPageComponent} from './login-page/login-page.component';
import {RegistrationPageComponent } from './registration-page/registration-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { NewQuizPageComponent } from './new-quiz-page/new-quiz-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { QuestionPageComponent } from './question-page/question-page.component';
import { EditQuizPageComponent } from './edit-quiz-page/edit-quiz-page.component';
import { AnswerPageComponent } from './answer-page/answer-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    ForbiddenPageComponent,
    PageNotFoundComponent,
    RegistrationPageComponent,
    NavbarComponent,
    QuizPageComponent,
    NewQuizPageComponent,
    AccountPageComponent,
    QuestionPageComponent,
    EditQuizPageComponent,
    AnswerPageComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    FlexLayoutModule,
    MatSnackBarModule,
    DragDropModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
