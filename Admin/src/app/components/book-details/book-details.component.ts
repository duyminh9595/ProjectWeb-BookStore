import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInfor } from 'src/app/model/book-infor';
import { BookDetailService } from './service/book-detail.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  product: BookInfor = new BookInfor();
  checkExists: boolean = true;
  constructor(private router: Router,
    private activeRoute: ActivatedRoute, private bookDetailSer: BookDetailService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => this.getProductById());
  }
  getProductById() {
    let checkBookId = this.activeRoute.snapshot.paramMap.has('bookid');
    if (checkBookId) {
      let bookId = +this.activeRoute.snapshot.paramMap.get('bookid')!;
      this.bookDetailSer.getProductById(bookId).subscribe({
        next: (res: any) => {
          console.log(res);
          this.product = res;
        },
        error: (err) => {
          this.checkExists = false;
        },
      });
    } else {
      this.router.navigateByUrl('/book');
    }
  }

}
