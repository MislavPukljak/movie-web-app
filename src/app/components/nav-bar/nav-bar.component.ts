import { Component, inject, Input } from '@angular/core';
import { NavItemConfig } from '../../interfaces/ui-configs/navi-item-donfig.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  private router = inject(Router);

  navItems: NavItemConfig[] = [{
    name: 'Movie',
    path: 'movies',
    active: false
  },
  {
    name: 'TV Shows',
    path: 'tvshows',
    active: false
  },
  // {
  //   name: 'Suggestions',
  //   path: 'suggestions',
  //   icon: 'bi bi-arrow-right',
  //   active: false
  // }
]

  selectedItem(nav: NavItemConfig) {
    this.navItems.map((item: NavItemConfig) => {
      item.active = nav.name === item.name
    })

    this.router.navigateByUrl(nav.path);
  }

  homePage() {
    this.router.navigateByUrl('');
  }
}
