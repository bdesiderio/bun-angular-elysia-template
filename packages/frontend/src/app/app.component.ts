import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeroService } from './services/hero.service';
import { QuestService } from './services/quest.service';
import { VisitService } from './services/visit.service';
import { Visit } from './services/visit.service';
import { ProtectedImageDirective } from './directives/protected-image.directive';
import { Hero } from './models/hero.model';
import { Quest } from './models/quest.model';
import { Location } from './models/location.model';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProtectedImageDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  heroes: Hero[] = [];
  quests: Quest[] = [];
  visits: Visit | null = null;
  locations: Location[] = [];
  selectedHero: Hero | null = null;

  constructor(
    private heroService: HeroService,
    private questService: QuestService,
    private visitService: VisitService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.loadHeroes();
    this.loadQuests();
    this.recordVisit();
    this.loadLocations();
  }

  private loadHeroes() {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  private loadQuests() {
    this.questService.getQuests().subscribe(quests => {
      this.quests = quests.sort((a, b) => a.order - b.order);
    });
  }

  private recordVisit() {
    console.log("VISIT");
    this.visitService.recordVisit().subscribe(visits => {
      this.visits = visits;
    });
  }

  private loadLocations() {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
    });
  }

  showHeroDetails(hero: Hero) {
    this.selectedHero = hero;
    document.body.style.overflow = 'hidden';
  }

  closeHeroDetails() {
    this.selectedHero = null;
    document.body.style.overflow = '';
  }

  getSecureImageUrl(path: string) {
    // return this.heroService.getSecureImageUrl(path);
  }
}
