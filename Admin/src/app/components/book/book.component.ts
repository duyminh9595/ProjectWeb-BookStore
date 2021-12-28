import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Publisher } from 'src/app/model/publisher';
import { Type } from 'src/app/model/type';
import { CategoryService } from '../category/service/category.service';
import { PublisherService } from '../publisher/service/publisher.service';
import { CommonModule } from "@angular/common";
import { DomSanitizer } from '@angular/platform-browser';
import { BookSerService } from './service/book-ser.service';
import { AddBook } from 'src/app/model/add-book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInfor } from 'src/app/model/book-infor';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'ngbd-modal-content',
	template: `
  <div  id="kt_modal_add_user" tabindex="-1" aria-hidden="true">
												<!--begin::Modal dialog-->
												<div class="modal-dialog modal-dialog-centered mw-650px">
													<!--begin::Modal content-->
													<div class="modal-content">
														<!--begin::Modal header-->
														<div class="modal-header" id="kt_modal_add_user_header">
															<!--begin::Modal title-->
															<h2 class="fw-bolder">Add User</h2>
															<!--end::Modal title-->
															<!--begin::Close-->
															<div class="btn btn-icon btn-sm btn-active-icon-primary" data-kt-users-modal-action="close" (click)="activeModal.close('Close click')">
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
															<form id="kt_modal_add_user_form" class="form" action="#">
																<!--begin::Scroll-->
																<div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_user_header" data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px">
																	<!--begin::Input group-->
																	<div class="fv-row mb-7">
																		<!--begin::Label-->
																		<label class="d-block fw-bold fs-6 mb-5">Hình Ảnh</label>
																		<!--end::Label-->
																		<!--begin::Image input-->
																		<div class="image-input image-input-outline" data-kt-image-input="true" style="background-image: url(assets/media/avatars/blank.png)">
																			<!--begin::Preview existing avatar-->
																			<div class="image-input-wrapper w-125px h-125px" >
																				<img style='height: 100%; width: 100%; object-fit: contain' id="blah"  src={{imageSrc}}  alt="your image" />
																			</div>
																			<!--end::Preview existing avatar-->
																			<!--begin::Label-->
																			<label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change avatar">
																				<i class="bi bi-pencil-fill fs-7"></i>
																				<!--begin::Inputs-->
																				<input (change)="onUploadFiles($any($event.target).files,$event)"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            name="files"
            placeholder="Hình ảnh thumbnail"
            class="form-control" />
																				<input type="hidden" name="avatar_remove"  />
																				<!--end::Inputs-->
																			</label>
																			<!--end::Label-->
																			<!--begin::Cancel-->
																			<span  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
																				<i class="bi bi-x fs-2" ></i>
																			</span>
																			<!--end::Cancel-->
																			<!--begin::Remove-->
																			<span (click)="removeImage()" class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar">
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
																		<label class="required fw-bold fs-6 mb-2">Tên Truyện</label>
																		<!--end::Label-->
																		<!--begin::Input-->
																		<input type="text" (change)="selectChangeHandlerTenTruyen($event)" name="user_name" class="form-control form-control-solid mb-3 mb-lg-0" placeholder="Tên Truyện" value="" />
																		<!--end::Input-->
																	</div>
																	<!--end::Input group-->
																	<!--begin::Input group-->
																	<div class="fv-row mb-7">
																		<!--begin::Label-->
																		<label class="required fw-bold fs-6 mb-2">Tác Giả</label>
																		<!--end::Label-->
																		<!--begin::Input-->
																		<input type="text" class="form-control form-control-solid mb-3 mb-lg-0" placeholder="Tác Giả" value="" (change)="selectChangeHandlerTacGia($event)" />
																		<!--end::Input-->
																	</div>
																	<div class="fv-row mb-7">
																		<!--begin::Label-->
																		<label class="required fw-bold fs-6 mb-2">Giá bán</label>
																		<!--end::Label-->
																		<!--begin::Input-->
																		<input type="number"  class="form-control form-control-solid mb-3 mb-lg-0" placeholder="Giá bán" value=""  (change)="selectChangeHandlerGiaBan($event)"/>
																		<!--end::Input-->
																	</div>
																	<div class="fv-row mb-7">
																		<!--begin::Label-->
																		<label class="required fw-bold fs-6 mb-2">ShortReview</label>
																		<!--end::Label-->
																		<!--begin::Input-->
																		<input type="text"  class="form-control form-control-solid mb-3 mb-lg-0" placeholder="Giá bán" value=""  (change)="selectChangeHandlerShortReview($event)"/>
																		<!--end::Input-->
																	</div>
																	<!--end::Input group-->
																	<div class="fv-row mb-7">
																		<!--begin::Label-->
																		<label class="required fw-bold fs-6 mb-2">Số Lượng</label>
																		<!--end::Label-->
																		<!--begin::Input-->
																		<input type="number"  class="form-control form-control-solid mb-3 mb-lg-0" placeholder="Số lượng" value="" (change)="selectChangeHandlerSoLuong($event)"/>
																		<!--end::Input-->
																	</div>
																	<!--end::Input group-->
																	<!--begin::Input group-->
																	<div class="mb-7">
																		<!--begin::Label-->
																		<label class="required fw-bold fs-6 mb-5">Thê Loại</label>
																		<!--end::Label-->
																		<!--begin::Roles-->
																		<!--begin::Input row-->
																		<div class="d-flex fv-row">
																			<!--begin::Radio-->
																
																			<select class="form-select" aria-label="Default select example" (change)="selectChangeHandlerTheLoai($event)"  >
																					<option value=-1 selected disabled>Chọn Thể Loại</option>
																					<option  *ngFor="let item of types; let i = index" value="{{item.id}}">{{item.name}}</option>
																			</select>
																		</div>
																		<!--end::Input row-->
																		<div class='separator separator-dashed my-5'></div>
																		<!--begin::Input row-->
																		
																		<!--end::Input row-->
																		<!--end::Roles-->
																	</div>
																	<!--end::Input group-->
																	<div class="mb-7">
																		<!--begin::Label-->
																		<label class="required fw-bold fs-6 mb-5">Nhà Xuất Bản</label>
																		<!--end::Label-->
																		<!--begin::Roles-->
																		<!--begin::Input row-->
																		<select class="form-select" aria-label="Default select example 1"  (change)="selectChangeHandlerNhaXuatBan($event)">
																		<option value=-1 selected disabled>Chọn Nhà Xuất Bản </option>
																					<option  *ngFor="let item of publishers; let i = index" value="{{item.id}}">{{item.name}}</option>
																			</select>
																		<!--end::Input row-->
																		<div class='separator separator-dashed my-5'></div>
																		<!--begin::Input row-->
																		
																		<!--end::Input row-->
																		<!--end::Roles-->
																	</div>
																	<!--end::Input group-->
																</div>
																<!--end::Scroll-->
																<!--begin::Actions-->
																<div class="text-center pt-15">
																	<button type="reset" class="btn btn-light me-3" data-kt-users-modal-action="cancel" (click)="activeModal.close('Close click')">Discard</button>
																	<button type="submit" class="btn btn-primary" data-kt-users-modal-action="submit" (click)="doAddTruyen($event)">
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
												<!--end::Modal dialog-->
											</div>
  `
})
export class NgbdModalContentAddBook {
	types: Type[] = [];
	publishers: Publisher[] = [];
	theloaiId: number = -1;
	nxbId: number = -1;
	tenTruyen: string = "";
	tenTacGia: string = "";
	shortReview: string = "";
	soLuong: number = 0;
	giaBan: number = 0;
	formData: FormData = new FormData();

