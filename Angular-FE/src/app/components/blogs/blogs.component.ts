import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogDto } from 'src/app/model/blog-dto';
import { GetAllService } from './service/get-all.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  data: BlogDto[] = [];
  constructor(private ser: GetAllService, private router: Router) {}

  ngOnInit(): void {
    this.ser.getBlogs().subscribe({
      next: (res) => {
        this.data = res;
        console.log(this.data);
      },
      error: (err) => {},
    });
  }
  readBlog(id: number) {
    this.router.navigateByUrl(`/blog/${id}`);
  }
}
