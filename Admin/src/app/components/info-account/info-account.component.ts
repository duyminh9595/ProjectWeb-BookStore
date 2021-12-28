import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { UserInfo } from 'src/app/model/user-info';
import { environment } from 'src/environments/environment';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { ManageUserService } from '../manage-user/service/manage-user.service';
import { InfoAccountService } from './service/info-account.service';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.css']
})
export class InfoAccountComponent implements OnInit {

  constructor(private router: Router,
    private activeRoute: ActivatedRoute, private ser: InfoAccountService, private manageSer: ManageUserService, private storage: AngularFireStorage, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => this.detailUser());
    this.settingaccount = false;
    this.hoadondamua = true;

  }
  edit() {
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      width: '550px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('/account/' + environment.iduser).then(() => {
        window.location.reload();
      });
    });
  }
  data: UserInfo = new UserInfo();
  detailUser() {
    let checkexist = this.activeRoute.snapshot.paramMap.has('accountid');
    if (checkexist) {
      let id = +this.activeRoute.snapshot.paramMap.get('accountid')!;
      environment.iduser = id;
      this.ser.getUserById(id).subscribe({
        next: res => {
          this.data = res;
          this.settingaccount = false;
          this.hoadondamua = true;
        },
        error: err => {
          // this.router.navigateByUrl('customer');
        }
      })
    }
    else {
      // this.router.navigateByUrl('customer');
    }
  }
  enabledisable() {
    this.manageSer.disableAccount(this.data.id).subscribe({
      next: res => {
        this.data = new UserInfo();
        let id = +this.activeRoute.snapshot.paramMap.get('accountid')!;
        this.ser.getUserById(id).subscribe({
          next: res => {
            this.data = res;
            console.log(this.data);
          }
        })
      }
      , error: err => {
        alert("Lỗi")
      }
    })
  }
  hoadondamua: boolean = true;
  settingaccount: boolean = false;
  danhgia: boolean = false;
  baiviet: boolean = false;
  clickSelecSetting() {
    environment.setting = true;
    if (environment.setting) {
      this.settingaccount = true;
      this.hoadondamua = false;
      environment.billing = false;
    }
    console.log(environment.setting)
    this.settingaccount = true;
    this.hoadondamua = false;
    this.danhgia = false;
    this.baiviet = false;
    this.router.navigateByUrl('/account/' + this.data.id + '/setting')
  }
  clickSelectHoaDon() {
    environment.billing = true;
    if (environment.billing) {
      this.settingaccount = false;
      this.hoadondamua = true;
      environment.setting = false;
    }
    this.settingaccount = false;
    this.hoadondamua = true;
    this.danhgia = false;
    this.baiviet = false;
    this.router.navigateByUrl('/account/' + this.data.id)
  }
  gotodanhgia() {
    this.settingaccount = false;
    this.hoadondamua = false;
    this.danhgia = true;
    this.danhgia = false;
    this.router.navigateByUrl('/account/' + this.data.id + '/danhgia')
  }
  gotobaiviet() {
    this.settingaccount = false;
    this.hoadondamua = false;
    this.danhgia = false;
    this.baiviet = true;
    this.router.navigateByUrl('/account/' + this.data.id + '/baiviet')
  }
}
