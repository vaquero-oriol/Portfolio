import { Component } from '@angular/core';
import { UserService } from '../Service/User/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
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
      confPassword: ['', Validators.required]
    });
  }

  signUp() {
    if (this.userDataForm.valid) {
      const userData = this.userDataForm.value;

      if (userData.password !== userData.confPassword) {
        console.error("Passwords do not match");
        this.snackbar.open('Passwords do not match!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'custom-snackbar' 
        });
        return;
      }

      this.userService.signup(userData).subscribe({
        next: (response: any) => {
          console.log("User registered successfully", response);
          this.snackbar.open('Account created successfully!', 'Close', {
            duration: 500,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'custom-snackbar' 
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['/login']);
          });
        },
        error: (error: any) => {
          console.error("Error registering user", error);
          this.snackbar.open('Error creating account. Please try again.', 'Close', {
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
