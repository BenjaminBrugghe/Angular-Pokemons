import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';
import Users from 'src/app/models/Users';
import { SuccessPopupComponent } from '../snackbars/success-popup/success-popup.component';
import { ErrorPopupComponent } from '../snackbars/error-popup/error-popup.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  userForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  // Pour vérification dans l'HTML
  submitted: boolean = false;

  // Pour vérifier les '.invalid' des <span> *ngIf
  public get form() {
    return this.userForm.controls;
  }

  // Pour afficher les popups
  public showSuccessPopup: boolean = false;
  public showErrorPopup: boolean = false;

  private _service: ApiServiceService = new ApiServiceService();

  public async onSubmit(): Promise<void> {
    this.submitted = true;
    this.showErrorPopup = false;

    // Si le formulaire est valide
    if (this.userForm.valid) {
      // Vérifie si l'email de l'utilisateur existe déjà dans la BDD
      const userExist: boolean = await this._service.checkEmailAlreadyExists(
        this.userForm.value.email
      );

      // Si il existe, récupère l'utilisateur et vérifie si le mot de passe est correct
      if (userExist) {
        const userFound: Users = await this._service.getUserByEmail(
          this.userForm.value.email
        );
        // Si le mot de passe est correct, connecte l'utilisateur, sinon affiche une erreur
        const passwordIsCorrect: boolean = await this._service.checkPassword(
          this.userForm.value.email,
          this.userForm.value.password
        );

        if (passwordIsCorrect) {
          const newToken = await this._service.createToken(userFound);

          // Stocke le token dans le localStorage
          localStorage.setItem('token', newToken);

          // Affiche la popup de succès
          this.showSuccessPopup = true;

          // Redirige vers la page principale après 1.5s
          window.setTimeout(() => {
            this.router.navigate(['homePage']);
          }, 1500);
        } else {
          // Si le mot de passe est incorrect, affiche une erreur
          this.showErrorPopup = true;
        }
        // Si l'utilisateur n'existe pas, affiche une erreur
      } else if (!userExist) {
        this.showErrorPopup = true;
      }
    }
  }
}
