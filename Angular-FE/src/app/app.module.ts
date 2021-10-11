import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

import { RouterModule, Routes } from '@angular/router';
import { NgImageSliderModule } from 'ng-image-slider';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FooterComponent } from './components/footer/footer.component';
import { InfoAccountComponent } from './components/info-account/info-account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { AllCartBaseOnEmailComponent } from './components/all-cart-base-on-email/all-cart-base-on-email.component';
import { CartBaseOnIdComponent } from './components/cart-base-on-id/cart-base-on-id.component';

import { WriteArticleComponent } from './components/write-article/write-article.component';

import { QuillModule } from 'ngx-quill';
import { RateAndCommendComponent } from './components/rate-and-commend/rate-and-commend.component';
import { AllCommendRateBaseonBookidComponent } from './components/all-commend-rate-baseon-bookid/all-commend-rate-baseon-bookid.component';
import { ArticleOfAccountComponent } from './components/article-of-account/article-of-account.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { DetailBlogBaseonidComponent } from './components/detail-blog-baseonid/detail-blog-baseonid.component';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

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
  {
    path: 'articleaccount',
    component: ArticleOfAccountComponent,
    canActivate: [VerifyJwt],
  },
  {
    path: 'account',
    component: InfoAccountComponent,
    canActivate: [VerifyJwt],
  },
  {
    path: 'updatePassword',
    component: UpdatePasswordComponent,
    canActivate: [VerifyJwt],
  },
  {
    path: 'cartsbaseonemail',
    component: AllCartBaseOnEmailComponent,
    canActivate: [VerifyJwt],
  },
  {
    path: 'infocart/:cartId',
    component: CartBaseOnIdComponent,
    canActivate: [VerifyJwt],
  },
  {
    path: 'writearticle',
    component: WriteArticleComponent,
    canActivate: [VerifyJwt],
  },
  {
    path: 'blogs',
    component: BlogsComponent,
  },
  {
    path: 'blog/:blogId',
    component: DetailBlogBaseonidComponent,
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
    FooterComponent,
    InfoAccountComponent,
    UpdatePasswordComponent,
    AllCartBaseOnEmailComponent,
    CartBaseOnIdComponent,
    WriteArticleComponent,
    RateAndCommendComponent,
    AllCommendRateBaseonBookidComponent,
    ArticleOfAccountComponent,
    BlogsComponent,
    DetailBlogBaseonidComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgImageSliderModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    QuillModule.forRoot(),
    QuillModule,
    FormsModule,
    SocialLoginModule,
  ],
  providers: [
    VerifyJwt,
    DatePipe,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '641699989810-19uv4as9et30k0k141i8juhighrj4bp6.apps.googleusercontent.com',
              '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'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '1557335981272770',
              '2f7a5e3c6ddd3e69fa03ecafff77b9ef'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
