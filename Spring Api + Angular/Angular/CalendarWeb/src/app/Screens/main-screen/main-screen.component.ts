import { Component ,ViewEncapsulation} from '@angular/core';
import { NoteService } from '../../Service/Notes/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../Service/Auth/auth-service.service';
import { Router } from '@angular/router';
import { UserService } from '../../Service/User/user.service';
import { formatDate, NgFor } from '@angular/common';
import { error } from 'node:console';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'], 
  encapsulation: ViewEncapsulation.None  

})
export class MainScreenComponent {

  userName: string = ''; 
  date:string='';
  notes: any[]=[];
  filtered:any[]=[];
  search:string='';
  allnotes:any[]=[];
  

  constructor(

    private noteService:NoteService,
    private router: Router,
    private snackBar:MatSnackBar,
    private authService:AuthService,
    private userService:UserService

  ){
    
  }
  filterNotes() {

    if(this.search.trim()==''){
      this.loadNotes();
      
    }else{
    this.filtered = this.notes.filter(note => 
      note.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }
    this.notes=this.filtered;

    
  }
  favoriteNote(_t18: any) {
    throw new Error('Method not implemented.');
    }
    deleteNote(_t18: any) {
    throw new Error('Method not implemented.');
    }
  loadNotes(){
    const userid=this.authService.getUserId();
    if(userid){
      this.noteService.GetAllNotes(userid).subscribe(
        data=>{
          this.notes=data;
        },
      error=>{
        console.error("Error al cargas las notas",error)
      }
      )
    }
    
  }
  openNote(id:number){
    this.router.navigate(['/note',id])
    
  }
  redirectProfile(){
   this.router.navigate(['/profile'])
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
        const noteid=response.id
        setTimeout(() => {
          this.router.navigate(['/note',noteid]);
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


ngOnInit(): void {
  this.loadNotes();
  const userid=this.authService.getUserId();
  if(userid){
    this.userService.getUserName(userid).subscribe({
      next:(data:any)=>{
        this.userName=data.name;

      },
      error:(error)=>{
      console.log("Error al obtener el nombre de usuario")
      }
    });
  }
  const today = new Date();
  const format = 'dd/MM/yyyy HH:mm'; 
  const locale = 'en-US';
  this.date = formatDate(today, format, locale); 
}
}
