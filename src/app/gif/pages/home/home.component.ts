import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBoxComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
