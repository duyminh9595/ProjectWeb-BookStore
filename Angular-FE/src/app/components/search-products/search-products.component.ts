import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css'],
})
export class SearchProductsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  search(data: string) {
    console.log(data);
    if (data.trim() != null) {
      this.router.navigateByUrl(`/search/${data}`);
    }
  }
}
