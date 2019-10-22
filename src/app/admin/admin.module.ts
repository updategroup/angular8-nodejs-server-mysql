import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {AdminFooterComponent} from './admin-footer/admin-footer.component';
import {PostService} from '../service/post.service';
import {CategoryService} from '../service/category.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationService} from '../service/authentication.service';
import {AlertService} from '../service/alert.service';
import {JwtInterceptor, JwtInterceptorProvider} from '../helpers/jwt.interceptor';
import {ErrorInterceptor, ErrorInterceptorProvider} from '../helpers/error.interceptor';
import {AuthGuard} from '../guard/auth.guard';
import { SharedModule } from '../pages/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        HttpClientModule,
        SharedModule.forRoot()
    ],
    declarations: [

        AdminComponent,

        AdminDashboardComponent,

        AdminHeaderComponent,

        AdminFooterComponent],
    providers: [
        PostService,
        CategoryService,
      //   AuthenticationService,
      //   AlertService,
      // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        AuthenticationService,
        AuthGuard,
        AlertService,
        JwtInterceptorProvider,
        ErrorInterceptorProvider
    ],

})
export class AdminModule {}
