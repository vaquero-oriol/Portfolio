import { Component } from '@angular/core';
import { UserService } from '../Service/User/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userDataForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.userDataForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    
    });
  }
  login(){
    if (this.userDataForm.valid) {
      const userData = this.userDataForm.value;

    this.userService.login(userData).subscribe({
      next: (response: any) => {
        console.log("User Loged succesfully", response);
        this.snackbar.open('Login was succesfull', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'custom-snackbar' 
        }).afterDismissed().subscribe(() => {
          this.router.navigate(['/main-screen']);
        });
      },
      error: (error: any) => {
        console.error("Error Login in", error);
        this.snackbar.open('Error Loging in . Please try again.', 'Close', {
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