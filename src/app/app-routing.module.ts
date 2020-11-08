import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateuserComponent} from './createuser/createuser.component';
import {ListuserComponent} from './listuser/listuser.component'


const routes: Routes = [
  {path:"",component:ListuserComponent},
  {path:"list",component:ListuserComponent},
  {path:"create",component:CreateuserComponent},
  {path:"edit/:id",component:CreateuserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
