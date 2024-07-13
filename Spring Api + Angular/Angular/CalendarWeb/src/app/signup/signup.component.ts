import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userData: any = {};

  constructor() {}

  signUp(userData: any) {
    console.log("Datos registro", userData);
    // Aquí puedes implementar la lógica para registrar al usuario
  }
}
