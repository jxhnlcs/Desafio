import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ConfigService } from './config.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private configService: ConfigService) {}

  findCepsInRadius(findCepsDto: any): Observable<string[]> {
    // Obter o token
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found.');
      return of([]);
    }

    const decodedToken: any = this.jwtHelper.decodeToken(token);
    const userId = decodedToken ? decodedToken.userId : null;

    findCepsDto.loggedUserId = userId;

    return this.http.post<string[]>(`${this.configService.apiUrl}/consultation/find-ceps-in-radius`, findCepsDto);
  }
}