import { Injectable } from '@angular/core';
import { AppConstants } from '../../Constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl=AppConstants.API_URL+"users/createUser";


  constructor(private http:HttpClient) { }
  signup(userData:any): Observable<any>{
    return this.http.post<any>(this.apiUrl,userData);
  }
}
