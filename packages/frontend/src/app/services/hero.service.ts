import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../models/hero.model';
import heroesData from '../../assets/data/heroes.json';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor() { }

  getHeroes(): Observable<Hero[]> {
    // Por ahora retornamos los datos del JSON local
    // En el futuro, aquí iría la llamada al backend
    return of(heroesData);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return of(heroesData.find(hero => hero.id === id));
  }
} 