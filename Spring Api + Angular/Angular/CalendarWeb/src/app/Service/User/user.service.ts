import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConstants } from '../../Constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private createuserUrl = AppConstants.createUser;
  private logInUserUrl = AppConstants.logIn;
  private userNameUrl=AppConstants.userName


  constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    
    const headers = { 'Content-Type': 'application/json' };
    console.log("Api Url:", this.createuserUrl);
    console.log("User data:", userData);

    return this.http.post<any>(this.createuserUrl, userData, { headers }).pipe(
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
  login(userData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    console.log("Api Url:", this.logInUserUrl);
    console.log("User data:", userData);

    return this.http.post<any>(this.logInUserUrl, userData, { headers }).pipe(
      
      map(response => {
        console.log("Raw response:", response);
        return response; 
      }),
      catchError(error => {
        let errorMessage = 'Unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          errorMessage = error.error || 'Server error occurred';
        }
        console.error('Error in Login:', errorMessage);
        return throwError(errorMessage); 
      })
    );
  }

  getUserName(id: number): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const urlWithId = `${this.userNameUrl}?id=${id}`;
    console.log("Api Url:", urlWithId);
    console.log("id:", id);
  
    return this.http.get<any>(urlWithId, { headers }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        let errorMessage = 'Unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          errorMessage = error.error || 'Server error occurred';
        }
        console.error('Error in getting user name:', errorMessage);
        return throwError(errorMessage); 
      })
    );
  }
  
}

