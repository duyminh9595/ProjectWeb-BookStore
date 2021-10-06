import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css'],
})
export class SlidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  imgCollection: Array<object> = [
    {
      image: 'assets/slider1.jpg',
      thumbImage: 'assets/slider1.jpg',
    },
    {
      image: 'assets/slider2.jpg',
      thumbImage: 'assets/slider2.jpg',
    },
    {
      image: 'assets/slider3.jpg',
      thumbImage: 'assets/slider3.jpg',
    },
    {
      image: 'assets/slider4.jpg',
      thumbImage: 'assets/slider4.jpg',
    },
    {
      image: 'assets/slider5.jpg',
      thumbImage: 'assets/slider5.jpg',
    },
    {
      image: 'assets/slider6.jpg',
      thumbImage: 'assets/slider6.jpg',
    },
    {
      image: 'assets/slider7.jpg',
      thumbImage: 'assets/slider7.jpg',
    },
    {
      image: 'assets/slider8.jpg',
      thumbImage: 'assets/slider8.jpg',
    },
    {
      image: 'assets/slider9.jpg',
      thumbImage: 'assets/slider9.jpg',
    },
  ];
}