	thumbnail!: any;
	selected: number = -1;
	imageSrc!: string;
	constructor(public activeModal: NgbActiveModal, private typeSer: CategoryService, private pubSer: PublisherService, private bookSer: BookSerService,
		private router: Router) {
		this.typeSer.getType().subscribe({
			next: (data: any) => {
				this.types = data;

				this.pubSer.getPublisher().subscribe({
					next: (data: any) => {
						this.publishers = data;
					}
				})
			},
			error: err => {

			}
		})
	}
	doAddTruyen(e: any) {
		e.preventDefault();
		if (this.giaBan > 0 && this.tenTruyen.length > 5 && this.tenTacGia.length > 5 && this.theloaiId != -1 && this.nxbId != -1 && this.formData != null) {
			console.log('day du thong tin');
			let data = new AddBook();
			data.authorName = this.tenTacGia;
			data.name = this.tenTruyen;
			data.price = Number(this.giaBan);
			data.publisherId = Number(this.nxbId);
			data.quantity = Number(this.soLuong);
			data.shortReview = this.shortReview;
			data.typeId = Number(this.theloaiId);

			this.bookSer.doPostBook(data).subscribe({
				next: res => {
					this.bookSer.uploadImageBook(this.formData, res.id).subscribe({
						next: res => {
							alert("Thêm thành công")
						},
						error: err => {
							alert("Thêm hình ảnh thất bại");
							console.log(err)
						}
					})
				},
				error: err => {
					if (err.status == 401) {
						localStorage.removeItem('tokenLogin');
						localStorage.removeItem('emailLogin');
						alert('Phiên đăng nhập của bạn đã hết. Vui Lòng đăng nhập lại');
						this.router.navigateByUrl('/login').then(() => {
							window.location.reload();
						});
					} else console.log(err);
				}
			})
		}
		else {
			alert("Chưa Nhập Đủ Thông Tin")
		}
	}
	selectChangeHandlerTheLoai(event: any) {
		//update the ui
		console.log(event.target.value);
		this.theloaiId = event.target.value;
	}
	selectChangeHandlerNhaXuatBan(event: any) {
		//update the ui
		console.log(event.target.value);
		this.nxbId = event.target.value;
	}
	selectChangeHandlerTenTruyen(event: any) {
		//update the ui
		console.log(event.target.value);
		this.tenTruyen = event.target.value;
	}
	selectChangeHandlerTacGia(event: any) {
		//update the ui
		console.log(event.target.value);
		this.tenTacGia = event.target.value;
	}
	selectChangeHandlerGiaBan(event: any) {
		//update the ui
		console.log(event.target.value);
		this.giaBan = event.target.value;
	}
	selectChangeHandlerSoLuong(event: any) {
		//update the ui
		console.log(event.target.value);
		this.soLuong = event.target.value;
	}
	selectChangeHandlerShortReview(event: any) {
		//update the ui
		console.log(event.target.value);
		this.shortReview = event.target.value;
	}
	onUploadFiles(files: File[], event: Event): void {
		for (const file of files) {
			this.formData.append('Picture', file, file.name);
			let objectURL = 'data:image/jpeg;base64,' + file;
			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = () => {

				this.imageSrc = reader.result as string;
			}
		}


	}

