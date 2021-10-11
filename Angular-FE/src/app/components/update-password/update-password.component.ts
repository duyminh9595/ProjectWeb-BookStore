import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UpdatePassword } from 'src/app/model/update-password';
import { TrimWhiteSpaceService } from 'src/app/validator/trim-white-space.service';
import { DoUpdateService } from './service/do-update.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  formUpdatePassword!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private updatePassSer: DoUpdateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formUpdatePassword = this.formBuilder.group({
      oldPass: new FormControl('', [
        Validators.required,
        TrimWhiteSpaceService.notOnlyWhiteSpace,
        Validators.minLength(6),
      ]),
      newPass: new FormControl('', [
        Validators.required,
        TrimWhiteSpaceService.notOnlyWhiteSpace,
        Validators.minLength(6),
      ]),
    });
  }
  doUpdatePassword() {
    if (this.formUpdatePassword.invalid) {
      this.formUpdatePassword.markAllAsTouched();
    } else {
      let data: UpdatePassword = new UpdatePassword();
      data.OldPassword = this.formUpdatePassword.get('oldPass')?.value;
      data.NewPassword = this.formUpdatePassword.get('newPass')?.value;
      this.updatePassSer.doUpdate(data).subscribe({
        next: (res) => {
          alert('Cập nhật mật khẩu thành công. Vui lòng đăng nhập lại');
          localStorage.removeItem('tokenLogin');
          localStorage.removeItem('emailLogin');
          this.router.navigateByUrl('/login').then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          if (err.status == 401) {
            localStorage.removeItem('tokenLogin');
            localStorage.removeItem('emailLogin');
            alert('Phiên đăng nhập của bạn đã hết. Vui Lòng đăng nhập lại');
            this.router.navigateByUrl('/login').then(() => {
              window.location.reload();
            });
          } else alert(err.error);
        },
      });
    }
  }
}
