import { Component, inject, OnInit } from '@angular/core';
import { DetailBannerComponent } from "../../components/detail-banner/detail-banner.component";
import { ActivatedRoute } from '@angular/router';
import { GenericHttpService } from '../../services/generic-http.service';
import { Endpoints } from '../../endpoints/endpoints';
import { DetailBannerConfig } from '../../interfaces/ui-configs/detail-banner-config.interface';
import { RateChipComponent } from "../../components/rate-chip/rate-chip.component";
import { DetailConfig } from '../../interfaces/ui-configs/detail-config.interface';
import { Genre, MovieDetailData } from '../../interfaces/models/movie-detail.interface';
import { CommonModule } from '@angular/common';
import { ShowDetailData } from '../../interfaces/models/tv-detail.interface';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    DetailBannerComponent,
    RateChipComponent,
    CommonModule
],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private genericHttpService = inject(GenericHttpService);

  bannerConfig!: DetailBannerConfig;
  config!: DetailConfig;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: any) => {
      if (paramMap.params.movie_id) {
        this.getMovieById(paramMap.params.movie_id);
      } else if (paramMap.params.series_id) {
        this.getSerieById(paramMap.params.series_id);
        
      }
    })
  }

  getMovieById(id: string) {
    this.genericHttpService.httpGet(Endpoints.MOVIE_ID(id)).subscribe({
      next: (res: MovieDetailData) => {
        console.log(res);
        this.bannerConfig = {
          img: Endpoints.IMAGE_BASE + `/w1280${res.backdrop_path}`,
          pageName: 'Movies',
          path: 'movies',
          title: res.original_title
        }

        let result = '';

        res.genres.map((item: Genre, index: number) => {
          result += item.name + (index === res.genres.length - 1 ? '': ', ')
        })

        this.config = {
          img: Endpoints.IMAGE_BASE + `/w500${res.poster_path}`,
          subtitle: res.tagline,
          description: res.overview,
          rate: res.vote_average,
          isVertical: true,
          detailCards: [
            {
              title: 'Type ',
              description: 'Movie'
            },
            {
              title: 'Release date ',
              description: res.release_date
            },
            {
              title: 'Run time ',
              description: res.runtime.toString()
            },
            {
              title: 'Genres ',
              description: result
            },
          ]
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  getSerieById(id: string) {
    this.genericHttpService.httpGet(Endpoints.TV_SHOW_ID(id)).subscribe({
      next: (res: ShowDetailData) => {
        this.bannerConfig = {
          img: Endpoints.IMAGE_BASE + `/w1280${res.backdrop_path}`,
          pageName: 'TV Shows',
          path: 'tvshows',
          title: res.original_name
        }

        let result = '';

        res.genres.map((item: Genre, index: number) => {
          result += item.name + (index === res.genres.length - 1 ? '': ', ')
        })

        this.config = {
          img: Endpoints.IMAGE_BASE + `/w500${res.poster_path}`,
          subtitle: res.tagline,
          description: res.overview,
          rate: res.vote_average,
          isVertical: false,
          detailCards: [
            {
              title: 'Type ',
              description: 'TV Show'
            },
            {
              title: 'Status ',
              description: res.status
            },
            {
              title: 'First air date',
              description: res.first_air_date
            },
            {
              title: 'Number of seasons ',
              description: res.number_of_seasons.toString()
            },
            {
              title: 'Episode run time ',
              description: res.episode_run_time.toString()
            },
            {
              title: 'Genres ',
              description: result
            },
          ]
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

}
