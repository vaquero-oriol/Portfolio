import { Component } from '@angular/core';
import { UserService } from '../../Service/User/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../Service/Auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userDataForm: FormGroup;
  isPasswordVisible:boolean= false;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private authService: AuthService

  ) {
    this.userDataForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    
    });
  }
togglePassword(){
  this.isPasswordVisible=!this.isPasswordVisible;
}
  
  login() {
    if (this.userDataForm.valid) {
      const userData = this.userDataForm.value;
  
      this.userService.login(userData).subscribe({
        next: (response: any) => {
          console.log("User Logged in successfully", response);
          
         
          if (response!=null) {

            console.log("Esto es el response.id",response.id)
            const userId = response.id;
            console.log("Este es el user id que le llega",userId)

            
            if (typeof userId === 'number') { 
              this.authService.login(userId);
  
              this.snackbar.open('Login was successful', 'Close', {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: 'custom-snackbar' 
              });
  
              setTimeout(() => {
                this.router.navigate(['/main-screen']);
              }, 500); 
            } else {
              console.error('User ID is not a valid number');
              this.snackbar.open('Error: User ID is not a valid number.', 'Close', {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: 'custom-snackbar' 
              });
            }
          } else {
            console.error('User ID is null or undefined');
            this.snackbar.open('Error: User ID is not defined.', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: 'custom-snackbar' 
            });
          }
        },
        error: (error: any) => {
          console.error("Error logging in", error);
          this.snackbar.open('Error logging in. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'custom-snackbar' 
          });
        }
      });
    } else {
      console.error("Form is invalid");
      this.snackbar.open('Form is invalid. Please check your input.', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'custom-snackbar' 
      });
    }
  }
}