import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private sanitizer: DomSanitizer) {}

  getSecureImageUrl(path: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(path);
  }
} 