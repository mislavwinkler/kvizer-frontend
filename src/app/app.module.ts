import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module';
import {AppComponent } from './app.component'
import {FormsModule} from "@angular/forms";
import {AuthenticationInterceptor} from "./security/authentication.interceptor";
import {ForbiddenPageComponent} from "./pages/forbidden-page/forbidden-page.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { NewQuizPageComponent } from './pages/new-quiz-page/new-quiz-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { EditQuizPageComponent } from './pages/edit-quiz-page/edit-quiz-page.component';
import { AnswerPageComponent } from './pages/answer-page/answer-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { MatRadioModule } from '@angular/material/radio';

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
    DragDropModule,
    MatRadioModule
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
