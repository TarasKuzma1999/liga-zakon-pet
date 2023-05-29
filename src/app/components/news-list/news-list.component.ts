import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImagePaths } from 'src/app/enums/image-paths.enum';
import { News } from 'src/app/interfaces/news.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit, OnDestroy {
  newsList: News[] = [];
  readonly defaultImagePath: string = ImagePaths.DefaultImage;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService
      .getAllNews()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.newsList = data;
      });
  }

  navigateToNewsItem(newsId: string) {
    this.router.navigate(['/news', newsId]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