	removeImage() {
		console.log("Click")
		this.formData = new FormData();
		this.imageSrc = "";
	}

}


@Component({
	selector: 'app-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

	books: BookInfor[] = [];

	ngOnInit(): void {
		let checkidtexist = this.activeRoute.snapshot.paramMap.has('publisherid');
		let checkid = this.activeRoute.snapshot.paramMap.has('catid');
		if (checkidtexist) {
			let id = +this.activeRoute.snapshot.paramMap.get('publisherid')!;
			this.ser.getPublisherBookBaseonPublisherId(id).subscribe(this.getDatas())
		}
		else if (checkid) {
			let id = +this.activeRoute.snapshot.paramMap.get('catid')!;
			this.serCat.getTypeBookBaseTypeid(id).subscribe(this.getDatas())
		}
		else {
			this.bookSer.getAllBook().subscribe(this.getDatas());
		}
	}
	getDatas() {
		return (data: any) => {
			this.books = data;
			console.log(data);
		}
	}
	constructor(private modalService: NgbModal, private bookSer: BookSerService, private router: Router,
		private activeRoute: ActivatedRoute, private ser: PublisherService, private serCat: CategoryService) { }

	open() {
		const modalRef = this.modalService.open(NgbdModalContentAddBook);
		let checkidtexist = this.activeRoute.snapshot.paramMap.has('publisherid');
		let checkid = this.activeRoute.snapshot.paramMap.has('catid');
		if (checkidtexist) {
			let id = +this.activeRoute.snapshot.paramMap.get('publisherid')!;
			this.ser.getPublisherBookBaseonPublisherId(id).subscribe(this.getDatas())
		}
		else if (checkid) {
			let id = +this.activeRoute.snapshot.paramMap.get('catid')!;
			this.serCat.getTypeBookBaseTypeid(id).subscribe(this.getDatas())
		}
		else {
			this.bookSer.getAllBook().subscribe(this.getDatas());
		}
	}
	selectbookid(id: number) {
		environment.bookid = id;
	}

}
