import { Component } from '@angular/core';
import { ImagePaths } from 'src/app/enums/image-paths.enum';
import { News } from 'src/app/interfaces/news.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  latestNews: News[] = [];
  readonly defaultImagePath: string = ImagePaths.DefaultImage;


  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getLastThreeNews().subscribe((data) => {
      this.latestNews = data;
    });
  }
}
