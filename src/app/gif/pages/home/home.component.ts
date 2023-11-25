import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { GifsServicesService } from '../../services/gifs.services.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBoxComponent, CardListComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private gifService: GifsServicesService) { }

  get gifs(): Gif[] {
    return this.gifService.gifList;
  }

}
