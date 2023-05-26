import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { News } from 'src/app/interfaces/news.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
})
export class AddNewsComponent implements OnInit {
  newsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      // Додайте інші поля форми, які потрібні для новини
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.newsForm.valid) {
      const newNews: News = {
        ID: '', // Згенеруйте унікальний ID для нової новини
        title: this.newsForm.value.title,
        description: this.newsForm.value.description,
        date: new Date().toISOString(),
        // Заповніть решту полів новини з форми
      };

      this.dataService.addNews(newNews);
      this.newsForm.reset();
    }
  }
}
