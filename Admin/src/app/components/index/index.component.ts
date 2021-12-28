import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Baiviet } from 'src/app/models/baiviet';
import { Soluongbooktheloainxb } from 'src/app/models/soluongbooktheloainxb';
import { Topthangdto } from 'src/app/models/topthangdto';
import { ModalAddUserComponent } from '../modal-add-user/modal-add-user.component';
import { ModalThongkesachComponent } from '../modal-thongkesach/modal-thongkesach.component';
import { IndexService } from './service/index.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ModalThongkeDoanhthuComponent } from '../modal-thongke-doanhthu/modal-thongke-doanhthu.component';
import { Dataget } from 'src/app/models/dataget';
import { Doanhsotheloai } from 'src/app/models/doanhsotheloai';
import { Doanhsonxb } from 'src/app/models/doanhsonxb';

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-dialog modal-dialog-centered mw-650px" >
  <!--begin::Modal content-->
  <div class="modal-content">
      <!--begin::Modal header-->
      <div class="modal-header" id="kt_modal_add_user_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">Add User</h2>
          <!--end::Modal title-->
          <!--begin::Close-->
          <div class="btn btn-icon btn-sm btn-active-icon-primary" (click)="activeModal.close('Close click')">
              <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
              <span class="svg-icon svg-icon-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
                      <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
                  </svg>
              </span>
              <!--end::Svg Icon-->
          </div>
          <!--end::Close-->
      </div>
      <!--end::Modal header-->
      <!--begin::Modal body-->
      <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
          <!--begin::Form-->
          <form id="kt_modal_add_user_form" class="form" >
              <!--begin::Scroll-->
              <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_user_header" data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px">
                  <!--begin::Input group-->
                  <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="d-block fw-bold fs-6 mb-5">Avatar</label>
                      <!--end::Label-->
                      <!--begin::Image input-->
                      <div class="image-input image-input-outline" data-kt-image-input="true" style="background-image: url(assets/media/avatars/blank.png)">
                          <!--begin::Preview existing avatar-->
                          <div class="image-input-wrapper w-125px h-125px" style="background-image: url(assets/media/avatars/150-1.jpg);"></div>
                          <!--end::Preview existing avatar-->
                          <!--begin::Label-->
                          <label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change avatar">
                              <i class="bi bi-pencil-fill fs-7"></i>
                              <!--begin::Inputs-->
                              <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                              <input type="hidden" name="avatar_remove" />
                              <!--end::Inputs-->
                          </label>
                          <!--end::Label-->
                          <!--begin::Cancel-->
                          <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
                              <i class="bi bi-x fs-2"></i>
                          </span>
                          <!--end::Cancel-->
                          <!--begin::Remove-->
                          <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar">
                              <i class="bi bi-x fs-2"></i>
                          </span>
                          <!--end::Remove-->
                      </div>
                      <!--end::Image input-->
                      <!--begin::Hint-->
                      <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
                      <!--end::Hint-->
                  </div>
                  <!--end::Input group-->
                  <!--begin::Input group-->
                  <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="required fw-bold fs-6 mb-2">Full Name</label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <input type="text" name="user_name" class="form-control form-control-solid mb-3 mb-lg-0" placeholder="Full name" value="Emma Smith" />
                      <!--end::Input-->
                  </div>
                  <!--end::Input group-->
                  <!--begin::Input group-->
                  <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="required fw-bold fs-6 mb-2">Email</label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <input type="email" name="user_email" class="form-control form-control-solid mb-3 mb-lg-0" placeholder="example@domain.com" value="e.smith@kpmg.com.au" />
                      <!--end::Input-->
                  </div>
                  <!--end::Input group-->
                  <!--begin::Input group-->
                  <div class="mb-7">
                      <!--begin::Label-->
                      <label class="required fw-bold fs-6 mb-5">Role</label>
                      <!--end::Label-->
                      <!--begin::Roles-->
                      <!--begin::Input row-->
                      <div class="d-flex fv-row">
                          <!--begin::Radio-->
                          <div class="form-check form-check-custom form-check-solid">
                              <!--begin::Input-->
                              <input class="form-check-input me-3" name="user_role" type="radio" value="0" id="kt_modal_update_role_option_0" checked='checked' />
                              <!--end::Input-->
                              <!--begin::Label-->
                              <label class="form-check-label" for="kt_modal_update_role_option_0">
                                  <div class="fw-bolder text-gray-800">Administrator</div>
                                  <div class="text-gray-600">Best for business owners and company administrators</div>
                              </label>
                              <!--end::Label-->
                          </div>
                          <!--end::Radio-->
                      </div>
                      <!--end::Input row-->
                      <div class='separator separator-dashed my-5'></div>
                      <!--begin::Input row-->
                      <div class="d-flex fv-row">
                          <!--begin::Radio-->
                          <div class="form-check form-check-custom form-check-solid">
                              <!--begin::Input-->
                              <input class="form-check-input me-3" name="user_role" type="radio" value="1" id="kt_modal_update_role_option_1" />
                              <!--end::Input-->
                              <!--begin::Label-->
                              <label class="form-check-label" for="kt_modal_update_role_option_1">
                                  <div class="fw-bolder text-gray-800">Developer</div>
                                  <div class="text-gray-600">Best for developers or people primarily using the API</div>
                              </label>
                              <!--end::Label-->
                          </div>
                          <!--end::Radio-->
                      </div>
                      <!--end::Input row-->
                      <div class='separator separator-dashed my-5'></div>
                      <!--begin::Input row-->
                      <div class="d-flex fv-row">
                          <!--begin::Radio-->
                          <div class="form-check form-check-custom form-check-solid">
                              <!--begin::Input-->
                              <input class="form-check-input me-3" name="user_role" type="radio" value="2" id="kt_modal_update_role_option_2" />
                              <!--end::Input-->
                              <!--begin::Label-->
                              <label class="form-check-label" for="kt_modal_update_role_option_2">
                                  <div class="fw-bolder text-gray-800">Analyst</div>
                                  <div class="text-gray-600">Best for people who need full access to analytics data, but don't need to update business settings</div>
                              </label>
                              <!--end::Label-->
                          </div>
                          <!--end::Radio-->
                      </div>
                      <!--end::Input row-->
                      <div class='separator separator-dashed my-5'></div>
                      <!--begin::Input row-->
                      <div class="d-flex fv-row">
                          <!--begin::Radio-->
                          <div class="form-check form-check-custom form-check-solid">
                              <!--begin::Input-->
                              <input class="form-check-input me-3" name="user_role" type="radio" value="3" id="kt_modal_update_role_option_3" />
                              <!--end::Input-->
                              <!--begin::Label-->
                              <label class="form-check-label" for="kt_modal_update_role_option_3">
                                  <div class="fw-bolder text-gray-800">Support</div>
                                  <div class="text-gray-600">Best for employees who regularly refund payments and respond to disputes</div>
                              </label>
                              <!--end::Label-->
                          </div>
                          <!--end::Radio-->
                      </div>
                      <!--end::Input row-->
                      <div class='separator separator-dashed my-5'></div>
                      <!--begin::Input row-->
                      <div class="d-flex fv-row">
                          <!--begin::Radio-->
                          <div class="form-check form-check-custom form-check-solid">
                              <!--begin::Input-->
                              <input class="form-check-input me-3" name="user_role" type="radio" value="4" id="kt_modal_update_role_option_4" />
                              <!--end::Input-->
                              <!--begin::Label-->
                              <label class="form-check-label" for="kt_modal_update_role_option_4">
                                  <div class="fw-bolder text-gray-800">Trial</div>
                                  <div class="text-gray-600">Best for people who need to preview content data, but don't need to make any updates</div>
                              </label>
                              <!--end::Label-->
                          </div>
                          <!--end::Radio-->
                      </div>
                      <!--end::Input row-->
                      <!--end::Roles-->
                  </div>
                  <!--end::Input group-->
              </div>
              <!--end::Scroll-->
              <!--begin::Actions-->
              <div class="text-center pt-15">
                  <button type="reset" class="btn btn-light me-3" (click)="activeModal.close('Close click')" >Discard</button>
                  <button type="submit" class="btn btn-primary"  (click)="doAddUser($event)">
                      <span class="indicator-label">Submit</span>
                      <span class="indicator-progress">Please wait...
                      <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                  </button>
              </div>
              <!--end::Actions-->
          </form>
          <!--end::Form-->
      </div>
      <!--end::Modal body-->
  </div>
  <!--end::Modal content-->
