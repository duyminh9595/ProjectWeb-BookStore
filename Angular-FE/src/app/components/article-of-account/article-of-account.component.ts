import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogDto } from 'src/app/model/blog-dto';
import { GetArticleAccountService } from './service/get-article-account.service';

@Component({
  selector: 'app-article-of-account',
  templateUrl: './article-of-account.component.html',
  styleUrls: ['./article-of-account.component.css'],
})
export class ArticleOfAccountComponent implements OnInit {
  data: BlogDto[] = [];
  constructor(private ser: GetArticleAccountService, private router: Router) {}

  ngOnInit(): void {
    this.ser.getArticleByAccount().subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (err) => {},
    });
  }
  goToBlog(blogId: number) {
    this.router.navigateByUrl(`/blog/${blogId}`);
  }
  deleteBlog(blogId: number) {
    this.ser.delArticleByAccount(blogId).subscribe({
      next: (res) => {
        let index = this.data.findIndex((x) => x.id == blogId)!;
        if (index !== -1) {
          this.data.splice(index, 1);
        }
      },
      error: (err) => {
        alert('Lỗi không xác định');
      },
    });
  }
}
