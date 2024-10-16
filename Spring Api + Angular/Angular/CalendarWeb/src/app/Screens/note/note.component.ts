import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../Service/Notes/note.service';
import Quill from 'quill';
import Clipboard from 'quill/modules/clipboard';
import { debounceTime, range, Subject } from 'rxjs';
import { UploadComponentComponent } from './upload-component/upload-component.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],

})
export class NoteComponent implements OnInit, AfterViewInit {





  @ViewChild('editorContainer') editorContainer!: ElementRef;
  noteId: number | undefined;
  note: any;
  private editor: Quill | undefined;
  private contentChanged: Subject<string> = new Subject<string>();
  imageUploaded: any;
  

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.noteId = +id;
        if (this.noteId) {
          this.getNoteDetails();
        }
      }
    });
    

    this.contentChanged.pipe(
      debounceTime(1000)
    ).subscribe(content => {
      if (this.noteId !== undefined) {
        this.noteService.updateNote({
          id: this.noteId,
          name: this.note?.name || '',
          content: content
        }).subscribe({
          next: (response: any) => {
            console.log("Updated content");
          },
          error: (error: any) => {
            console.error("Error updating content", error);
          }
        });
      }
    });
  }
  changeFontSize(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newFontSize = `${input.value}rem`; 
    const editorElement = this.editorContainer.nativeElement as HTMLElement;
  
    editorElement.style.fontSize = newFontSize; 
  }

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  getNoteDetails(): void {
    if (this.noteId !== undefined) {
      this.noteService.getNoteById(this.noteId).subscribe({
        next: (response: any) => {
          this.note = response;
          if (this.editor) {
            this.editor.root.innerHTML = this.note.content || '';
          }
        },
        error: (error: any) => {
          console.error('Error fetching note details', error);
        }
      });
    }
  }

  initializeEditor(): void {
    this.editor = new Quill(this.editorContainer.nativeElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline'],
          ['link', 'image'],
          [{ 'align': [] }],
        ]
      }
    });

    const clipboard = this.editor.getModule('clipboard') as Clipboard;
    clipboard.addMatcher('IMG', (node: Node, delta: any) => {
      if (node instanceof HTMLImageElement) {
        const imgUrl = node.getAttribute('src');
        delta.ops.forEach((op: any) => {
          if (op.insert && typeof op.insert === 'string' && op.insert.includes('data:image')) {
            op.insert = `<img src="${imgUrl}">`;
          }
        });
      }
      return delta;
    });

    this.editor.on('text-change', () => {
      this.contentChanged.next(this.getEditorContent());
    });
  }
  onImageUploaded(imageUrl: string) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '100%';

    const editor = this.editorContainer.nativeElement.querySelector('.note-content-editable');
    const selection = window.getSelection();
    if(selection!=null){
      const range = selection.getRangeAt(0);
      range.insertNode(img);

    }else{
      console.log("Range is null")
    }
   
  }
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
  getEditorContent(): string {
    return this.editor ? this.editor.root.innerHTML : '';
  }

  saveTitle(): void {
    if (this.noteId !== undefined) {
      this.noteService.updateNote({
        id: this.noteId,
        name: this.note?.name || '',
        content: this.getEditorContent()
      }).subscribe({
        next: (response: any) => {
          console.log("Title updated");
        },
        error: (error: any) => {
          console.error("Error updating title", error);
        }
      });
    }
  }
  getfilteredNotes(){
    
  }

  saveContent(): void {
    if (this.noteId !== undefined) {
      this.noteService.updateNote({
        id: this.noteId,
        name: this.note?.name || '',
        content: this.getEditorContent() || ''
      }).subscribe({
        next: (response: any) => {
          console.log("Content updated");
        },
        error: (error: any) => {
          console.error("Error updating content", error);
        }
      });
    }
  }
  goBack() {
    this.router.navigate(['/main-screen']);
  }

  
}
