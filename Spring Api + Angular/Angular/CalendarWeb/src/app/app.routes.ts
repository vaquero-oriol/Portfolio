import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  declarations: [
    SignupComponent,LoginComponent
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
