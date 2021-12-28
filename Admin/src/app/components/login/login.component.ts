import { Component, OnInit } from '@angular/core';
import { Adminlogin } from 'src/app/model/adminlogin';
import { Usesuccessdto } from 'src/app/model/usesuccessdto';
import { SerService } from './service/ser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isRember: boolean = false;
  email!: string;
  password!: string;
  userSuccessDTO!: Usesuccessdto;
  local: Storage = localStorage;
  session: Storage = sessionStorage;

  constructor(private ser: SerService) { }

  ngOnInit(): void {
  }
  rememberAccount() {
    this.isRember = !this.isRember;
    console.log(this.isRember);
  }
  loginAccount() {
    let data: Adminlogin = new Adminlogin();
    data.password = this.password;
    data.email = this.email;
    this.ser.doLogin(data).subscribe({
      next: res => {
        if (this.isRember) {
          this.loginSuccess(res);
        }
        else {
          this.loginSuccess1(res);
        }
      },
      error: err => {
        alert('Vui lòng thử lại sau');
      }
    })
  }

  onKeyEmail(event: any) {
    this.email = event.target.value;
  }
  onKeyPassword(event: any) {
    this.password = event.target.value;
  }
  loginSuccess(res: any) {
    this.userSuccessDTO = new Usesuccessdto();
    this.userSuccessDTO.email = res.email;
    this.userSuccessDTO.token = res.token;
    this.local.setItem('emailLogin', this.userSuccessDTO.email);
    this.local.setItem('tokenLogin', `Bearer ${this.userSuccessDTO.token}`);
    window.location.href = '';
  }
  loginSuccess1(res: any) {
    this.userSuccessDTO = new Usesuccessdto();
    this.userSuccessDTO.email = res.email;
    this.userSuccessDTO.token = res.token;
    this.session.setItem('emailLogin', this.userSuccessDTO.email);
    this.session.setItem('tokenLogin', `Bearer ${this.userSuccessDTO.token}`);
    window.location.href = '';
  }
}
