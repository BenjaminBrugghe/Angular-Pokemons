import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';
import Users from 'src/app/models/Users';

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

  private _service: ApiServiceService = new ApiServiceService();

  public async onSubmit(): Promise<void> {
    this.submitted = true;

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
        if (userFound.password === this.userForm.value.password) {
          const newToken = await this._service.createToken(userFound);

          localStorage.setItem('token', newToken);
          console.log('localStorage : ', localStorage.getItem('token')); // *************************** A SUPPRIMER
          alert('Vous êtes connecté !');
          this.router.navigate(['/homePage']);
        } else {
          alert("Erreur d'authentification !");
        }
        // Si l'utilisateur n'existe pas, affiche une erreur
      } else if (!userExist) {
        alert("Erreur d'authentification !");
      }
    }
  }
}
