import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  static handleError(operation = 'operation') {
    return (error: any): Observable<never> => {
      let errorMessage = 'Unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        errorMessage = error.error || 'Server error occurred';
      }
      console.error(`${operation} failed: ${errorMessage}`);
      return throwError(errorMessage);
    };
  }
}
