import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './gif/pages/home/home.component';
import { SearchBoxComponent } from './gif/components/search-box/search-box.component';
import { CardListComponent } from './gif/components/card-list/card-list.component';
import { SidebarComponent } from './gif/components/sidebar/sidebar.component';
import { GameComponent } from './game/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, SidebarComponent, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'game-2';
}
