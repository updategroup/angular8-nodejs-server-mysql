import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  showSpinner= false;
  countPost = 0;
  countCategory = 0;
  constructor(private categoryService: CategoryService,
    private postService: PostService) { }

  ngOnInit() {
    this.showSpinner= true;
    this.categoryService.countCategory().subscribe((data: any)=>{
      if(data.type){
        this.showSpinner= false;
        this.countCategory = data.quanty[0].count || 0;
      }
    });
    this.postService.countPost().subscribe((data:any)=>{
      if(data.type){
        this.showSpinner= false;
      this.countPost = data.quanty[0].count || 0;
      }
    });
  }

}
