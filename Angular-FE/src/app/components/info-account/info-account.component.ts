import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/model/user-info';
import { InfoAccountService } from './service/info-account.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { FileServerService } from 'src/app/service/file-server.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TrimWhiteSpaceService } from 'src/app/validator/trim-white-space.service';
import { UpdateInfoDto } from 'src/app/model/update-info-dto';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.css'],
})
export class InfoAccountComponent implements OnInit {
  userInfo: UserInfo = new UserInfo();

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  frmAccountDetail!: FormGroup;
  dateBirth: string = '';
  userUpdate: UpdateInfoDto = new UpdateInfoDto();
  changeData: boolean = false;
  checkUploadImage: boolean = false;
  formData: FormData = new FormData();
  constructor(
    private router: Router,
    private infoAccountSer: InfoAccountService,
    private datePipe: DatePipe,
    private fileService: FileServerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.infoAccountSer.getInfoAccount().subscribe({
      next: (data) => {
        this.userInfo = data;
        this.getDate();
        this.frmAccountDetail = this.formBuilder.group({
          firstName: new FormControl(this.userInfo.firstName, [
            Validators.required,
            TrimWhiteSpaceService.notOnlyWhiteSpace,
            Validators.minLength(7),
          ]),
          lastName: new FormControl(this.userInfo.lastName, [
            Validators.required,
            TrimWhiteSpaceService.notOnlyWhiteSpace,
            Validators.minLength(7),
          ]),
          email: new FormControl(this.userInfo.email),
          gender: new FormControl(+this.userInfo.gender),
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
        }
      },
    });
  }
  onUploadFiles(files: File[]): void {
    for (const file of files) {
      this.formData.append('Picture', file, file.name);
    }
    this.checkUploadImage = true;
  }
  getData() {
    return (data: any) => {
      this.userInfo = data;
      this.getDate();
      this.frmAccountDetail = this.formBuilder.group({
        firstName: new FormControl(this.userInfo.firstName, [
          Validators.required,
          TrimWhiteSpaceService.notOnlyWhiteSpace,
          Validators.minLength(7),
        ]),
        lastName: new FormControl(this.userInfo.lastName, [
          Validators.required,
          TrimWhiteSpaceService.notOnlyWhiteSpace,
          Validators.minLength(7),
        ]),
        email: new FormControl(this.userInfo.email),
        gender: new FormControl(+this.userInfo.gender),
      });
    };
  }
  getDate() {
    if (this.userInfo.dateOfBirth.length !== 0) {
      this.dateBirth = this.userInfo.dateOfBirth;
      this.userInfo.dateOfBirth = this.userInfo.dateOfBirth.replace(' ', '');
      let created = this.datePipe.transform(
        this.userInfo.dateOfBirth,
        'yyyy-MM-ddTHH:mm'
      );
      return this.datePipe.transform(created, 'yyyy-MM-dd');
    }

    return this.datePipe.transform('2020-08-08', 'yyyy-MM-dd');
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    let month: number = event.value?.getMonth()!;
    this.userUpdate.DateOfBirth =
      event.value?.getFullYear() +
      '-' +
      (month + 1).toString() +
      '-' +
      event.value?.getDate();
    this.changeData = true;
  }
  doUpdateAccount() {
    if (this.checkUploadImage) {
      this.fileService.upload(this.formData).subscribe(
        (event) => {},
        (error: HttpErrorResponse) => {
          if (error.status == 401) {
            localStorage.removeItem('tokenLogin');
            localStorage.removeItem('emailLogin');
            alert('Phiên đăng nhập của bạn đã hết. Vui Lòng đăng nhập lại');
            this.router.navigateByUrl('/login').then(() => {
              window.location.reload();
            });
          } else alert(error.error);
        }
      );
    }
    this.userUpdate.id = this.userInfo.id;
    if (!this.changeData) {
      this.userUpdate.DateOfBirth = this.userInfo.dateOfBirth;
    } else {
      this.userUpdate.DateOfBirth = this.userUpdate.DateOfBirth;
    }
    console.log(this.userUpdate.DateOfBirth);
    this.userUpdate.FirstName = this.frmAccountDetail.get('firstName')?.value;
    this.userUpdate.LastName = this.frmAccountDetail.get('lastName')?.value;

    if (+this.frmAccountDetail.get('gender')?.value == 0) {
      this.userUpdate.Gender = false;
    } else {
      this.userUpdate.Gender = true;
    }
    this.infoAccountSer.updateInfoAccount(this.userUpdate).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (err) => {
        if (err.status == 401) {
          localStorage.removeItem('tokenLogin');
          localStorage.removeItem('emailLogin');
          alert('Phiên đăng nhập của bạn đã hết. Vui Lòng đăng nhập lại');
          this.router.navigateByUrl('/login').then(() => {
            window.location.reload();
          });
        } else alert('Chưa Nhập Đủ Thông Tin');
      },
    });
  }
}
