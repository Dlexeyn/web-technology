import {Component, OnInit} from '@angular/core';
import { StorageService } from "../../services/storage.service";
import {AuthService} from "../../services/auth.service";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import {EventBusService} from "../../shared/event-bus.service";
import {EventData} from "../../shared/event.class";

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit{
  state = AuthenticatorCompState.LOGIN;
  roles: string[] = []
  private errorMessage: any;

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private bottomSheetRef : MatBottomSheet,
              private eventBusService: EventBusService) { }
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.state = AuthenticatorCompState.LOGGED;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onForgotPassClick() {
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }

  onCreateClick() {
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick() {
    this.state = AuthenticatorCompState.LOGIN;
  }

  isLoginState() {
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterState() {
    return this.state == AuthenticatorCompState.REGISTER;
  }

  isForgotPasswordState() {
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }

  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return "Вход";
      case AuthenticatorCompState.REGISTER:
        return "Регистрация";
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Забыли пароль";
      case AuthenticatorCompState.LOGGED:
        return "Успешный вход";
      case AuthenticatorCompState.REGISTERED:
        return "Зарегистрирован";
      case AuthenticatorCompState.LOGIN_FAILED:
        return "Ошибка входа";
      case AuthenticatorCompState.REGISTER_FAILED:
        return "Ошибка регистрации";
    }
  }

  onRegisterSubmit(registerEmail: HTMLInputElement,
                   registerName: HTMLInputElement,
                   registerLastName: HTMLInputElement,
                   registerPassword: HTMLInputElement,
                   registerConfirmPassword: HTMLInputElement) {
      let email = registerEmail.value;
      let name = registerName.value;
      let lastName = registerLastName.value;
      let password = registerPassword.value;
      let confirmPassword = registerConfirmPassword.value;

      if(
        this.isNotEmpty(email) &&
        this.isNotEmpty(name) &&
        this.isNotEmpty(lastName) &&
        this.isNotEmpty(password) &&
        this.isNotEmpty(confirmPassword) &&
        this.isAMatch(password, confirmPassword)
      ){
        this.authService.register(email, name, lastName, password, confirmPassword).subscribe({
          next: data => {
            console.log(data);
            this.state = AuthenticatorCompState.REGISTERED;
            this.bottomSheetRef.dismiss();
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.state = AuthenticatorCompState.REGISTER_FAILED;
            alert(this.errorMessage);
          }
        })
      }

  }

  onLoginSubmit(loginEmail: HTMLInputElement,
               loginPassword: HTMLInputElement){
    let email = loginEmail.value;
    let password = loginPassword.value;

    if(
      this.isNotEmpty(email) &&
      this.isNotEmpty(password)
    ){
      this.authService.login(email, password).subscribe({
        next: data => {
          this.storageService.saveUser(data);
          this.state = AuthenticatorCompState.LOGGED;
          this.bottomSheetRef.dismiss();
          console.log("login")
          this.eventBusService.emit(new EventData('login', null));
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.state = AuthenticatorCompState.LOGIN_FAILED;
          alert(this.errorMessage);
        }
      })
    }
  }

  isNotEmpty(text: string){
    return text != null && text.length > 0;
  }

  isAMatch(text: string, comparedText: string){
    return text == comparedText;
  }
}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  LOGGED,
  LOGIN_FAILED,
  REGISTERED,
  REGISTER_FAILED
}
