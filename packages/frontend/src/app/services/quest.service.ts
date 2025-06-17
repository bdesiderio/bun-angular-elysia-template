import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quest } from '../models/quest.model';
import questsData from '../../assets/data/quests.json';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  constructor() { }

  getQuests(): Observable<Quest[]> {
    return of(questsData);
  }

  getQuestById(id: string): Observable<Quest | undefined> {
    return of(questsData.find(quest => quest.id === id));
  }
} 