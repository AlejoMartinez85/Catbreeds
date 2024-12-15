import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { constants } from '../constants/constants';
import { Cat, CurrentCatListData } from '../interfaces/cat.interface';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  apiKey: string = constants.api.key;
  url: string = constants.api.path;
  /**
   * variables for save local data when the user select a cat
   */
  private currentCat: Cat ={
    weight: {
      imperial:'',
      metric: ''
    },
    id: '',
    name: '',
    cfa_url: '',
    vetstreet_url: '',
    vcahospitals_url: '',
    temperament: '',
    origin: '',
    country_codes: '',
    country_code: '',
    description: '',
    life_span: '',
    indoor: 0,
    lap: 0,
    alt_names: '',
    adaptability: 0,
    affection_level: 0,
    child_friendly: 0,
    dog_friendly: 0,
    energy_level: 0,
    grooming: 0,
    health_issues: 0,
    intelligence: 0,
    shedding_level: 0,
    social_needs: 0,
    stranger_friendly: 0,
    vocalisation: 0,
    experimental: 0,
    hairless: 0,
    natural: 0,
    rare: 0,
    rex: 0,
    suppressed_tail: 0,
    short_legs: 0,
    wikipedia_url: '',
    hypoallergenic: 0,
    reference_image_id: '',
    image: {
      id: '',
      width: 0,
      height: 0,
      url: ''
    }
  };
  /**
   * variable for save local data when the services returned
   */
  private currentCatList: CurrentCatListData = {
    catList: [],
    page: 0
  };
  /**
   * getters and setters
   * for current selected Cat
   */
  get getCurrentCat() {
    return this.currentCat;
  }
  set setCurrentCat(catData: Cat) {
    this.currentCat = catData;
  }

  /**
   * getters and setters for the current cat list
   */
  get listCat() {
    return this.currentCatList;
  }

  set setListCat(data: CurrentCatListData) {
    this.currentCatList = data;
  }
  /**
   *
   * @param http
   */
  constructor(private http: HttpClient) { }
  /**
   * service for get all cat list
   * @returns
   */
  getCatList(): Observable<Cat[] | any> {
    const endpoint: string = 'breeds';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    });
    return this.http.get(`${this.url}/${endpoint}`, {headers}).pipe(
      catchError((error: any) => {
        console.log('error in get cat list', error);
        return of([]);
      })
    );
  }
  /**
   * service for get all cat list
   * @returns
   */
  getCatListV2(currentPage: number = 0): Observable<Cat[] | any> {
    const endpoint: string = 'breeds';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    });
    let params = new HttpParams().set('page', currentPage).set('limit', 10);
    const options = {
      headers,
      params
    }
    return this.http.get(`${this.url}/${endpoint}`, options).pipe(
      catchError((error: any) => {
        console.log('error in get cat list', error);
        return of([]);
      })
    );
  }
  /**
   *  service for get a selected cat by id
   * @param id
   * @returns
   */
  getCatListById(id: string):Observable<Cat | any> {
    const endPoint: string = `images/search?breed_ids=${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    });
    return this.http.get(`${this.url}/${endPoint}`, { headers }).pipe(
      catchError((error: any) => {
        console.log('error in get cat list', error);
        return of([]);
      })
    )

  }
  /**
   * function for use whe the user leave the cat detail view
   */
  resetCatSelected(): void {
    this.setCurrentCat = {
      weight: {
        imperial: '',
        metric: ''
      },
      id: '',
      name: '',
      cfa_url: '',
      vetstreet_url: '',
      vcahospitals_url: '',
      temperament: '',
      origin: '',
      country_codes: '',
      country_code: '',
      description: '',
      life_span: '',
      indoor: 0,
      lap: 0,
      alt_names: '',
      adaptability: 0,
      affection_level: 0,
      child_friendly: 0,
      dog_friendly: 0,
      energy_level: 0,
      grooming: 0,
      health_issues: 0,
      intelligence: 0,
      shedding_level: 0,
      social_needs: 0,
      stranger_friendly: 0,
      vocalisation: 0,
      experimental: 0,
      hairless: 0,
      natural: 0,
      rare: 0,
      rex: 0,
      suppressed_tail: 0,
      short_legs: 0,
      wikipedia_url: '',
      hypoallergenic: 0,
      reference_image_id: '',
      image: {
        id: '',
        width: 0,
        height: 0,
        url: ''
      }
    };
  }



}
