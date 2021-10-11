import { Component, OnInit } from '@angular/core';
import { BlogDto } from 'src/app/model/blog-dto';
import { SerFooterService } from './service/ser.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private ser: SerFooterService) {}
  blogs: BlogDto[] = [];

  ngOnInit(): void {
    this.ser.get3BlogInFooter().subscribe({
      next: (res) => {
        this.blogs = res;
      },
      error: (err) => {},
    });
  }
}
