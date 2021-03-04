import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Region, Country } from '../models/world.model';

@Injectable( { providedIn: 'root'})
export class WorldRepositoryService {

  constructor(private http: HttpClient) { }
  
  private region: Region[] = [
    { id: 1, name: 'Asia' },
    { id: 2, name: 'Europe' },
  ];
  getRegion(): Observable<Region[]> {
    return of(this.region);
  }
  getCountries(name: string): Observable<Country[]> {
    if (name === 'Asia') {
      return this.getAsianCountries();
    }
    return this.getEuropeanCountries();
  }
  getAsianCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.apiURL}asia`);
  }
  getEuropeanCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.apiURL}europe`);
  }
}
