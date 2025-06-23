import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { VisitService } from './services/visit.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let mockVisitService: jasmine.SpyObj<VisitService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('VisitService', ['recordVisit', 'recordSocialClick', 'getVisits']);
    
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: VisitService, useValue: spy }
      ]
    }).compileComponents();

    mockVisitService = TestBed.inject(VisitService) as jasmine.SpyObj<VisitService>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have Google Ads conversion tracking functionality', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(typeof app.gtag_report_conversion).toBe('function');
    expect(typeof app.onSocialMediaClick).toBe('function');
  });

  it('should record social media clicks', () => {
    mockVisitService.recordSocialClick.and.returnValue(of(void 0));
    
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    app.onSocialMediaClick('https://youtube.com', 'YouTube');
    
    expect(mockVisitService.recordSocialClick).toHaveBeenCalledWith('youtube');
  });

  it('should detect Google Ads traffic from gclid parameter', () => {
    // Mock URL with gclid parameter
    Object.defineProperty(window, 'location', {
      value: {
        search: '?gclid=test123'
      },
      writable: true
    });

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    // Access private method for testing
    const checkGoogleAdsTraffic = (app as any).checkGoogleAdsTraffic;
    checkGoogleAdsTraffic.call(app);
    
    expect((app as any).isGoogleAdsTraffic).toBe(true);
  });

  it('should detect Google Ads traffic from UTM parameters', () => {
    // Mock URL with UTM parameters
    Object.defineProperty(window, 'location', {
      value: {
        search: '?utm_source=google&utm_medium=cpc&utm_campaign=ads'
      },
      writable: true
    });

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    // Access private method for testing
    const checkGoogleAdsTraffic = (app as any).checkGoogleAdsTraffic;
    checkGoogleAdsTraffic.call(app);
    
    expect((app as any).isGoogleAdsTraffic).toBe(true);
  });

  it('should not detect Google Ads traffic from regular traffic', () => {
    // Mock URL without Google Ads parameters
    Object.defineProperty(window, 'location', {
      value: {
        search: ''
      },
      writable: true
    });

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    // Access private method for testing
    const checkGoogleAdsTraffic = (app as any).checkGoogleAdsTraffic;
    checkGoogleAdsTraffic.call(app);
    
    expect((app as any).isGoogleAdsTraffic).toBe(false);
  });

  it('should render Acolitos del Rol title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Acolitos del Rol');
  });
});
