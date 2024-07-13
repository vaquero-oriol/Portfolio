import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';

//This defines the different Routes of the App
export const routes: Routes = [
    {path: '',component:SignupComponent}
    ,{path:'sign-up' ,component:SignupComponent}
];
 @NgModule({
    imports:[RouterModule.forRoot(routes)],
    declarations:[],
    exports:[RouterModule]
 })
 export class AppRoutingModule{}
