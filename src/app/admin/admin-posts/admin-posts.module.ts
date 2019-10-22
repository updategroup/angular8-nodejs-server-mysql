import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPostsRoutingModule } from './admin-posts-routing.module';
import { AdminListPostsComponent } from './admin-list-posts/admin-list-posts.component';
import { AdminDetailPostsComponent } from './admin-detail-posts/admin-detail-posts.component';
import { PostService } from 'src/app/service/post.service';
import { CategoryService } from 'src/app/service/category.service';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import {NgxEditorModule} from 'ngx-editor';
import {JwtInterceptorProvider} from '../../helpers/jwt.interceptor';
import {ErrorInterceptorProvider} from '../../helpers/error.interceptor';
import { SharedModule } from 'src/app/pages/shared/shared.module';


@NgModule({
  declarations: [AdminListPostsComponent, AdminDetailPostsComponent],
  imports: [
    CommonModule,
    AdminPostsRoutingModule,
    PipeModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    NgxEditorModule,
    SharedModule.forRoot()
  ],
  providers: [
    PostService,
    CategoryService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider
  ]
})
export class AdminPostsModule { }
