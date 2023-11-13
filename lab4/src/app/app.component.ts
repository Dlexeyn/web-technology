import {Component, OnInit} from '@angular/core';
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import {AuthenticatorComponent} from "./tools/authenticator/authenticator.component";
import {SERVER_API, StorageService} from "./services/storage.service";
import {AuthService} from "./services/auth.service";
import {EventBusService} from "./shared/event-bus.service";
import {Subscription} from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  serverHref = SERVER_API;
  title = 'SocialMedia';
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  eventBusSub?: Subscription;

  constructor(
    private loginSheet: MatBottomSheet,
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router
  ) {}

  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent)
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('login', () => {
      this.updateUserProfile();
    });
  }

  updateUserProfile(){
    this.isLoggedIn = true;
    this.username = this.storageService.getUser().username;
    this.router.navigate(['postComp']);
  }

  getUserId(){
    return this.storageService.getUser().id;
  }

  isAdmin(){
    let user = this.storageService.getUser();
    if(!user){
      return false;
    }
    return user.role === 'администратор';
  }

  onLogoutClick() {
    this.authService.logout().subscribe({
      next: res => {
        this.isLoggedIn = false;
        this.username = '';
        this.storageService.clean();
        this.router.navigate(['']);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
