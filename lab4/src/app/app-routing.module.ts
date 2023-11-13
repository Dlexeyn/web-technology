import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ProfileComponent} from "./tools/profile/profile.component";
import {PostComponent} from "./pages/post/post.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'postComp', component: PostComponent},
  {path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
