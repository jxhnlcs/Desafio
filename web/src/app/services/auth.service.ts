import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class authService {
  apiUrl: any;
  constructor(private http: HttpClient, private configService: ConfigService) { }

  login(email: string, password: string): Observable<any> {
    const credentials = { email: email, password: password };
    return this.http.post<any>(`${this.configService.apiUrl}/user/login`, credentials)
      .pipe(
        tap(response => {
          console.log('Login Response:', response);
          if (response.accessToken) {
            localStorage.setItem('token', response.accessToken);
          } else {
            console.log('No accessToken in the response:', response);
          }
        })
      );
  }

  signup(name: string, email: string, password: string): Observable<any> {
    const user = { name: name, email: email, password: password };
    return this.http
      .post<any>(`${this.configService.apiUrl}/user`, user)
      .pipe(
        tap((response) => {
          console.log('Signup Response:', response);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}