import { Component, OnInit, HostListener } from '@angular/core';
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
import { trigger, state, style, transition, animate } from '@angular/animations';

// Google Ads conversion tracking function
declare function gtag(...args: any[]): void;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProtectedImageDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  heroes: Hero[] = [];
  quests: Quest[] = [];
  visits: Visit | null = null;
  locations: Location[] = [];
  episodes: Episode[] = [];
  selectedHero: Hero | null = null;
  private isGoogleAdsTraffic = false;
  showFloatingSocialPanel = false;

  constructor(
    private heroService: HeroService,
    private questService: QuestService,
    private visitService: VisitService,
    private locationService: LocationService,
    private episodeService: EpisodeService
  ) {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkSocialSectionVisibility();
  }

  private checkSocialSectionVisibility(): void {
    const socialSection = document.querySelector('.hero-cta');
    if (socialSection) {
      const rect = socialSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Mostrar el panel flotante cuando la sección de redes sociales no está visible
      // o cuando está muy cerca del borde superior (más de 100px arriba)
      this.showFloatingSocialPanel = rect.bottom < 0 || rect.top > windowHeight - 100;
    }
  }

  async ngOnInit() {
    this.loadHeroes();
    this.loadQuests();
    this.recordVisit();
    this.loadLocations();
    this.loadEpisodes();

    await this.checkGoogleAdsTraffic();

    // Verificar la visibilidad inicial de la sección de redes sociales
    setTimeout(() => {
      this.checkSocialSectionVisibility();
    }, 100);

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
    
    // HACER TRACKING SIEMPRE - independientemente del dispositivo
    this.recordSocialClick(platform);
    
    // Detectar si es dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // URLs específicas para aplicaciones móviles
    const mobileUrls = {
      'YouTube': 'youtube://www.youtube.com/@AcolitosDelRol', // Intentar abrir app de YouTube
      'Instagram': 'instagram://user?username=acolitosdelrol', // Intentar abrir app de Instagram
      'Twitch': 'twitch://stream/acolitosdelrol' // Intentar abrir app de Twitch
    };
    
    // URL final a usar
    let finalUrl = url;
    
    if (isMobile) {
      const mobileUrl = mobileUrls[platform as keyof typeof mobileUrls];
      if (mobileUrl) {
        // Intentar abrir la app nativa, si falla, abrir la web
        this.openAppOrFallback(mobileUrl, url, platform);
        return;
      }
    }
    
    // Para PC o si no hay URL móvil específica, usar comportamiento actual
    this.openSocialLink(finalUrl, platform);
  }

  // Función para registrar el clic social (tracking)
  private recordSocialClick(platform: string): void {
    const socialPlatform = platform.toLowerCase() as 'youtube' | 'instagram' | 'twitch';
    this.visitService.recordSocialClick(socialPlatform).subscribe({
      next: () => {
        console.log(`Social click recorded for ${platform}`);
      },
      error: (error) => {
        console.error(`Error recording social click for ${platform}:`, error);
      }
    });
  }

  // Función para intentar abrir app nativa o fallback a web
  private openAppOrFallback(appUrl: string, webUrl: string, platform: string): void {
    // Variable para rastrear si la app se abrió
    let appOpened = false;
    
    // Escuchar cambios en la visibilidad de la página
    const handleVisibilityChange = () => {
      if (document.hidden) {
        appOpened = true;
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Intentar abrir la app usando window.location
    try {
      window.location.href = appUrl;
    } catch (error) {
      console.log(`Error opening ${platform} app:`, error);
    }
    
    // Después de un tiempo, verificar si la app se abrió
    setTimeout(() => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Si la app no se abrió (usuario aún está en la página), abrir la web
      if (!appOpened && document.visibilityState === 'visible') {
        console.log(`App ${platform} no disponible, abriendo web`);
        this.openWebLink(webUrl, platform);
      }
    }, 1500);
  }

  // Función para abrir enlace web (sin tracking adicional)
  private openWebLink(url: string, platform: string): void {
    // Solo manejar Google Ads conversion si aplica
    this.gtag_report_conversion(url);
  }

  // Función para abrir enlace social con tracking (mantener para PC)
  private openSocialLink(url: string, platform: string): void {
    // El tracking ya se hizo en onSocialMediaClick, solo manejar Google Ads conversion
    this.gtag_report_conversion(url);
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
