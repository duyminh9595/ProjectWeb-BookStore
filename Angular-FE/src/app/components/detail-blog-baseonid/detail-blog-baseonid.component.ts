import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogDto } from 'src/app/model/blog-dto';
import { GetblogidService } from './service/getblogid.service';

@Component({
  selector: 'app-detail-blog-baseonid',
  templateUrl: './detail-blog-baseonid.component.html',
  styleUrls: ['./detail-blog-baseonid.component.css'],
})
export class DetailBlogBaseonidComponent implements OnInit {
  data!: BlogDto;
  loadBLog: boolean = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private ser: GetblogidService
  ) {}

  ngOnInit(): void {
    const check = this.activeRoute.snapshot.paramMap.has('blogId');
    if (check) {
      let blogId = +this.activeRoute.snapshot.paramMap.get('blogId')!;
      this.ser.getBlogs(blogId).subscribe({
        next: (res) => {
          this.data = res;
          this.loadBLog = true;
        },
        error: (err) => {
          this.router.navigateByUrl('/blogs');
        },
      });
    } else {
      this.router.navigateByUrl('/blogs');
    }
  }
}
