import { Component } from '@angular/core';
import { NoteService } from '../../../Service/Notes/note.service';
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../Service/Auth/auth-service.service';
import { UserService } from '../../../Service/User/user.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userName: string = '';
  date: string = '';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userid = this.authService.getUserId();
    if (userid) {
      this.userService.getUserName(userid).subscribe({
        next: (data: any) => {
          this.userName = data.name;
        },
        error: (error) => {
          console.log("Error al obtener el nombre de usuario", error); // Mejor manejo de errores
        }
      });
    }
    const today = new Date();
    const format = 'dd/MM/yyyy HH:mm'; 
    const locale = 'en-US';
    this.date = formatDate(today, format, locale); 
  }
}
