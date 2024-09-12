import { Component, inject, OnInit } from '@angular/core';
import { MovieCardConfig } from '../../interfaces/ui-configs/movie-card-config.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericHttpService } from '../../services/generic-http.service';
import { Endpoints } from '../../endpoints/endpoints';
import { MovieData, MovieResult } from '../../interfaces/models/movies.interface';
import { HttpClient } from '@angular/common/http';
import { TvData, TvResult } from '../../interfaces/models/tv.interface';
import { InputComponent } from "../../components/input/input.component";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [InputComponent, MovieCardComponent],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.scss'
})
export class ViewCategoryComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private genericService = inject(GenericHttpService);
  private http = inject(HttpClient);

  title: string = '';
  movieCards: MovieCardConfig[] = [];

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((res) => {
      console.log(res);
      this.title = res[0].path.includes('movie') ? 'Movies' : 'TV Shows';

      if (this.title === 'Movies') {
        this.getAllMovies();
      } else if (this.title === 'TV Shows') {
        this.getAllTvShows();
      } else {
        this.router.navigateByUrl('');
      }
    })
  }

  getAllMovies() {
    this.genericService.httpGet(Endpoints.MOVIES)
    .subscribe({
      next: (res: MovieData) => {
        console.log(res);
        this.movieCards = res.results.map((item: MovieResult) => {
          return {
            img: Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`,
            movieName: item.original_title,
            rate: item.vote_average,
            onClick: () => {
              console.log("Movie : ", item)
                this.router.navigateByUrl(`movie/${item.id}`)
            }
          } as MovieCardConfig
        })
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getAllTvShows() {
    this.genericService.httpGet(Endpoints.TV_SHOWS)
    .subscribe({
      next: (res: TvData) => {
        console.log(res);
        this.movieCards = res.results.map((item: TvResult) => {
          return {
            img: Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`,
            movieName: item.original_name,
            rate: item.vote_average,
            onClick: () => {
              console.log("Click : ", item)
  
                this.router.navigateByUrl(`tvshow/${item.id}`)
            }
          } as MovieCardConfig
        })
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
