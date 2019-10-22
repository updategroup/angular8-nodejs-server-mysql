import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import { Category } from 'src/app/models/category';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-admin-list-category',
  templateUrl: './admin-list-category.component.html',
  styleUrls: ['./admin-list-category.component.css']
})
export class AdminListCategoryComponent implements OnInit {
  modalRef: BsModalRef;
  categories = [];
  searchText = '';
  category = new Category();
  showSpinner = false;

  constructor(private categorySevice: CategoryService,
    private modalService: BsModalService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.showSpinner=true;
    this.categorySevice.getAll().subscribe(data=>{
      if (data.type) {
        this.showSpinner=false;
        this.categories = data.items || [];
      }
    });
  }
  openModal(template: TemplateRef<any>, data: Category) {
    this.category = data;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirmDelete(key: string): void {
    this.modalRef.hide();
    var param = new HttpParams()
    .set('id', key)
    this.showSpinner=true;
    this.categorySevice.delete(param).subscribe(
      res => {
        if(res.type){
          this.showSpinner=false;
          this.categories = [];
          this.toastr.success('You are delete It Successfully!');
          this.categories = res.items || [];
        }
      },error=>{
        this.showSpinner=false;
        this.toastr.error('You are delete Failure!');
        
      });
     
  }
}
