import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Visit {
  totalVisits: number;
  lastVisit: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private readonly apiUrl = 'http://localhost:3030/visits';

  constructor(private http: HttpClient) {}

  recordVisit(): Observable<Visit> {
    console.log('record VISIT')
    const b = this.http.put<Visit>(`${this.apiUrl}/record`, {});
    console.log('VISIT FINISHED');
    return b;
  }

  getVisits(): Observable<Visit> {
    return this.http.get<Visit>(this.apiUrl);
  }
} 