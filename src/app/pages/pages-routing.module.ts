import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { PagesComponent } from './pages.component';
import { PageSingleComponent } from './page-single/page-single.component';
import { AuthGuard } from '../guard/auth.guard';
import { SignUpComponent } from '../user/sign-up/sign-up.component';
import { SignInComponent } from '../user/sign-in/sign-in.component';
import { UserComponent } from '../user/user.component';


const pageRoutes: Routes = [
  {
    path: 'register', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
},
{
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
},
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: ContentComponent },
          { path: 'search', component: ContentComponent },
          { path: 'phap-luat', component: ContentComponent },
          { path: 'goc-nhin', component: ContentComponent },
          { path: 'the-gioi', component: ContentComponent },
          { path: 'kinh-doanh', component: ContentComponent },
          { path: 'phap-luat/:slug', component: PageSingleComponent },
          { path: 'goc-nhin/:slug', component: PageSingleComponent },
          { path: 'the-gioi/:slug', component: PageSingleComponent },
          { path: 'kinh-doanh/:slug', component: PageSingleComponent }

        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(pageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule {}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
