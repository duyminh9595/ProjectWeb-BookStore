import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Gender } from 'src/app/models/gender';
import { UserRegister } from 'src/app/models/user-register';
import { AddUserService } from './service/add-user.service';

@Component({
  selector: 'app-modal-add-user',
  templateUrl: './modal-add-user.component.html',
  styleUrls: ['./modal-add-user.component.css']
})
export class ModalAddUserComponent implements OnInit {
  genders: Gender[] = [
    { value: true, viewValue: 'Nam' },
    { value: false, viewValue: 'Nữ' },
  ];
  constructor(public dialogRef: MatDialogRef<ModalAddUserComponent>, private ser: AddUserService) { }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }
  data: UserRegister = new UserRegister();
  addUser() {
    this.ser.doSignUp(this.data).subscribe({
      next: res => {
        alert("Đăng ký thành công")
        this.onNoClick();
      },
      error: err => {
        alert("Lỗi")
      }
    })
  }
  changeGender(value: any) {
    this.data.Gender = value
    console.log(value)
  }
  onKeyFirstName(event: any) {
    this.data.FirstName = event.target.value;
  }
  onKeyLastName(event: any) {
    this.data.LastName = event.target.value;
  }
  onKeyEmail(event: any) {
    this.data.Email = event.target.value;
  }
  onKeyMatKhau(event: any) {
    this.data.Password = event.target.value;
  }
}
