import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailBaiviet } from 'src/app/models/detail-baiviet';
import { BaivietService } from '../baiviet/service/baiviet.service';
import { ReviewbaivietService } from './service/reviewbaiviet.service';

@Component({
  selector: 'app-reviewbaiviet',
  templateUrl: './reviewbaiviet.component.html',
  styleUrls: ['./reviewbaiviet.component.css']
})
export class ReviewbaivietComponent implements OnInit {
  data: DetailBaiviet = new DetailBaiviet();
  loadBLog: boolean = false;
  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private ser: ReviewbaivietService, private ser1: BaivietService) { }

  ngOnInit(): void {
    const check = this.activeRoute.snapshot.paramMap.has('articleid');
    if (check) {
      let blogId = +this.activeRoute.snapshot.paramMap.get('articleid')!;
      this.ser.getBlogs(blogId).subscribe({
        next: (res) => {
          this.data = res;
          this.loadBLog = true;
        },
        error: (err) => {
          this.router.navigateByUrl('');
        },
      });
    } else {
      this.router.navigateByUrl('');
    }
  }
  approve(id: number) {
    this.ser1.approve(id).subscribe({
      next: res => {
        const check = this.activeRoute.snapshot.paramMap.has('articleid');
        if (check) {
          let blogId = +this.activeRoute.snapshot.paramMap.get('articleid')!;
          this.ser.getBlogs(blogId).subscribe({
            next: (res) => {
              this.data = res;
              this.loadBLog = true;
            },
            error: (err) => {
              this.router.navigateByUrl('');
            },
          });
        } else {
          this.router.navigateByUrl('');
        }
      }
    })
  }
}
