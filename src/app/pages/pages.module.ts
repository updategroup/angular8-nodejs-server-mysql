import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {ContentComponent} from './content/content.component';
import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {CategoryService} from '../service/category.service';
import {PostService} from '../service/post.service';
import {HttpClientModule} from '@angular/common/http';
import {PageSingleComponent} from './page-single/page-single.component';
import {AuthenticationService} from '../service/authentication.service';
import {AuthGuard} from '../guard/auth.guard';
import {AlertService} from '../service/alert.service';
import {JwtInterceptorProvider} from '../helpers/jwt.interceptor';
import {ErrorInterceptorProvider} from '../helpers/error.interceptor';
import {FormsModule} from '@angular/forms';
import {SignUpComponent} from '../user/sign-up/sign-up.component';
import {SignInComponent} from '../user/sign-in/sign-in.component';
import {UserComponent} from '../user/user.component';
import {PaginationModule} from 'ngx-bootstrap';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        HttpClientModule,
        FormsModule,
        PaginationModule.forRoot(),
        SharedModule.forRoot()
    ],
    declarations: [
        PagesComponent,
        HeaderComponent,
        FooterComponent,
        ContentComponent,
        UserComponent,
        SignInComponent,
        SignUpComponent,
        PageSingleComponent],
    providers: [
        CategoryService,
        PostService,
        AuthenticationService,
        AuthGuard,
        AlertService,
        JwtInterceptorProvider,
        ErrorInterceptorProvider
    ]
})
export class PagesModule {
}
