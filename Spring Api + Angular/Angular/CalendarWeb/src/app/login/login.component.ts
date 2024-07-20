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
  login(){}

}
