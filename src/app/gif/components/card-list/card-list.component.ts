import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-list.component.html'
})
export class CardListComponent {
  @Input()
  public gifs: Gif[] = [];

}
