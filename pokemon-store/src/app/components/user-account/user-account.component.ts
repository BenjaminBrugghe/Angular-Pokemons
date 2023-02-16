import { Component, Input } from '@angular/core';
import Users from 'src/app/models/Users';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent {
  constructor(private location: Location) {}

  private _service: ApiServiceService = new ApiServiceService();

  // Pour afficher les popups
  showSuccessPopup: boolean = false;
  showErrorPopup: boolean = false;

  // Pour gérer les erreurs
  lastnameError: boolean = false;
  firstnameError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  confirmPasswordError: boolean = false;

  // Pour afficher les champs de modifications
  showEditLastname: boolean = false;
  showEditFirstname: boolean = false;
  showEditEmail: boolean = false;
  showEditPassword: boolean = false;

  // Pour vérifier la validité des champs
  lastnameIsValid: boolean = false;
  firstnameIsValid: boolean = false;
  emailIsValid: boolean = false;
  passwordIsValid: boolean = false;
  confirmPasswordIsValid: boolean = false;

  @Input()
  user!: Users;

  // Pour récupérer les nouvelles valeurs
  newLastname: string = '';
  newFirstname: string = '';
  newEmail: string = '';
  newPassword: string = '';
  newConfirmPassword: string = '';

  /**
   * Réinitialise les valeurs des inputs
   */
  resetNewInputs() {
    this.newLastname = '';
    this.newFirstname = '';
    this.newEmail = '';
    this.newPassword = '';
    this.newConfirmPassword = '';
  }

  /**
   * Récupère l'utilisateur connecté
   */
  async ngOnInit(): Promise<void> {
    const tokenExists = localStorage.getItem('token');
    if (tokenExists) {
      const token = await this._service.verifyToken(tokenExists);
      this.user = await this._service.getUserById(token.id);
    }
  }

  //#region Toggle inputs d'édition

  /**
   * Reset l'affichage des inputs d'édition à false
   */
  resetToggles() {
    this.showEditLastname = false;
    this.showEditFirstname = false;
    this.showEditEmail = false;
    this.showEditPassword = false;
  }

  /**
   * Affiche ou cache l'input d'édition du nom
   */
  toggleEditLastname() {
    if (this.showEditLastname) this.newLastname = '';
    this.showEditLastname = !this.showEditLastname;
  }

  /**
   * Affiche ou cache l'input d'édition du prénom
   */
  toggleEditFirstname() {
    if (this.showEditFirstname) this.newFirstname = '';
    this.showEditFirstname = !this.showEditFirstname;
  }

  /**
   * Affiche ou cache l'input d'édition de l'email
   */
  toggleEditEmail() {
    if (this.showEditEmail) this.newEmail = '';
    this.showEditEmail = !this.showEditEmail;
  }

  /**
   * Affiche ou cache l'input d'édition du mot de passe
   */
  toggleEditPassword() {
    if (this.showEditPassword)
      (this.newPassword = ''), (this.newConfirmPassword = '');
    this.showEditPassword = !this.showEditPassword;
  }

  //#endregion

  /**
   * Retourne à l'URL précédente
   */
  goBack() {
    this.location.back();
  }

  //#region Gestion des erreurs (regex)

  /**
   * Vérifie si le nom est valide
   * @returns true si le nom est valide, false sinon
   */
  checkLastname() {
    if (this.newLastname != '') {
      if (this.newLastname.length < 3) {
        this.lastnameError = true;
        return false;
      } else {
        this.lastnameError = false;
        return true;
      }
    } else return true;
  }

  /**
   * Vérifie si le prénom est valide
   * @returns true si le prénom est valide, false sinon
   */
  checkFirstname() {
    if (this.newFirstname != '') {
      if (this.newFirstname.length < 3) {
        this.firstnameError = true;
        return false;
      } else {
        this.firstnameError = false;
        return true;
      }
    } else return true;
  }

  /**
   * Vérifie si l'email est valide
   * @returns true si l'email est valide, false sinon
   */
  checkEmail() {
    if (this.newEmail != '') {
      if (
        !this.newEmail.match(
          /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
        )
      ) {
        this.emailError = true;
        return false;
      } else {
        this.emailError = false;
        return true;
      }
    } else return true;
  }

  /**
   * Vérifie si le mot de passe est valide
   * @returns true si le mot de passe est valide, false sinon
   */
  checkPassword() {
    if (this.newPassword != '') {
      if (this.newPassword.length < 6) {
        this.passwordError = true;
        return false;
      } else {
        this.passwordError = false;
        return true;
      }
    } else return true;
  }

  /**
   * Vérifie si les deux mots de passe correspondent
   * @returns true si les deux mots de passe correspondent, false sinon
   */
  checkConfirmPassword() {
    if (this.newConfirmPassword != '') {
      if (this.newConfirmPassword != this.newPassword) {
        this.confirmPasswordError = true;
        return false;
      } else {
        this.confirmPasswordError = false;
        return true;
      }
    } else return true;
  }

  //#endregion

  /**
   * Met à jour les informations de l'utilisateur actuel
   */
  setUserNewInfos = async (): Promise<void> => {
    this.user.lastname =
      this.newLastname == '' ? this.user.lastname : this.newLastname;
    this.user.firstname =
      this.newFirstname == '' ? this.user.firstname : this.newFirstname;
    this.user.email = this.newEmail == '' ? this.user.email : this.newEmail;
    this.user.password =
      this.newPassword == ''
        ? this.user.password
        : await this._service.hashPassword(this.newPassword);
  };

  /**
   * Vérifie si les inputs sont valides
   */
  checkInputsAreValid() {
    this.lastnameIsValid = this.checkLastname();
    this.firstnameIsValid = this.checkFirstname();
    this.emailIsValid = this.checkEmail();
    this.passwordIsValid = this.checkPassword();
    this.confirmPasswordIsValid = this.checkConfirmPassword();
  }

  /**
   * Vérifie si les inputs sont valides et met à jour les informations de l'utilisateur
   */
  updateInfos = async (): Promise<void> => {
    this.showErrorPopup = false;

    // Vérifie si les inputs sont valides
    this.checkInputsAreValid();

    // Si un des inputs n'est pas valide, affiche un popup d'erreur
    if (
      !this.lastnameIsValid ||
      !this.firstnameIsValid ||
      !this.emailIsValid ||
      !this.passwordIsValid ||
      !this.confirmPasswordIsValid
    ) {
      this.showErrorPopup = true;
    } else {
      // Sinon, met à jour les infos de l'utilisateur
      this.setUserNewInfos();

      await this._service.editUser(this.user);

      // Affiche un popup de succès
      this.showSuccessPopup = true;

      // Reset le booleen de l'affichage du popup de succès après 4 secondes
      window.setTimeout(() => {
        this.showSuccessPopup = false;
      }, 4000);

      // Reset les inputs d'édition et leur affichage
      this.resetNewInputs();
      this.resetToggles();
    }
  };
}
