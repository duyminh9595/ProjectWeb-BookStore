import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookInfor } from 'src/app/model/book-infor';
import { CatBook } from 'src/app/model/cat-book';
import { Publisher } from 'src/app/model/publisher';
import { PublisherBook } from 'src/app/model/publisher-book';
import { TypeDto } from 'src/app/models/type-dto';
import { UpdateSachDto } from 'src/app/models/update-sach-dto';
import { EditBookService } from './edit-book.service';

@Component({
  selector: 'app-modal-edit-content',
  templateUrl: './modal-edit-content.component.html',
  styleUrls: ['./modal-edit-content.component.css']
})
export class ModalEditContentComponent implements OnInit {
  id!: number;
  constructor(public dialogRef: MatDialogRef<ModalEditContentComponent>, private ser: EditBookService, @Inject(MAT_DIALOG_DATA) data: number) {
    this.id = data
  }
  data: Publisher[] = [];
  datanew: UpdateSachDto = new UpdateSachDto();
  dataCategory: TypeDto[] = [];
  product: BookInfor = new BookInfor();
  nxb: number = 0;
  theloai: number = 0;
  ngOnInit(): void {
    console.log(this.id)
    this.ser.getProductById(this.id).subscribe({
      next: res => {
        this.product = res;
        console.log(this.product)
        this.ser.getPublisher().subscribe(this.getData())
      }
    })
  }
  getData() {
    return (data: any) => {
      this.data = data;
      console.log(this.data)
      this.ser.getType().subscribe(this.getData1())
    }
  }
  getData1() {
    return (data: any) => {
      this.dataCategory = data;
      console.log(this.dataCategory)
      this.nxb = this.product.publisherId;
      this.theloai = this.product.typeId;
      console.log(this.dataCategory)
      console.log(this.theloai)
    }
  }
  changeNXB(value: any) {
    this.product.publisherId = +value
  }
  changetheloai(value: any) {
    this.product.typeId = +value
  }
  onKeyTieuDe(event: any) {
    this.product.name = event.target.value;
  }
  onKeyNoiDung(event: any) {
    this.product.shortReview = event.target.value;
  }
  onNoClick() {
    this.dialogRef.close();
  }
  update() {
    this.datanew.price = this.product.price;
    this.datanew.publisherId = this.product.publisherId;
    this.datanew.typeId = this.product.typeId;
    this.datanew.name = this.product.name;
    this.datanew.shortReview = this.product.shortReview;
    this.ser.updatesach(this.datanew, this.id).subscribe({
      next: res => {
        alert("Update thành công")
        this.onNoClick()
      },
      error: err => {
        alert("Lỗi")
      }
    })
  }
  onkeygiaban(event: any) {
    this.product.price = +event.target.value
  }
  onkeytacgia(event: any) {
    this.product.authorName = event.target.value
  }
}
