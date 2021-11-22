import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CheckJwtService } from './auth/check-jwt.service';
import { VerifyJwtService } from './auth/verify-jwt.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { IndexComponent } from './components/index/index.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { HeaderComponent } from './components/header/header.component';
import { BookComponent, NgbdModalContentAddBook } from './components/book/book.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { CategoryComponent } from './components/category/category.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { EventComponent } from './components/event/event.component';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './components/book-details/book-details.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [VerifyJwtService],
    children: [
      { path: '', component: IndexComponent },
      { path: 'customer', component: ManageUserComponent },
      { path: 'book', component: BookComponent },
      { path: 'book/:bookid', component: BookDetailsComponent },
      {
        path: 'customer/:customerid',
        component: UserDetailComponent,
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
      },
      {
        path: 'invoice/:invoiceid',
        component: InvoiceDetailComponent,
      },
      {
        path: 'publisher',
        component: PublisherComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'event',
        component: EventComponent,
      },
    ]
  },
  { path: '#', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavigationComponent,
    IndexComponent,
    ManageUserComponent,
    HeaderComponent,
    BookComponent,
    UserDetailComponent,
    InvoiceComponent,
    InvoiceDetailComponent,
    CategoryComponent,
    PublisherComponent,
    BlogComponent,
    BlogDetailComponent,
    EventComponent,
    NgbdModalContentAddBook,
    BookDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
