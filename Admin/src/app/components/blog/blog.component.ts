import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Baiviet } from 'src/app/models/baiviet';
import { NameDto } from 'src/app/models/name-dto';
import { BaivietService } from '../baiviet/service/baiviet.service';
import { BlogService } from './service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private ser1: BlogService, private ser: BaivietService, private router: Router) { }
  data: Baiviet[] = [];
  ngOnInit(): void {
    this.getDataFirst();
  }
  getDataFirst() {
    this.data = [];
    this.ser1.getAllBlog().subscribe({
      next: res => {
        this.data = res
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
  seeInfoUser(id: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/account/${id}`])
    );

    window.open(url, '_blank');
  }
  datasend: NameDto = new NameDto();
  nameBlogOrEmail(event: any) {
    console.log(event.target.value)
    this.datasend.name = event.target.value;
    if (this.datasend.name.length > 0) {
      this.ser1.getBlogByname(this.datasend).subscribe({
        next: res => {
          this.data = [];
          this.data = res
        }
      })
    }
    else {
      this.getDataFirst();
    }
  }
}
