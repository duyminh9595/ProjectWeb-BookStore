import { Component, OnInit } from '@angular/core';
import { BookInHomepage } from 'src/app/model/book-in-homepage';
import { LoadBookInHomePageService } from './service/load-book-in-home-page.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
