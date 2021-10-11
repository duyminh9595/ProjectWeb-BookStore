import { Component, Injectable, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRegisterDto } from 'src/app/model/user-register-dto';
import { TrimWhiteSpaceService } from 'src/app/validator/trim-white-space.service';
import { ModalLoginSuccess } from '../login/login.component';
import { RegisterService } from './service/register.service';

Component({
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
});
@Injectable()
export class NgbdModalContent {
  @Input() name = '';
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerFormGroup!: FormGroup;
  userRegisterDTO!: UserRegisterDto;
  constructor(
    private signUpSer: RegisterService,
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
        passWord: new FormControl('123456789', [
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
    } else {
      this.userRegisterDTO = new UserRegisterDto();
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
          const modalRef = this.modalService.open(ModalLoginSuccess);
          modalRef.componentInstance.name = `Đăng Ký thành công oy 3be ui. Đăng Nhập để dùng nhóe`;
          modalRef.componentInstance.imageUrl = `assets/register-success.gif`;
          this.router.navigateByUrl('/').then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          const modalRef = this.modalService.open(NgbdModalContent);
          modalRef.componentInstance.name = err;
        },
      });
    }
  }
}
