import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { StartEndDate } from 'src/app/models/start-end-date';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ThongkedoanhthuService } from './service/thongkedoanhthu.service';
import { Thongkedoanhthu } from 'src/app/models/thongkedoanhthu';

@Component({
  selector: 'app-modal-thongke-doanhthu',
  templateUrl: './modal-thongke-doanhthu.component.html',
  styleUrls: ['./modal-thongke-doanhthu.component.css']
})
export class ModalThongkeDoanhthuComponent implements OnInit {
  loadData: boolean = false;
  dataDoanhThu: Thongkedoanhthu[] = [];
  constructor(public dialogRef: MatDialogRef<ModalThongkeDoanhthuComponent>, private ser: ThongkedoanhthuService) { }

  ngOnInit(): void {
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
  inPdf() {
    this.openPDF()
  }
  onNoClick() {
    this.dialogRef.close();
  }
  xemthongke() {
    this.ser.thongkedoanhthu(this.data).subscribe({
      next: res => {
        this.dataDoanhThu = res;
        this.loadData = true;
      }
    })
  }
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
