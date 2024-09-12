import { Component, inject, Input } from '@angular/core';
import { DetailBannerConfig } from '../../interfaces/ui-configs/detail-banner-config.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-banner',
  standalone: true,
  imports: [],
  templateUrl: './detail-banner.component.html',
  styleUrl: './detail-banner.component.scss'
})
export class DetailBannerComponent {
  @Input() config!: DetailBannerConfig;

  private router = inject(Router);

  open(link: string) {
    this.router.navigateByUrl(link);
  }
}