</div>
  `
})
export class NgbdModalContent {
  @Input() name!: string;

  constructor(public activeModal: NgbActiveModal) { }
  doAddUser(e: any) {
    e.preventDefault();
    console.log("Hello")
  }

}


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private router: Router, private ser: IndexService, private modalService: NgbModal, public dialog: MatDialog) { }
  data: Baiviet[] = [];
  dataTopThang: Topthangdto[] = [];
  dataget: Dataget = new Dataget();
  theloai: Doanhsotheloai[] = [];
  nxb: Doanhsonxb[] = [];
  ngOnInit(): void {
    this.getDataFirst()
    this.getDataSecond();
    this.getDataThird();
  }
  gotoblog() {
    this.router.navigateByUrl('/blog')
  }
  getDataSecond() {
    this.dataTopThang = [];
    this.ser.getAllTrongThang().subscribe({
      next: res => {
        this.dataTopThang = res
      }
    })
  }
  getDataThird() {
    this.dataget = new Dataget();
    this.ser.getAllBookTrongThang().subscribe({
      next: res => {
        this.dataget = res;
        this.theloai = this.dataget.theLoais;
        this.nxb = this.dataget.nxbs;
      }
    })
  }
  getDataFirst() {
    this.data = [];
    this.ser.getAllBlog().subscribe({
      next: res => {
        this.data = res
      }
    })
  }
  seeArticle(id: number) {
    this.router.navigateByUrl('/article/' + id)
  }
  addCustomer() {
    const dialogRef = this.dialog.open(ModalAddUserComponent, {
      width: '550px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataFirst();
    });
  }
  xemthongtinkhach(id: number) {
    this.router.navigateByUrl('/account/' + id)
  }
  xembienlaigannhat(id: number) {
    this.router.navigateByUrl('/invoice/' + id)
  }
  seenxb(id: number) {
    this.router.navigateByUrl('/publisher/' + id)
  }
  seeTheLoai(id: number) {
    this.router.navigateByUrl('/category/' + id)
  }
  chonNgayThongKeSach() {
    const dialogRef = this.dialog.open(ModalThongkesachComponent, {
      width: '950px'
    });
  }
  chonNgayThongKeDoanhThu() {
    const dialogRef = this.dialog.open(ModalThongkeDoanhthuComponent, {
      width: '950px'
    });
  }

}
