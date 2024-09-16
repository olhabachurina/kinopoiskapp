import { bootstrapApplication } from '@angular/platform-browser';
import { MovieSearchComponent } from './app/movie-search/movie-search.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(MovieSearchComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));