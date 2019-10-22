import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { CategoryService } from 'src/app/service/category.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-admin-detail-posts',
  templateUrl: './admin-detail-posts.component.html',
  styleUrls: ['./admin-detail-posts.component.css']
})
export class AdminDetailPostsComponent implements OnInit {
  post = new Post();
  categories = [];
  selectedFile: any;
  image: any;
  showSpinner=false;
  allowedExtension = ['jpeg', 'jpg', 'png'];
  constructor(private categoryService: CategoryService,
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    if(id){
      this.showSpinner=true;
      this.postService.getById(id).subscribe(data => {
        if(data.type){
          this.showSpinner=false;
          this.post = data.item[0] || {};
          this.post.id = id;
          this.image = this.post.avartar;
        }
      })
    }
    this.getCategory();
  }
  save(): void {
    this.showSpinner=true;
    this.post.avartar = this.image;
    if(this.post.id){
      this.post.date_create = new Date().getTime();
      this.postService.save(this.post).subscribe(
        res => {
          this.showSpinner=false;
          this.toastr.success('You are update It Successfully!');
        }, error => {
          this.showSpinner
          this.toastr.error('You are update failure!')
        })
    }else{
      this.post.date_create = new Date().getTime();
      this.postService.save(this.post).subscribe(
        res => {
          this.showSpinner=false;
          this.toastr.success('You are add new It Successfully!');
          this.post.id = res.id || "";
        },error=>{
          this.showSpinner=false;
          this.toastr.error('You are add new failure!')
        })
    }
  }
  add(): void {
    this.post = new Post();
    this.post.id_category = this.categories[0].id;
  }
  back() {
    this.location.back();
  }

  private  getCategory(): void {
    this.categoryService.getAll().subscribe(( data: any) => {
      if (data.type) {
        this.categories = data.items || [];
        this.post.id_category = this.categories[0].id;
      }
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const fileExtension = this.selectedFile.name.split('.').pop().toLowerCase();
    let extentionFile = this.allowedExtension.indexOf(fileExtension);
    if (extentionFile==-1) {
        this.toastr.success('Only file : *.' + this.allowedExtension.join(', *.'));
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onloadend = () => {
      if (reader.error !== null) {
        this.toastr.error('File error!' + reader.error)
      } else {
        this.image = reader.result;

      }
    };
  }

  nameChange(name: string): void {
    this.post.slug = this.stringToSlug(name) + '-' + new Date().getDate()
      + '' + new Date().getMonth() + 1 + '' + new Date().getFullYear() + new Date().getTime()+'-'+this.stringToSlug(name);

  }

  private  stringToSlug(str): string {
    const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñç';
    const  to   = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouunc';
    for (let i = 0, l = from.length ; i < l ; i++) {
      str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }
    str = str.toLowerCase()
      .trim()
      .replace(/[^a-z0-9\-]/g, '-')
      .replace(/-+/g, '-');
    return str;
  }
}
