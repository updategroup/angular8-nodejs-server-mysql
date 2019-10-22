import { Component, OnInit, TemplateRef } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/models/post';
@Component({
  selector: 'app-admin-list-posts',
  templateUrl: './admin-list-posts.component.html',
  styleUrls: ['./admin-list-posts.component.css']
})
export class AdminListPostsComponent implements OnInit {
  modalRef: BsModalRef;
  posts = [];
  searchText = "";
  post = new Post();
  showSpinner= false;
  constructor(private postService: PostService,
    private modalService: BsModalService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.showSpinner=true;
    this.postService.getAll().subscribe((data: any) => {
      if (data.type) {
        this.showSpinner= false;
        this.posts = data.items || [];
      }
    });
  }
  openModal(template: TemplateRef<any>, data: Post) {
    this.post = data;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirmDelete(key: string): void {
    this.modalRef.hide();
    this.showSpinner=true;
    this.postService.delete(key).subscribe(
      res => {
        if(res.type){
          this.showSpinner= false;
          this.posts = [];
          this.toastr.success('You are delete It Successfully!');
          this.posts = res.items || [];
        }
      },error=>{
        this.showSpinner
        this.toastr.error('You are delete Failure!');
      })
  }

  activeChange(item: Post): void {
    const param = {
      status: item.status,
      id: item.id
    };
    this.showSpinner= true;
    this.postService.activePost(param).subscribe( (res:any) => {
      if(res.type){
        if(item.status){
          this.showSpinner= false;
         return this.toastr.success('Active It Successfully!');
        }
        this.showSpinner
        this.toastr.success('UnActive It Successfully!');
       
      }
    },error=>{
      this.showSpinner
      this.toastr.error('Active Failure!');
    })
  }
}
