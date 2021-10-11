import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommendAndRatingDTO } from 'src/app/model/commend-and-rating-dto';
import { GetAllService } from './service/get-all.service';

@Component({
  selector: 'app-all-commend-rate-baseon-bookid',
  templateUrl: './all-commend-rate-baseon-bookid.component.html',
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
export class AllCommendRateBaseonBookidComponent implements OnInit {
  data: CommendAndRatingDTO[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private ser: GetAllService
  ) {}

  ngOnInit(): void {
    const bookId = +this.activeRoute.snapshot.paramMap.get('id')!;
    this.ser.getAllCommantAndRatingOfBookId(bookId).subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (err) => {},
    });
  }
}
