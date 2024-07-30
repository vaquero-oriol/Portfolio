import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../../Service/Notes/note.service';
import Quill from 'quill';
import Clipboard from 'quill/modules/clipboard';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, AfterViewInit {
  @ViewChild('editorContainer') editorContainer!: ElementRef;
  noteId: number | undefined;
  note: any;
  private editor: Quill | undefined;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService
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
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
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
  }

  getEditorContent(): string {
    return this.editor ? this.editor.root.innerHTML : '';
  }
}
