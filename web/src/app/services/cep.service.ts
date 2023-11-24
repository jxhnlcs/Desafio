// cep.service.ts
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

  createConsultation(createConsultationDto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/consultation`, createConsultationDto);
  }

  getConsultationById(consultationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/consultation/${consultationId}`);
  }

  getAllConsultations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/consultation`);
  }

  updateConsultation(consultationId: string, updateConsultationDto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/consultation/${consultationId}`, updateConsultationDto);
  }

  deleteConsultation(consultationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/consultation/${consultationId}`);
  }

  findCepsInRadius(findCepsDto: any): Observable<string[]> {
    return this.http.post<string[]>(`${this.apiUrl}/consultation/find-ceps-in-radius`, findCepsDto);
  }
}