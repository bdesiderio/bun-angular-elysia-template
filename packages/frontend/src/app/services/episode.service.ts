import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Episode } from '../models/episode.model';
import episodesData from '../../assets/data/episodes.json';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  constructor() { }

  getEpisodes(): Observable<Episode[]> {
    // Convertir las fechas de string a Date objects
    const episodes = episodesData.map(episode => ({
      ...episode,
      date: new Date(episode.date)
    }));
    return of(episodes);
  }

  getEpisodeById(id: string): Observable<Episode | undefined> {
    const episode = episodesData.find(episode => episode.id === id);
    if (episode) {
      return of({
        ...episode,
        date: new Date(episode.date)
      });
    }
    return of(undefined);
  }
} 