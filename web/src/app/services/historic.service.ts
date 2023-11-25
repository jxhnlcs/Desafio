import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class HistoricService {

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getHistoric(): Observable<any[]> {
    const url = `${this.configService.apiUrl}/historic`;
    return this.http.get<any[]>(url);
  }
  
}