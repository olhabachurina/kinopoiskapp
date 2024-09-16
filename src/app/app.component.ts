import { Component } from '@angular/core';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieSearchService } from './movie-search/movie-search.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieSearchComponent],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kinopoisk-app';
}