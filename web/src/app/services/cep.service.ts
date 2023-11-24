import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  private get apiUrl(): string {
    return this.configService.apiUrl;
  }

  findCepsInRadius(findCepsDto: any): Observable<string[]> {
    return this.http.post<string[]>(`${this.apiUrl}/consultation/find-ceps-in-radius`, findCepsDto);
  }
}