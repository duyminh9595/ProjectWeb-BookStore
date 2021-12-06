import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddType } from 'src/app/model/add-type';
import { CatBook } from 'src/app/model/cat-book';
import { CategoryService } from './service/category.service';

@Component({
	selector: 'ngbd-modal-content',
	template: `
  <div class="modal-dialog modal-dialog-centered mw-650px">
										<!--begin::Modal content-->
										<div class="modal-content">
											<!--begin::Form-->
											<form class="form"  id="kt_modal_add_customer_form" >
												<!--begin::Modal header-->
												<div class="modal-header" id="kt_modal_add_customer_header">
													<!--begin::Modal title-->
													<h2 class="fw-bolder">Thêm Thể Loại</h2>
													<!--end::Modal title-->
													<!--begin::Close-->
													<div id="kt_modal_add_customer_close" class="btn btn-icon btn-sm btn-active-icon-primary">
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
												<div class="modal-body py-10 px-lg-17">
													<!--begin::Scroll-->
													<div class="scroll-y me-n7 pe-7" id="kt_modal_add_customer_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
														<!--begin::Input group-->
														<div class="fv-row mb-7">
															<!--begin::Label-->
															<label class="required fs-6 fw-bold mb-2">Name</label>
															<!--end::Label-->
															<!--begin::Input-->
															<input 
															(keyup)="onKeyName($event)"
															type="text" class="form-control form-control-solid" placeholder="Tên Thể Loại" name="name" value="" />
															<!--end::Input-->
														</div>
														<!--end::Input group-->
														<!--begin::Input group-->
														
														<!--end::Billing form-->
													</div>
													<!--end::Scroll-->
												</div>
												<!--end::Modal body-->
												<!--begin::Modal footer-->
												<div class="modal-footer flex-center">
													<!--begin::Button-->
													<button type="reset" id="kt_modal_add_customer_cancel" class="btn btn-light me-3">Discard</button>
													<!--end::Button-->
													<!--begin::Button-->
													<button type="submit" id="kt_modal_add_customer_submit" class="btn btn-primary">
														<span class="indicator-label" (click)="doAddCategory($event)">Submit</span>
														<span class="indicator-progress">Please wait...
														<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
													</button>
													<!--end::Button-->
												</div>
												<!--end::Modal footer-->
											</form>
											<!--end::Form-->
										</div>
									</div>
  `
})
export class NgbdModalContent {
	@Input() name!: string;
	nameType!: string;
	onKeyName(event: any) {
		this.nameType = event.target.value;
	}
	constructor(public activeModal: NgbActiveModal, private ser: CategoryService) { }
	doAddCategory(e: any) {
		e.preventDefault();
		console.log("Hello")
		let data: AddType = new AddType();
		data.name = this.nameType;
		this.ser.addType(data).subscribe({
			next: res => {
				location.reload();
			},
			error: err => {
				alert("Lỗi")
			}
		})
	}

}


@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


	ngOnInit(): void {
		this.getDataFirst();
	}
	getDataFirst() {
		this.ser.getTypeBook().subscribe(this.getDatas());
	}
	data: CatBook[] = [];
	getDatas() {
		return (data: any) => {
			this.data = data
		}
	}
	constructor(private modalService: NgbModal, private ser: CategoryService, private router: Router) { }

	open() {
		const modalRef = this.modalService.open(NgbdModalContent);
		modalRef.componentInstance.name = 'World';
	}
	xemChiTiet(item: CatBook) {
		this.router.navigateByUrl('/category/' + item.typeId)
	}
}
