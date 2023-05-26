import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImagePaths } from 'src/app/enums/image-paths.enum';
import { News } from 'src/app/interfaces/news.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent {
  newsList: News[] = [];
  readonly defaultImagePath: string = ImagePaths.DefaultImage;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getAllNews().subscribe((data) => {
      console.log(data);
      this.newsList = data;
    });
  }

  navigateToNewsItem(newsId: string) {
    this.router.navigate(['/news', newsId]);
  }
}
