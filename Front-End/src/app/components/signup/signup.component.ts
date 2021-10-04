import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRegisterDTO } from 'src/app/class/user-register-dto';
import { TrimWhiteSpaceService } from 'src/app/validators/trim-white-space.service';
import { NgbdModalContent } from '../login/login.component';
import { SignUpService } from './service/sign-up.service';

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
export class ModalRegisterSuccess {
  @Input() name = '';
  @Input() imageUrl = '';

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerFormGroup!: FormGroup;
  userRegisterDTO!: UserRegisterDTO;
  popUpModal: boolean = false;
  imgSuccess: string = 'assets/loginSuccess.gif';

  constructor(
    private signUpSer: SignUpService,
    private formBuiler: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.registerFormGroup = this.formBuiler.group({
      member: this.formBuiler.group({
        firstName: new FormControl('Le Quang', [
          Validators.required,
          Validators.minLength(3),
          TrimWhiteSpaceService.notOnlyWhiteSpace,
        ]),
        lastName: new FormControl('Duy Minh', [
          Validators.required,
          Validators.minLength(3),
          TrimWhiteSpaceService.notOnlyWhiteSpace,
        ]),
        passWord: new FormControl('1234567891', [
          Validators.required,
          Validators.minLength(9),
          TrimWhiteSpaceService.notOnlyWhiteSpace,
        ]),
        email: new FormControl('duyminh95@gmail.com', [
          Validators.required,
          Validators.minLength(5),
          TrimWhiteSpaceService.notOnlyWhiteSpace,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        gender: new FormControl(1, [Validators.required]),
      }),
    });
  }
  get firstName() {
    return this.registerFormGroup.get('member.firstName');
  }
  get lastName() {
    return this.registerFormGroup.get('member.lastName');
  }
  get passWord() {
    return this.registerFormGroup.get('member.passWord');
  }
  get email() {
    return this.registerFormGroup.get('member.email');
  }
  get gender() {
    return this.registerFormGroup.get('member.gender');
  }

  onSubmit() {
    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAsTouched();
      const modalRef = this.modalService.open(NgbdModalContent);
      modalRef.componentInstance.name =
        'Vui lòng nhập thông tin hợp lệ vào form';
    } else {
      this.userRegisterDTO = new UserRegisterDTO();
      if (this.registerFormGroup.get('member.gender')?.value == '1') {
        this.userRegisterDTO.Gender = true;
      } else this.userRegisterDTO.Gender = false;
      this.userRegisterDTO.FirstName =
        this.registerFormGroup.get('member.firstName')?.value;
      this.userRegisterDTO.LastName =
        this.registerFormGroup.get('member.lastName')?.value;
      this.userRegisterDTO.Email =
        this.registerFormGroup.get('member.email')?.value;
      this.userRegisterDTO.Password =
        this.registerFormGroup.get('member.passWord')?.value;
      this.signUpSer.doSignUp(this.userRegisterDTO).subscribe({
        next: (res) => {
          const modalRef = this.modalService.open(ModalRegisterSuccess);
          modalRef.componentInstance.name = `Đăng Ký thành công oy 3be ui. Đăng Nhập để dùng nhóe`;
          modalRef.componentInstance.imageUrl = this.imgSuccess;
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          const modalRef = this.modalService.open(NgbdModalContent);
          modalRef.componentInstance.name = err;
        },
      });
    }
  }
}
