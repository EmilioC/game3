import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsServicesService } from '../../services/gifs.services.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './app.sidebar.css'
})
export class SidebarComponent {

  constructor(private gifsService: GifsServicesService) { }

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }

}
