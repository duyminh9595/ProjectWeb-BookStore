import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  faGoogle,
  faTwitter,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { TrimWhiteSpaceService } from 'src/app/validators/trim-white-space.service';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLoginDTO } from 'src/app/class/user-login-dto';
import { LoginServiceService } from './service/login-service.service';
import { UserSuccessDTO } from 'src/app/class/user-success-dto';
import { ModalRegisterSuccess } from '../signup/signup.component';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Fail</h4>
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
export class NgbdModalContent {
  @Input() name = '';

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faGoogle = faGoogle;
  faTwitter = faTwitter;
  faFacebook = faFacebook;

  formLogin!: FormGroup;
  userLogin!: UserLoginDTO;

  userSuccessDTO!: UserSuccessDTO;

  local: Storage = localStorage;
  imgSuccess: string = 'assets/success.gif';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private loginSer: LoginServiceService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      memberLogin: this.formBuilder.group({
        emailLogin: new FormControl('lhquy3@gmail.com', [
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

  signUp() {
    this.router.navigateByUrl(`/signup`);
  }
  doLogin() {
    if (this.formLogin.invalid) {
      this.formLogin.markAsTouched();
      const modalRef = this.modalService.open(NgbdModalContent);
      modalRef.componentInstance.name =
        'Vui lòng nhập thông tin hợp lệ vào form';
    } else {
      this.userLogin = new UserLoginDTO();
      this.userLogin.email = this.formLogin.get(
        'memberLogin.emailLogin'
      )?.value;
      this.userLogin.password = this.formLogin.get(
        'memberLogin.passwordLogin'
      )?.value;
      this.loginSer.doLogin(this.userLogin).subscribe({
        next: (res) => {
          this.userSuccessDTO = new UserSuccessDTO();
          this.userSuccessDTO.email = res.email;
          this.userSuccessDTO.token = res.token;
          this.local.setItem('emailLogin', this.userSuccessDTO.email);
          this.local.setItem(
            'tokenLogin',
            `Bearer ${this.userSuccessDTO.token}`
          );
          const modalRef = this.modalService.open(ModalRegisterSuccess);
          modalRef.componentInstance.name = `Đăng Nhập Thành Công oy đó`;
          modalRef.componentInstance.imageUrl = this.imgSuccess;
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          const modalRef = this.modalService.open(NgbdModalContent);
          modalRef.componentInstance.name = 'Sai UserName hoặc Mật Khẩu';
        },
      });
    }
  }
}
