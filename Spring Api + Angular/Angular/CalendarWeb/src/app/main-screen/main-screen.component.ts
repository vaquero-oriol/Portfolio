import { Component ,ViewEncapsulation} from '@angular/core';
import { NoteService } from '../Service/Notes/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../Service/Auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'], 
  encapsulation: ViewEncapsulation.None  

})
export class MainScreenComponent {

  constructor(

    private noteService:NoteService,
    private router: Router,
    private snackBar:MatSnackBar,
    private authService:AuthService
  ){
    
  }

createNote(){
  const userId=this.authService.getUserId();
  if(userId){
    this.noteService.createNote(userId).subscribe({
      next:(response:any)=>{
        console.log("Note created successfully",response);
        this.snackBar.open('Note created Successfully','Close',{
          duration:3000,
          horizontalPosition:'end',
          verticalPosition:'top',
          panelClass:'custom-snackbar'
        });
        setTimeout(() => {
          this.router.navigate(['/note']);
        }, 500); 
      },
      error: (error: any) => {
        console.error("Error Login in", error);
        this.snackBar.open('Error Loging in . Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'custom-snackbar' 
        });
      }
    });
  } else {
    console.error("Form is invalid");
    this.snackBar.open('Form is invalid. Please check your input.', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'custom-snackbar' 
    });
  }
}
}
