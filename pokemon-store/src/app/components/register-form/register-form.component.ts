import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import Users from 'src/app/models/Users';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  userForm: FormGroup = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  private _service: ApiServiceService = new ApiServiceService();

  // Pour vérification dans l'HTML
  submitted: boolean = false;

  // Pour vérifier les '.invalid' des <span> *ngIf
  public get form() {
    return this.userForm.controls;
  }

  // Pour afficher les popups
  showSuccessPopup: boolean = false;
  showErrorPopup: boolean = false;

  /**
   * Crée un nouvel utilisateur avec les valeurs du formulaire
   * @returns un nouvel utilisateur
   */
  private createNewUser(): Users {
    return new Users(
      this.userForm.value.firstname,
      this.userForm.value.lastname,
      this.userForm.value.email,
      this.userForm.value.password
    );
  }

  /**
   * Vérifie si l'email existe déjà dans la BDD
   * @param email L'email à vérifier
   * @returns true si l'email existe déjà, false sinon
   */
  private async checkEmailAlreadyExist(email: string): Promise<boolean> {
    const emailAlreadyExist = await this._service.checkEmailAlreadyExists(
      email
    );
    return emailAlreadyExist;
  }

  public async onSubmit(): Promise<void> {
    this.submitted = true;
    this.showErrorPopup = false;

    // Si le formulaire est valide
    if (this.userForm.valid) {
      // Vérifie si l'email existe déjà dans la BDD
      const emailAlreadyExist = await this.checkEmailAlreadyExist(
        this.userForm.value.email
      );

      // Affiche une erreur si l'email existe déjà, sinon crée un nouvel utilisateur
      if (emailAlreadyExist) {
        this.showErrorPopup = true;
      } else {
        const newUser: Users = this.createNewUser();
        this._service.createUser(newUser);
        this.showSuccessPopup = true;

        // Redirige vers la page de connection après 1.5s
        window.setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      }
    }
  }
}
