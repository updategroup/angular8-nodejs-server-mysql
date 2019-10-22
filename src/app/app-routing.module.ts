import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  },

  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule),
  },
  { path: '**', component: PageNotfoundComponent  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
