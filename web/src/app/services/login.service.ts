import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class loginService {
  apiUrl: any;
  constructor(private http: HttpClient,  private configService: ConfigService) { }

  login(email: string, password: string): Observable<any> {
    const credentials = { email: email, password: password };
    return this.http.post<any>(`${this.configService.apiUrl}/user/login`, credentials)
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }
}