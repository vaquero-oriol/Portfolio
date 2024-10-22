import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private userIdSubject = new BehaviorSubject<number | null>(null);
  userId$ = this.userIdSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        this.userIdSubject.next(Number(storedUserId));
      }
    }
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId'); 
  }
  login(userId: number) {
    if (isPlatformBrowser(this.platformId)) {
      if (userId != null) { 
        localStorage.setItem('userId', userId.toString());
        this.userIdSubject.next(userId);
      } else {
        console.error('userId is undefined or null');
      }
    }
  }
  

  signUp(userId: number) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userId', userId.toString());
      this.userIdSubject.next(userId);
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userId');
      this.userIdSubject.next(null);
    }
  }

  getUserId(): number | null {
    return this.userIdSubject.value;
  }
}
