import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';

import { MatButtonModule } from "@angular/material/button";
import { MatBottomSheetModule} from "@angular/material/bottom-sheet";
import { MatCardModule} from "@angular/material/card";
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { ProfileComponent } from './tools/profile/profile.component';
import { MatDialogModule } from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import { PostComponent } from './pages/post/post.component';
import { CreatePostComponent } from './tools/create-post/create-post.component';
import { DisplayPostComponent } from './tools/display-post/display-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent,
    ProfileComponent,
    PostComponent,
    CreatePostComponent,
    DisplayPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
