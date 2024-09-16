import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 
import { MovieSearchService } from './movie-search.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], 
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent {
  movieTitle: string = '';  
  minRating: number = 0;  
  movie: any;               
  errorMessage: string | null = null;  
  favoriteMovies: any[] = []; 
  loading: boolean = false; 
  constructor(private movieSearchService: MovieSearchService) {
    this.loadFavorites(); 
  }

  
  onSearchMovie(): void {
    this.loading = true; 
    if (!/^[A-Za-z0-9\s]+$/.test(this.movieTitle)) {
      this.errorMessage = 'Please enter the movie title in English.';
      this.loading = false; 
      return;
    }

    this.movieSearchService.searchMovie(this.movieTitle).subscribe(
      (data) => {
        this.loading = false; 
        if (data.Response === 'False') {
          this.errorMessage = 'Movie not found. Please try another title.';
        } else if (parseFloat(data.imdbRating) >= this.minRating) {  
          this.movie = data;
          this.errorMessage = null;
        } else {
          this.errorMessage = `No movies found with a rating higher than ${this.minRating}.`;
        }
      },
      (error) => {
        this.loading = false; 
        this.errorMessage = 'An error occurred while fetching the movie. Please try again later.';
        console.error('Error fetching movie:', error);
      }
    );
  }

  
  addToFavorites(): void {
    if (this.movie && !this.isFavorite(this.movie)) {
      this.favoriteMovies.push(this.movie);
      this.saveFavorites();
    }
  }

  
  removeFromFavorites(movie: any): void {
    this.favoriteMovies = this.favoriteMovies.filter(fav => fav.imdbID !== movie.imdbID);
    this.saveFavorites();
  }

  
  isFavorite(movie: any): boolean {
    return this.favoriteMovies.some(fav => fav.imdbID === movie.imdbID);
  }

 
  saveFavorites(): void {
    try {
      localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies));
    } catch (e) {
      console.error('Error saving favorites to localStorage:', e);
    }
  }

 
  loadFavorites(): void {
    try {
      const favorites = localStorage.getItem('favoriteMovies');
      if (favorites) {
        this.favoriteMovies = JSON.parse(favorites);
      }
    } catch (e) {
      console.error('Error loading favorites from localStorage:', e);
    }
  }
}