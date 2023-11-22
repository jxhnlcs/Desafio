import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient) {}

  getNearbyCeps(centerCep: string, radiusKm: number): Observable<string[]> {
    return this.http.get<string[]>(`https://api.fakecep.com/nearbyceps?center=${centerCep}&radius=${radiusKm}`);
  }
}