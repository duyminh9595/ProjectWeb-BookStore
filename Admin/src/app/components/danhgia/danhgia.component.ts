import { Component, OnInit } from '@angular/core';
import { DanhGia } from 'src/app/models/danh-gia';
import { Disableenablecommend } from 'src/app/models/disableenablecommend';
import { environment } from 'src/environments/environment';
import { DanhGiaService } from './service/danh-gia.service';

@Component({
  selector: 'app-danhgia',
  templateUrl: './danhgia.component.html',
  styleUrls: ['./danhgia.component.css']
})
export class DanhgiaComponent implements OnInit {

  constructor(private ser: DanhGiaService) { }

  ngOnInit(): void {
    this.getDataFirst();
  }
  data: DanhGia[] = []
  getDataFirst() {
    this.ser.getAllDanhGiaBinhLuan(environment.iduser).subscribe({
      next: res => {
        this.data = res
        console.log(this.data)
      }
    })
  }
  disable(id: number, userid: number) {
    let datasend: Disableenablecommend = new Disableenablecommend();
    datasend.bookid = id;
    datasend.userid = userid;
    this.ser.enabledisable(datasend).subscribe({
      next: res => {
        this.data = [];
        this.getDataFirst();
      }
    })
  }
  enable(id: number, userid: number) {
    let datasend: Disableenablecommend = new Disableenablecommend();
    datasend.bookid = id;
    datasend.userid = userid;
    this.ser.enabledisable(datasend).subscribe({
      next: res => {
        this.data = [];
        this.getDataFirst();
      }
    })
  }
}
