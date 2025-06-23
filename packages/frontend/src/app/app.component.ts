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
import { Episode } from './models/episode.model';
import { EpisodeService } from './services/episode.service';

// Google Ads conversion tracking function
declare function gtag(...args: any[]): void;

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
  episodes: Episode[] = [];
  selectedHero: Hero | null = null;
  private isGoogleAdsTraffic = false;

  constructor(
    private heroService: HeroService,
    private questService: QuestService,
    private visitService: VisitService,
    private locationService: LocationService,
    private episodeService: EpisodeService
  ) {
  }

  async ngOnInit() {
    this.loadHeroes();
    this.loadQuests();
    this.recordVisit();
    this.loadLocations();
    this.loadEpisodes();

    await this.checkGoogleAdsTraffic();

      gtag('event', 'conversion', {
        'send_to': 'AW-17232040715/djzcCImGquAaEIum8JhA',
        'value': 1.0,
        'currency': 'ARS'
      });
  }

  // Check if traffic comes from Google Ads
  private checkGoogleAdsTraffic(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const gclid = urlParams.get('gclid');
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');

    // Check for gclid (Google Ads click ID) or UTM parameters indicating Google Ads
    this.isGoogleAdsTraffic = !!(
      gclid ||
      (utmSource && utmSource.toLowerCase().includes('google')) ||
      (utmMedium && utmMedium.toLowerCase().includes('cpc')) ||
      (utmCampaign && utmCampaign.toLowerCase().includes('ads'))
    );

    console.log('Google Ads traffic detected:', this.isGoogleAdsTraffic);
    if (this.isGoogleAdsTraffic) {
      console.log('Traffic source details:', { gclid, utmSource, utmMedium, utmCampaign });
    }
  }

  // Google Ads conversion tracking function - only reports if from Google Ads
  gtag_report_conversion(url: string): boolean {
    if (!this.isGoogleAdsTraffic) {
      console.log('Not Google Ads traffic - redirecting without conversion tracking');
      window.open(url, '_blank');
      return false;
    }

    const callback = () => {
      if (typeof (url) !== 'undefined') {
        window.open(url, '_blank');
      }
    };

    console.log('Reporting Google Ads conversion for:', url);
    gtag('event', 'conversion', {
      'send_to': 'AW-17232040715/ZA6aCN7viuAaEIum8JhA',
      'value': 1.0,
      'currency': 'ARS',
      'event_callback': callback
    });

    return false;
  }

  // Handle social media link clicks with conversion tracking
  onSocialMediaClick(url: string, platform: string): void {
    console.log(`Social media click: ${platform} - Google Ads traffic: ${this.isGoogleAdsTraffic}`);
    
    // Record the social click first
    const socialPlatform = platform.toLowerCase() as 'youtube' | 'instagram' | 'twitch';
    this.visitService.recordSocialClick(socialPlatform).subscribe({
      next: () => {
        console.log(`Social click recorded for ${platform}`);
        // Then handle Google Ads conversion if applicable
        this.gtag_report_conversion(url);
      },
      error: (error) => {
        console.error(`Error recording social click for ${platform}:`, error);
        // Still redirect even if recording fails
        this.gtag_report_conversion(url);
      }
    });
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

  private loadEpisodes() {
    this.episodeService.getEpisodes().subscribe(episodes => {
      this.episodes = episodes;
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

  openEpisode(episode: Episode) {
    window.open(episode.youtubeUrl, '_blank');
  }

  getSecureImageUrl(path: string) {
    // return this.heroService.getSecureImageUrl(path);
  }
}
