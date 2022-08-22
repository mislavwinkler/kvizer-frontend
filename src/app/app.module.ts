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

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    ForbiddenPageComponent,
    PageNotFoundComponent,
    RegistrationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
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
