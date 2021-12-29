import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { BookInfor } from 'src/app/model/book-infor';
import { BookOnCart } from 'src/app/model/book-on-cart';
import { CommendOnBook } from 'src/app/model/commend-on-book';
import { ImageTruyen } from 'src/app/models/image-truyen';
import { ModalEditContentComponent } from '../modal-edit-content/modal-edit-content.component';
import { ModalUpdateQuantityComponent } from '../modal-update-quantity/modal-update-quantity.component';
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
    private activeRoute: ActivatedRoute, private bookDetailSer: BookDetailService, public dialog: MatDialog, private storage: AngularFireStorage) { }

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
  goToCart(id: number) {
    this.router.navigateByUrl('/invoice/' + id)
  }
  viewInvoice(id: number) {

  }
  editBook(id: number) {
    const dialogRef = this.dialog.open(ModalEditContentComponent, {
      width: '950px',
      data: this.bookid
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProductById();
    });
  }
  filePath!: string
  fb!: any;
  downloadURL!: Observable<string>;
  linkImageUrl: any;
  uploaded: boolean = false;
  imgatruyen: ImageTruyen = new ImageTruyen();
  upload(event: any) {
    console.log(this.filePath)
    // this.afStorage.upload('/images' + Math.random() + this.filePath, this.filePath);
    this.storage.upload('/images' + Math.random() + this.filePath, this.filePath)
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            this.linkImageUrl = this.fb
            console.log(this.linkImageUrl);
            this.uploaded = true;
            this.imgatruyen.image_url = this.linkImageUrl;
            this.bookDetailSer.updateImage(this.bookid, this.imgatruyen).subscribe({
              next: res => {
                this.activeRoute.paramMap.subscribe(() => this.getProductById());
              },
              error: err => {
                alert("Thất bại")
              }
            })
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
  updatesl(id: number) {
    const dialogRef = this.dialog.open(ModalUpdateQuantityComponent, {
      width: '450px',
      data: this.bookid
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProductById();
    });
  }

}
