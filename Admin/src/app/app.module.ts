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
import { RegisterComponent } from './components/register/register.component';
import { InfoAccountComponent } from './components/info-account/info-account.component';
import { BillingAccountComponent } from './components/billing-account/billing-account.component';
import { SettingAccountComponent } from './components/setting-account/setting-account.component';


import { AngularFireModule } from "@angular/fire/compat";
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "@angular/fire/compat/storage";
import { DanhgiaComponent } from './components/danhgia/danhgia.component';
import { BaivietComponent } from './components/baiviet/baiviet.component';
import { ReviewbaivietComponent } from './components/reviewbaiviet/reviewbaiviet.component';
import { ModalAddMaGiamGiaComponent } from './components/modal-add-ma-giam-gia/modal-add-ma-giam-gia.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatSelectModule
} from '@angular/material/select';
import {
  MatDialogModule
} from '@angular/material/dialog';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InvoiceBaseonCouponComponent } from './components/invoice-baseon-coupon/invoice-baseon-coupon.component';
import { ModalThongkesachComponent } from './components/modal-thongkesach/modal-thongkesach.component';
import { ModalAddUserComponent } from './components/modal-add-user/modal-add-user.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalThongkeDoanhthuComponent } from './components/modal-thongke-doanhthu/modal-thongke-doanhthu.component';
import { ModalEditContentComponent } from './components/modal-edit-content/modal-edit-content.component';
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
        path: 'invoice',
        component: InvoiceComponent,
      },
      {
        path: 'invoice/:invoiceid',
        component: InvoiceDetailComponent,
      },
      {
        path: 'invoicebaseoncoupon/:couponid',
        component: InvoiceBaseonCouponComponent,
      },
      {
        path: 'publisher',
        component: PublisherComponent,
      },
      {
        path: 'publisher/:publisherid',
        component: BookComponent,
      },
      {
        path: 'category/:catid',
        component: BookComponent,
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
      {
        path: 'article/:articleid',
        component: ReviewbaivietComponent,
      },
      {
        path: 'account/:accountid',
        component: InfoAccountComponent,
        children: [
          {
            path: '',
            component: BillingAccountComponent
          },
          {
            path: 'setting',
            component: SettingAccountComponent
          },
          {
            path: 'danhgia',
            component: DanhgiaComponent
          },
          {
            path: 'baiviet',
            component: BaivietComponent
          }
        ]
      }
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
    BookDetailsComponent,
    RegisterComponent,
    InfoAccountComponent,
    BillingAccountComponent,
    SettingAccountComponent,
    DanhgiaComponent,
    BaivietComponent,
    ReviewbaivietComponent,
    ModalAddMaGiamGiaComponent,
    InvoiceBaseonCouponComponent,
    ModalThongkesachComponent,
    ModalAddUserComponent,
    EditCustomerComponent,
    ModalThongkeDoanhthuComponent,
    ModalEditContentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    HttpClientModule,
    NgbModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCygO7o54HwNq4eobN4848Xnaw_nuQgwck",
      authDomain: "newsproject-fa5bb.firebaseapp.com",
      projectId: "newsproject-fa5bb",
      storageBucket: "newsproject-fa5bb.appspot.com",
      messagingSenderId: "1053553302212",
      appId: "1:1053553302212:web:5ca79d1dd45c389ca28791",
      measurementId: "G-6Q30DEJELJ"
    }),
    BrowserAnimationsModule, MatDialogModule, MatInputModule, MatNativeDateModule, MatDatepickerModule, MatButtonModule, MatSelectModule, FormsModule,
    ReactiveFormsModule, MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
