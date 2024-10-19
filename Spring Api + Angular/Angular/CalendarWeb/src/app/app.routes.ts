import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupComponent } from './Screens/signup/signup.component';
import { LoginComponent } from './Screens/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainScreenComponent } from './Screens/main-screen/main-screen.component';
import { NoteComponent } from './Screens/note/note.component';
import { UploadComponentComponent } from './Screens/note/upload-component/upload-component.component';
import { ProfileComponent } from './Screens/Settings/profile/profile.component';



export const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {path: 'main-screen',component:MainScreenComponent},
  {path:'note',component:NoteComponent},
  { path: 'note/:id', component: NoteComponent },
  {path: 'profile',component:ProfileComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule 
  ],
  declarations: [
    SignupComponent,LoginComponent,MainScreenComponent,NoteComponent,UploadComponentComponent,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
