import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RatingAndCommend } from 'src/app/model/rating-and-commend';
import { DoRatingService } from './service/do-rating.service';

@Component({
  selector: 'app-rate-and-commend',
  templateUrl: './rate-and-commend.component.html',
  styles: [
    `
      .star {
        position: relative;
        display: inline-block;
        font-size: 3rem;
        color: #d3d3d3;
      }
      .full {
        color: red;
      }
      .half {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        color: red;
      }
    `,
  ],
})
export class RateAndCommendComponent implements OnInit {
  checkTokenValid: boolean = false;
  localStore: Storage = localStorage;
  checkUserHasComment: boolean = false;
  checkUserHasBuy: boolean = false;
  bookId!: number;
  constructor(
    private doRating: DoRatingService,
    private activeRoute: ActivatedRoute
  ) {}

  currentRate: number = 0;
  ngOnInit(): void {
    this.bookId = +this.activeRoute.snapshot.paramMap.get('id')!;
    if (localStorage.getItem('tokenLogin')) {
      console.log('checktoken');
      this.checkTokenValid = true;
      this.doRating.doCheckUserHasComment(this.bookId).subscribe({
        next: (res) => {
          if (res) {
            this.checkUserHasComment = true;
          } else {
            this.checkUserHasComment = false;
          }
        },
        error: (err) => {
          this.checkUserHasComment = false;
        },
      });

      this.doRating.doCheckUserHasBuy(this.bookId).subscribe({
        next: (res) => {
          if (res) {
            this.checkUserHasBuy = true;
          } else {
            this.checkUserHasBuy = false;
          }
        },
        error: (err) => {},
      });
    }
  }
  doPostCommandAndRating(data: string) {
    console.log(this.currentRate + ' - ' + data);

    let item: RatingAndCommend = new RatingAndCommend();
    item.bookId = this.bookId;
    item.commend = data;
    item.rating = +this.currentRate;
    console.log(item);
    this.doRating.doPostRatingStar(item, this.bookId).subscribe({
      next: (res) => {
        console.log(res);
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
