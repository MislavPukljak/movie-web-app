import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
   baseUrl: string = 'https://api.themoviedb.org/3';
  constructor(private httpClient: HttpClient) { }

  httpGet(url: string): any {
    return this.httpClient.get<any>(`${this.baseUrl}/${url}`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2YwNjI5OTBhYmRkYjk1MmU3YTIyYmMzOGZhY2Q4YyIsIm5iZiI6MTcyNTg3ODY5OS42OTI2MjEsInN1YiI6IjY2NjMyNjk0ZDQ3MzJmMTU3NjA4YWZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ae4qiYaqhpv62y0jUa1krfbodALmOwiN2FjoFXKNmb0`
      }
    });
  }
}
