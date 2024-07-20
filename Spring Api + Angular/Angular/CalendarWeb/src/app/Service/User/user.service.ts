import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConstants } from '../../Constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = AppConstants.API_URL + "users/createUser";

  constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    console.log("Api Url:", this.apiUrl);
    console.log("User data:", userData);

    return this.http.post<any>(this.apiUrl, userData, { headers, responseType: 'text' as 'json' }).pipe(
      catchError(error => {
        let errorMessage = 'Unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          errorMessage = error.error || 'Server error occurred';
        }
        console.error('Error in signup:', errorMessage);
        return throwError(errorMessage); 
      })
    );
  }
}
