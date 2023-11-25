import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsServicesService } from '../../services/gifs.services.service';


@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsSerice: GifsServicesService) {
  }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsSerice.searchTag(newTag)
    console.log({ newTag })
    this.tagInput.nativeElement.value = '';

  }

}
