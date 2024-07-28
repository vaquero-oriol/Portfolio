import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AppConstants } from '../../Constants/constants';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private createNoteUrl = AppConstants.createNote;

  constructor(private http: HttpClient) { }

  createNote(userId: number): Observable<any> {
   
    const url = `${this.createNoteUrl}?id=${userId}`;

    const headers = { 'Content-Type': 'application/json' };
    console.log("Api Url:", this.createNoteUrl);
    console.log("Id del usuario:", userId)

    return this.http.post<any>(url, null, { headers, }).pipe(
      map(response=>{
        console.log("Response",response);
      }),
      catchError(error => {
        let errorMessage = 'Unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          errorMessage = error.error || 'Server error occurred';
        }
        console.error('Error in creating note:', errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}

