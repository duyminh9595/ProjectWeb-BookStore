import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Baiviet } from 'src/app/models/baiviet';
import { environment } from 'src/environments/environment';
import { BaivietService } from './service/baiviet.service';

@Component({
  selector: 'app-baiviet',
  templateUrl: './baiviet.component.html',
  styleUrls: ['./baiviet.component.css']
})
export class BaivietComponent implements OnInit {

  constructor(private ser: BaivietService, private router: Router) { }
  data: Baiviet[] = []
  ngOnInit(): void {
    this.getDataFirst();
  }
  getDataFirst() {
    this.data = [];
    this.ser.getAllArticle(environment.iduser).subscribe({
      next: res => {
        this.data = res;
      }
    })
  }
  enable(id: number) {
    this.ser.approve(id).subscribe({
      next: res => {
        this.getDataFirst()
      }
    })
  }
  disable(id: number) {
    this.ser.approve(id).subscribe({
      next: res => {
        this.getDataFirst()
      }
    })
  }
  seeBaiViet(id: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/article/${id}`])
    );

    window.open(url, '_blank');
  }
}
