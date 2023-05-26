import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { News } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private newsListSubject: BehaviorSubject<News[]> = new BehaviorSubject<
    News[]
  >([]);

  constructor(private http: HttpClient) {
    this.getAllNewsFromAPI();
  }

  private getAllNewsFromAPI(): void {
    this.http
      .get<News[]>('assets/news.json')
      .pipe(
        map((data: News[]) => {
          this.newsListSubject.next(data);
        })
      )
      .subscribe();
  }

  getAllNews(): Observable<News[]> {
    return this.newsListSubject.asObservable();
  }

  getLastThreeNews(): Observable<News[]> {
    return this.newsListSubject.pipe(map((newsList) => newsList.slice(-3)));
  }

  getNewsById(id: string): Observable<News | null> {
    return this.newsListSubject.pipe(
      map((newsList) => newsList.find((news) => news.ID === id) || null)
    );
  }

  addNews(news: News): void {
    this.newsListSubject.pipe(take(1)).subscribe((newsList: News[]) => {
      const updatedNewsList = [...newsList, news];
      this.newsListSubject.next(updatedNewsList);
    });
  }
}
