import { Component, OnInit, OnChanges } from '@angular/core';
import { PostService } from '../../service/post.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnChanges {
  posts = [];
  _order = 'FEATURE';
  _limit = 3;
  _page =1;
  _search = '';
  _category ='';
  totalItems = 0;
  _itemsPerPage=3;
  currentPage =1;
  showSpinner = false;
  _notFound = false;
  constructor(
    private postService: PostService,
    private router: Router,
    private activeRouter: ActivatedRoute) {
     
     this._search = activeRouter.snapshot.paramMap.get('search');
     if(this._search==null){
       this._search='';
     }
     if(this.router.url.toString().includes('phap-luat')){
      this._category='2';
    }else if(this.router.url.toString().includes('the-gioi')){
      this._category='4';
    }else if(this.router.url.toString().includes('goc-nhin')){
      this._category='3';
    }else if(this.router.url.toString().includes('kinh-doanh')){
      this._category='5';
    }else{
      this._category='';
    }
    this.showSpinner= true;
    this.postService.getContenPage(this.setParam()).subscribe((data: any)=>{
      if(data.type){
        this.setData(data);
        this.showSpinner= false;
        this.currentPage=1;
      }
    });
     this.router.routeReuseStrategy.shouldReuseRoute = () => {
      // do your task for before route
    
      return false;
    }
  }

  ngOnInit() {
     
  }
  ngOnChanges(){

  }
  sortChange(){
    this.postService.getContenPage(this.setParam()).subscribe(data=>{
      this.setData(data);
    })
  }
  show(){
    this.postService.getContenPage(this.setParam()).subscribe(data=>{
      this.setData(data);
    })
  }
  pageChanged(event){
    this._page = event.page;
    this.showSpinner= true;
    this.postService.getContenPage(this.setParam()).subscribe(data=>{
      this.setData(data);
      this.showSpinner= false;
    })

  }
  private setParam(): HttpParams{
    const param = new HttpParams()
    .set('limit',this._limit.toString())
    .set('page', this._page.toString())
    .set('keySearch', this._search)
    .set('order', this._order.toString())
    .set('category', this._category.toString())
    return param;
  }
  private setData(data){
    if(!data.type){
      this._notFound = true;
      return this.totalItems=0;
    }
    this._notFound = false;
    const _data = data;
    this.posts = _data.items || [];
    this.totalItems =_data.toTal;
    if(this.posts.length==this.totalItems){
      this.currentPage=1;
    }
  }
}
