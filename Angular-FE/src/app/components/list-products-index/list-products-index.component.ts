import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookInHomepage } from 'src/app/model/book-in-homepage';
import { LoadProductService } from '../list-products/service/load-product.service';

@Component({
  selector: 'app-list-products-index',
  templateUrl: './list-products-index.component.html',
  styleUrls: ['./list-products-index.component.css'],
})
export class ListProductsIndexComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
