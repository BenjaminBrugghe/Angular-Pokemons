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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
