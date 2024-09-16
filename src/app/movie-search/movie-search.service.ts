import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {
  private apiKey: string = '5e96da99'; 
  private apiUrl: string = `http://www.omdbapi.com/?apikey=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  
  searchMovie(movieTitle: string): Observable<any> {
    const url = `${this.apiUrl}&t=${movieTitle}`;
    return this.http.get(url);
  }
}