import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-thongkesach',
  templateUrl: './modal-thongkesach.component.html',
  styleUrls: ['./modal-thongkesach.component.css']
})
export class ModalThongkesachComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalThongkesachComponent>) { }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }
  addEventStart(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value)
    var date: any = event.value;
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    const formattedDate = formatDate(date, format, locale);
    console.log(formattedDate)
  }
  addEventEnd(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value)
    var date: any = event.value;
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    const formattedDate = formatDate(date, format, locale);
    console.log(formattedDate)
  }
  xemthongke() { }
}
