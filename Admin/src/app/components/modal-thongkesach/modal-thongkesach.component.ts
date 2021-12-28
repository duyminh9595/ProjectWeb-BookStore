import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { StartEndDate } from 'src/app/models/start-end-date';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Sachthongke } from 'src/app/models/sachthongke';
import { ThongkeService } from './service/thongke.service';

@Component({
  selector: 'app-modal-thongkesach',
  templateUrl: './modal-thongkesach.component.html',
  styleUrls: ['./modal-thongkesach.component.css']
})
export class ModalThongkesachComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalThongkesachComponent>, private ser: ThongkeService) { }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }
  data: StartEndDate = new StartEndDate();
  addEventStart(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value)
    var date: any = event.value;
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    const formattedDate = formatDate(date, format, locale);
    this.data.start = formattedDate;
  }
  addEventEnd(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value)
    var date: any = event.value;
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    const formattedDate = formatDate(date, format, locale);
    this.data.end = formattedDate
  }
  xemthongke() {
    this.ser.thongkeSach(this.data).subscribe({
      next: res => {
        this.array = res;
        this.loadData = true;
      }
    })
  }
  loadData: boolean = false;
  inPdf() {
    this.openPDF()
  }
  array: Sachthongke[] = []
  @ViewChild('htmlData') htmlData!: ElementRef;
  public openPDF(): void {
    let DATA = document.getElementById('htmlData')!;

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('From: ' + this.data.start + ' to: ' + this.data.end + '.pdf');
    });
  }
}
