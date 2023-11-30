import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './gif/pages/home/home.component';
import { SidebarComponent } from './gif/components/sidebar/sidebar.component';
import { GameComponent } from './game/game.component';
import { game_udemy } from './game-udemy/game-udemy.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet, HomeComponent, SidebarComponent, GameComponent, game_udemy],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'game-2';
  childValue: boolean = false;

}
