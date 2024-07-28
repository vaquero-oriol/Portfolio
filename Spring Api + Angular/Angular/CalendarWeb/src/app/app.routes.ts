import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { NoteComponent } from './note/note.component';

export const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {path: 'main-screen',component:MainScreenComponent},
  {path:'note',component:NoteComponent}
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
    SignupComponent,LoginComponent,MainScreenComponent,NoteComponent
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
