import { Component, EventEmitter, Output } from '@angular/core';
import { NoteService } from '../../../Service/Notes/note.service';

@Component({
  selector: 'app-upload-component',
  templateUrl: './upload-component.component.html',
  styleUrls: ['./upload-component.component.css',
  
  ]
})
export class UploadComponentComponent {
  @Output() imageUploaded = new EventEmitter<string>(); 

  constructor(private noteService: NoteService) {}

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      const formData = new FormData();
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('image', fileInput.files[i]);
      }
      this.UploadImage(formData);
    }
  }

  UploadImage(formData: FormData) {
    this.noteService.UploadImage(formData).subscribe({
      next: (response) => {
        console.log('Image Uploaded Successfully', response);
        const imageUrl = response.value; 
        this.imageUploaded.emit(imageUrl); 
      },
      error: (error) => {
        console.error('Error uploading Image', error);
      }
    });
  }
}
