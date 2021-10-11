import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, from, Observable, of } from 'rxjs';
import { ExternalAuthDto } from 'src/app/model/external-auth-dto';
import { UserLoginDto } from 'src/app/model/user-login-dto';
import { UserSuccessDto } from 'src/app/model/user-success-dto';
import { TrimWhiteSpaceService } from 'src/app/validator/trim-white-space.service';
import { HeaderComponent } from '../header/header.component';
import { DoLoginService } from './service/do-login.service';
import { map, concatMap, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

declare const FB: any;

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Thành công</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{ name }}!</p>
      <img src="{{ imageUrl }}" alt="Mèo con ngốk ngếk" />
    </div>

    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
})
export class ModalLoginSuccess {
  @Input() name = '';
  @Input() imageUrl = '';

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  userLogin!: UserLoginDto;

  userSuccessDTO!: UserSuccessDto;

  local: Storage = localStorage;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginSer: DoLoginService,
    private modalService: NgbModal,

    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      memberLogin: this.formBuilder.group({
        emailLogin: new FormControl('duyminh95@gmail.com', [
          Validators.required,
          Validators.minLength(5),
          TrimWhiteSpaceService.notOnlyWhiteSpace,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        passwordLogin: new FormControl('123456789', [
          Validators.required,
          Validators.minLength(6),
          TrimWhiteSpaceService.notOnlyWhiteSpace,
        ]),
      }),
    });
  }
  get emailLogin() {
    return this.formLogin.get('memberLogin.emailLogin');
  }
  get passwordLogin() {
    return this.formLogin.get('memberLogin.passwordLogin');
  }

  public externalLoginGoogle = () => {
    this.loginSer.signInWithGoogle().then(
      (res) => {
        console.log(res);
        const externalAuth: ExternalAuthDto = {
          provider: res.provider,
          idToken: res.idToken,
        };
        this.validateExternalAuthGoogle(externalAuth);
      },
      (error) => console.log(error)
    );
  };
  private validateExternalAuthGoogle(externalAuth: ExternalAuthDto) {
    this.loginSer.sendGoogleAccount(externalAuth).subscribe({
      next: (res) => {
        this.loginSuccess(res);
      },
      error: (err) => {
        alert('Vui lòng thử lại sau');
      },
    });
  }

  public externalLoginFacebook = () => {
    this.loginSer.signInWithFacebook().then(
      (res) => {
        console.log(res);
        this.validateExternalAuthFacebook(res);
      },
      (error) => console.log(error)
    );
  };
  private validateExternalAuthFacebook(data: any) {
    this.loginSer.sendFacebook(data).subscribe({
      next: (res) => {
        this.loginSuccess(res);
      },
      error: (err) => {
        alert('Vui lòng thử lại sau');
      },
    });
  }
  doLogin() {
    if (this.formLogin.invalid) {
      console.log('da');
      this.formLogin.markAsTouched();
    } else {
      console.log('da1');
      this.userLogin = new UserLoginDto();
      this.userLogin.email = this.formLogin.get(
        'memberLogin.emailLogin'
      )?.value;
      this.userLogin.password = this.formLogin.get(
        'memberLogin.passwordLogin'
      )?.value;
      this.loginSer.doLogin(this.userLogin).subscribe({
        next: (res) => {
          this.loginSuccess(res);
        },
        error: (err) => {
          alert('Sai Email or Mật Khẩu');
        },
      });
    }
  }
  loginSuccess(res: any) {
    this.userSuccessDTO = new UserSuccessDto();
    this.userSuccessDTO.email = res.email;
    this.userSuccessDTO.token = res.token;
    this.local.setItem('emailLogin', this.userSuccessDTO.email);
    this.local.setItem('tokenLogin', `Bearer ${this.userSuccessDTO.token}`);
    window.location.href = '/';
  }
}
