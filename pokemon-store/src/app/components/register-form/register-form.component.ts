import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import Users from 'src/app/models/Users';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  userForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private formBuilder: FormBuilder) {}

  // Pour vérification dans l'HTML
  submitted: boolean = false;

  // Pour vérifier les '.invalid' des <span> *ngIf
  public get form() {
    return this.userForm.controls;
  }

  /**
   * Crée un nouvel utilisateur avec les valeurs du formulaire
   * @returns un nouvel utilisateur
   */
  private createNewUser(): Users {
    return new Users(
      this.userForm.value.firstName,
      this.userForm.value.lastName,
      this.userForm.value.email,
      this.userForm.value.password
    );
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.userForm.valid) {
      const newUser: Users = this.createNewUser();

      // ********************** Vérifier si l'email existe déjà dans la BDD
      // ********************** Hasher le password
      // ********************** POST le newUser dans la BDD
    }
  }
}
