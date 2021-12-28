import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { NgaysinhGender } from 'src/app/models/ngaysinh-gender';
import { environment } from 'src/environments/environment';
import { EditCustomerService } from './service/edit-customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditCustomerComponent>, private ser: EditCustomerService) { }
  data: NgaysinhGender = new NgaysinhGender();
  gender: number = -1;
  dateOfBirth = new FormControl(new Date())
  ngOnInit(): void {
    this.getDataFirst();
  }
  update() {
    console.log(this.data)
    this.data.gender = Boolean(Number(this.data.gender));
    this.ser.updateInfo(environment.iduser, this.data).subscribe({
      next: res => {
        alert("Thành công")
        this.onNoClick();
      },
      error: err => {
        alert("Lỗi")
      }
    })
  }
  getDataFirst() {
    this.ser.getInfo(environment.iduser).subscribe({
      next: res => {
        this.data = res
        console.log(this.data)
        const format = 'yyyy-MM-dd';
        const locale = 'en-US';
        const formattedDate = formatDate(this.data.ngaySinh, format, locale);
        this.data.ngaySinh = formattedDate
        let newDate = new Date(formattedDate);
        this.dateOfBirth = new FormControl(newDate);
        if (this.data.gender)
          this.gender = 1;
        else
          this.gender = 0
      }
    })
  }
  changeGender(value: any) {
    console.log(value)
    this.data.gender = value;
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
    this.data.ngaySinh = formattedDate
  }
}
