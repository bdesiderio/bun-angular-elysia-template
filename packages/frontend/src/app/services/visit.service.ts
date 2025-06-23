import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Visit {
  totalVisits: number;
  uniqueVisits: number;
  lastVisit: string;
  socialClicks: {
    youtube: number;
    instagram: number;
    twitch: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private readonly apiUrl = `${environment.apiURL}/visits`;
  private readonly VISIT_KEY = 'has_visited_before';

  constructor(private http: HttpClient) {}

  recordVisit(): Observable<Visit> {
    const isUniqueVisit = !localStorage.getItem(this.VISIT_KEY);
    if (isUniqueVisit) {
      localStorage.setItem(this.VISIT_KEY, 'true');
    }
    
    return this.http.put<Visit>(`${this.apiUrl}/record`, { isUniqueVisit });
  }

  recordSocialClick(platform: 'youtube' | 'instagram' | 'twitch'): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/social-click`, { platform });
  }

  getVisits(): Observable<Visit> {
    return this.http.get<Visit>(this.apiUrl);
  }
} 