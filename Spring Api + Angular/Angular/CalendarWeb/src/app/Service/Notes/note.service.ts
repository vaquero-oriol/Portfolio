import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AppConstants } from '../../Constants/constants';
import { ErrorHandlerService } from '../Error/error-service.service'
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private createNoteUrl = AppConstants.createNote;
  private getNoteByIdUrl = AppConstants.getNotebyId;
  private updateNoteurl=AppConstants.updateNote;
  private getallNotes=AppConstants.getAllNotes;
  private uploadImage=AppConstants.uploadImage;
  private uploadAudio=AppConstants.uploadAudio;

  constructor(private http: HttpClient) { }

  createNote(userId: number): Observable<any> {
    const url = `${this.createNoteUrl}?id=${userId}`;
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post<any>(url, null, { headers }).pipe(
      map(response => {
        console.log("Response:", response);
        return response;
      }),
      catchError(ErrorHandlerService.handleError('createNote'))
    );
  }

  getNoteById(noteId: number): Observable<any> {
    const url = `${this.getNoteByIdUrl}?id=${noteId}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        console.log("Response:", response);
        return response;
      }),
      catchError(ErrorHandlerService.handleError('getNoteById')) 
    );
  }
  updateNote(noteRequest: { id: number, name: string, content: string }): Observable<any> {

    const headers = { 'Content-Type': 'application/json' };

    return this.http.put<any>(this.updateNoteurl, noteRequest, { headers }).pipe(
      map(response => {
        console.log("Response:", response);
        return response;
      }),
      catchError(ErrorHandlerService.handleError('updateNote'))
    );
  }
  GetAllNotes(userId:number): Observable<any>{
    const url=`${this.getallNotes}?id=${userId}`

    return this.http.get<any>(url).pipe(
      map(response=>{
        console.log("Response,",response);
        return response;
      }),
      catchError(ErrorHandlerService.handleError('getallNotes'))
    );
  }
  UploadImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.uploadImage}`, formData);
  }

  UploadAudio(formData:FormData) :Observable<any>{
   

    return this.http.post(`${this.uploadAudio}`,formData)
  }
  
  }
  

