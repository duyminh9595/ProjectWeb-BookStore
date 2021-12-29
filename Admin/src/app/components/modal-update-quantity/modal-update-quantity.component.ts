import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Soluongdto } from 'src/app/models/soluongdto';
import { UpdateQuantityService } from './service/update-quantity.service';

@Component({
  selector: 'app-modal-update-quantity',
  templateUrl: './modal-update-quantity.component.html',
  styleUrls: ['./modal-update-quantity.component.css']
})
export class ModalUpdateQuantityComponent implements OnInit {
  id!: number;
  constructor(public dialogRef: MatDialogRef<ModalUpdateQuantityComponent>, private ser: UpdateQuantityService, @Inject(MAT_DIALOG_DATA) data: number) {
    this.id = data
  }
  data: Soluongdto = new Soluongdto();
  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }
  onKeySoLuong(event: any) {
    this.data.sl = +event.target.value
  }
  update() {
    this.ser.updatesach(this.data, this.id).subscribe({
      next: res => {
        alert("Update thành công")
        this.onNoClick()
      },
      error: err => {
        alert("Lỗi")
      }
    })
  }
}
