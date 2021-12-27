import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPublisher } from 'src/app/model/add-publisher';
import { PublisherBook } from 'src/app/model/publisher-book';
import { NameDto } from 'src/app/models/name-dto';
import { PublisherService } from './service/publisher.service';

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
													<h2 class="fw-bolder">Thêm Nhà Xuất Bản</h2>
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
															<input type="text" 
															(keyup)="onKeyName($event)"
															class="form-control form-control-solid" placeholder="Tên Nhà Xuất Bản" name="name" value="" #tennxb/>
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
														<span class="indicator-label" (click)="doAddCategory($event, tennxb.value)">Submit</span>
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
	constructor(public activeModal: NgbActiveModal, private ser: PublisherService) { }
	doAddCategory(e: any, tennxb: string) {
		e.preventDefault();
		let data: AddPublisher = new AddPublisher();
		data.name = this.namePublisher;
		this.ser.addPublisher(data).subscribe(
			{
				next: res => {
					location.reload();
				},
				error: err => {
					alert("Lỗi")
				}
			}
		)
	}
	namePublisher!: string;
	onKeyName(event: any) {
		this.namePublisher = event.target.value;
	}
}


@Component({
	selector: 'app-publisher',
	templateUrl: './publisher.component.html',
	styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {


	ngOnInit(): void {
		this.getDataFirst();
	}
	data: PublisherBook[] = [];
	getDataFirst() {
		this.ser.getPublisherBook().subscribe(this.getDatas());
	}
	getDatas() {
		return (data: any) => {
			this.data = data
		}
	}
	constructor(private modalService: NgbModal, private ser: PublisherService, private router: Router) { }

	open() {
		const modalRef = this.modalService.open(NgbdModalContent);
	}
	chiTietBookBaseOnPublisherId(item: PublisherBook) {
		this.router.navigateByUrl('/publisher/' + item.publisherId);
	}
	name: NameDto = new NameDto();
	nhaptennxb(event: any) {
		this.name.name = event.target.value;
		if (this.name.name.length > 0) {
			this.data = []
			console.log(this.name)
			this.ser.findpublisher(this.name).subscribe(this.getDatas())
		}
		else {
			this.getDataFirst()
		}
	}
}
