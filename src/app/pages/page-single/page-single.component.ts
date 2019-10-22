import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-page-single',
  templateUrl: './page-single.component.html',
  styleUrls: ['./page-single.component.css']
})
export class PageSingleComponent implements OnInit {
  post = new Post();
  showSpinner=false;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService) { }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');  // Getting current component's id or information using ActivatedRoute service
    if(slug){
      this.showSpinner=true;
      this.postService.getBySlug(slug).subscribe(data => {
        if(data.type){
          this.showSpinner=false;
          this.post = data.item[0] || {};
        }
      })
    }
  }
}
