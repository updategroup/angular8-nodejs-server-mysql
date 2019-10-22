import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminComponent} from './admin.component';
import {AuthGuard} from '../guard/auth.guard';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent, canActivate: [AuthGuard], data: {roles: ['ADMIN']},
        children: [
            {
                path: '',
                children: [
                    {path: '', component: AdminDashboardComponent},
                    {
                        path: 'category',
                        loadChildren: () => import('./admin-categories/admin-categories.module').then(mod => mod.AdminCategoriesModule)
                    },
                    {
                        path: 'posts',
                        loadChildren: () => import('./admin-posts/admin-posts.module').then(mod => mod.AdminPostsModule)
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {
}
