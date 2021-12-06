import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInfor } from 'src/app/model/book-infor';
import { BookOnCart } from 'src/app/model/book-on-cart';
import { CommendOnBook } from 'src/app/model/commend-on-book';
import { BookDetailService } from './service/book-detail.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  product: BookInfor = new BookInfor();
  bookOnCart: BookOnCart[] = [];
  commendOnBook: CommendOnBook[] = [];
  checkExists: boolean = true;
  bookid!: number;
  constructor(private router: Router,
    private activeRoute: ActivatedRoute, private bookDetailSer: BookDetailService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => this.getProductById());
  }
  getProductById() {
    let checkBookId = this.activeRoute.snapshot.paramMap.has('bookid');
    if (checkBookId) {
      this.bookid = +this.activeRoute.snapshot.paramMap.get('bookid')!;
      this.bookDetailSer.getProductById(this.bookid).subscribe({
        next: (res: any) => {
          console.log(res);
          this.product = res;
          this.bookDetailSer.getCartDetail(this.product.id).subscribe(
            {
              next: res => {
                this.bookOnCart = res;
                console.log(this.bookOnCart)
                this.bookDetailSer.getAllCommendBelongBook(this.product.id).subscribe(
                  {
                    next: res => {
                      this.commendOnBook = res;
                      console.log(this.commendOnBook);
                    }
                  }
                )
              },
              error: err => {

              }
            }
          )
        },
        error: (err) => {
          this.checkExists = false;
        },
      });
    } else {
      this.router.navigateByUrl('/book');
    }
  }
  doHideShow(item: CommendOnBook) {
    this.bookDetailSer.doHideShowCommend(item, this.bookid).subscribe({
      next: res => {
        this.getProductById();
      },
      error: err => {
        alert("Lỗi")
      }
    })
  }
  refreshPage() {
    location.reload()
  }
}
