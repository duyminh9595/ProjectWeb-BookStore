import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { UserInfo } from 'src/app/model/user-info';
import { LinkImage } from 'src/app/models/link-image';
import { NewPass } from 'src/app/models/new-pass';
import { environment } from 'src/environments/environment';
import { InfoAccountService } from '../info-account/service/info-account.service';
import { ManageUserService } from '../manage-user/service/manage-user.service';
import { SettingAccountService } from './service/setting-account.service';

@Component({
  selector: 'app-setting-account',
  templateUrl: './setting-account.component.html',
  styleUrls: ['./setting-account.component.css']
})
export class SettingAccountComponent implements OnInit {

  constructor(private storage: AngularFireStorage, private router: Router,
    private activeRoute: ActivatedRoute, private ser: InfoAccountService, private manageSer: ManageUserService, private settingser: SettingAccountService) { }

  ngOnInit(): void {
    this.detailUser()
  }
  data: UserInfo = new UserInfo();
  detailUser() {
    this.ser.getUserById(environment.iduser).subscribe({
      next: res => {
        this.data = res;
        console.log(this.data);
      },
      error: err => {
        // this.router.navigateByUrl('customer');
      }
    })
  }
  linkImage: LinkImage = new LinkImage();
  filePath!: string
  fb!: any;
  downloadURL!: Observable<string>;
  linkImageUrl: any;
  uploaded: boolean = false;
  upload(event: any) {
    console.log(this.filePath)
    // this.afStorage.upload('/images' + Math.random() + this.filePath, this.filePath);
    this.storage.upload('/images' + Math.random() + this.filePath, this.filePath)
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            this.linkImageUrl = this.fb
            console.log(this.linkImageUrl);
            this.uploaded = true;
            this.linkImage.link = this.linkImageUrl;
            this.settingser.uploadImageUser(environment.iduser, this.linkImage).subscribe({
              next: res => {
                this.router.navigateByUrl('/account/' + environment.iduser).then(() => {
                  window.location.reload();
                });
              }
            })
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
  pass: NewPass = new NewPass();
  onKeyMatKhau(event: any) {
    this.pass.password = event.target.value
  }
  updatePass() {
    this.settingser.updatePass(environment.iduser, this.pass).subscribe({
      next: res => {
        this.router.navigateByUrl('/account/' + environment.iduser).then(() => {
          window.location.reload();
        });
      }
    })
  }
}
