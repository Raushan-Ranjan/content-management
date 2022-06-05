import { BlogComponent } from './blog/blog.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { BlogListingComponent } from './blog-listing/blog-listing.component';
import { PermissionComponent } from './permission/permission.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [{
  path:'', component:LoginPageComponent,
},{
  path:'register', component:RegistrationPageComponent
},{
  path:'blog-listing', component:BlogListingComponent,canActivate:[AuthGuard]
},
{
  path:'blog/create', component:BlogComponent, canActivate:[AuthGuard]
},
{
  path:'blog/permission', component:PermissionComponent , canActivate:[AuthGuard]
},
{
  path:'blog/edit/:id', component:BlogComponent , canActivate:[AuthGuard]
},
{
  path:'blog/view/:id', component:BlogComponent, canActivate:[AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
