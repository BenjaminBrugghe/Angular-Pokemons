import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { FilterPipe } from '../assets/filter.pipe';
import { CheckboxPipe } from '../assets/checkbox.pipe';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SuccessPopupComponent } from './components/snackbars/success-popup/success-popup.component';
import { ErrorPopupComponent } from './components/snackbars/error-popup/error-popup.component';
import { UserAccountComponent } from './components/user-account/user-account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterFormComponent,
    LoginFormComponent,
    HomepageComponent,
    PokemonCardComponent,
    FilterPipe,
    CheckboxPipe,
    UnauthorizedComponent,
    NotfoundComponent,
    SuccessPopupComponent,
    ErrorPopupComponent,
    UserAccountComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
