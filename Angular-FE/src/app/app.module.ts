import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

import { RouterModule, Routes } from '@angular/router';
import { NgImageSliderModule } from 'ng-image-slider';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SlidebarComponent } from './components/slidebar/slidebar.component';
import { TopServiceComponent } from './components/top-service/top-service.component';
import { FeatureProductComponent } from './components/feature-product/feature-product.component';
import { IndexComponent } from './components/index/index.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ListProductsIndexComponent } from './components/list-products-index/list-products-index.component';
import { FilterCategoriesComponent } from './components/filter-categories/filter-categories.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { FilterPublishersComponent } from './components/filter-publishers/filter-publishers.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CheckOutComponent } from './components/check-out/check-out.component';

import { VerifyJwt } from './auth/verify-jwt';
import { CheckCartExistsInlocal } from './auth/check-cart-exists-inlocal';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  {
    path: '',
    component: HomepageComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
        children: [
          { path: 'books', component: ListProductsComponent },
          { path: 'books/:id', component: ProductDetailComponent },
          { path: 'books/type/:typeId', component: ListProductsComponent },
          {
            path: 'books/publisher/:publisherId',
            component: ListProductsComponent,
          },
          { path: 'search/:keyword', component: ListProductsComponent },
          { path: '', component: ListProductsIndexComponent },
        ],
      },
    ],
  },
  { path: 'cart', component: OrdersComponent },
  {
    path: 'checkout',
    component: CheckOutComponent,
    canActivate: [CheckCartExistsInlocal],
  },
  { path: '#', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    HomepageComponent,
    SlidebarComponent,
    TopServiceComponent,
    FeatureProductComponent,
    IndexComponent,
    ListProductsComponent,
    ListProductsIndexComponent,
    FilterCategoriesComponent,
    SearchProductsComponent,
    FilterPublishersComponent,
    ProductDetailComponent,
    OrdersComponent,
    CheckOutComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgImageSliderModule,
  ],
  providers: [VerifyJwt],
  bootstrap: [AppComponent],
})
export class AppModule {}
