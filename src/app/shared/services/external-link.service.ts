import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalLinkService {

  constructor() { }
  /**
   * service for validate and open  external links
   * @param url
   */
  openExternalLink(url: string) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank');
    } else {
      console.warn('Invalid URL format');
    }
  }
}
