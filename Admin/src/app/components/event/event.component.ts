import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { NameDto } from 'src/app/models/name-dto';
import { ModalAddMaGiamGiaComponent } from '../modal-add-ma-giam-gia/modal-add-ma-giam-gia.component';
import { EventService } from './service/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private ser: EventService, public dialog: MatDialog, private router: Router) { }
  data: Coupon[] = [];
  ngOnInit(): void {
    this.getDataFirst();
  }
  getDataFirst() {
    this.data = [];
    this.ser.getAllCoupon().subscribe({
      next: res => {
        this.data = res
      }
    })
  }
  dataSend: NameDto = new NameDto();
  nameMaGiamGia(event: any) {
    this.dataSend.name = event.target.value;
    if (this.dataSend.name.length > 0) {

    }
    else {
      this.getDataFirst();
    }
  }
  addMaGiamGia() {
    const dialogRef = this.dialog.open(ModalAddMaGiamGiaComponent, {
      width: '550px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataFirst();
    });
  }
  disable(id: number) {
    this.ser.disable(id).subscribe({
      next: res => {
        this.data = []
        this.getDataFirst();
      }
    })
  }
  enable(id: number) {
    this.ser.enable(id).subscribe({
      next: res => {
        this.data = []
        this.getDataFirst();
      }
    })
  }
  seeBillUse(id: number) {
    this.router.navigateByUrl('/invoicebaseoncoupon/' + id)
  }
}
