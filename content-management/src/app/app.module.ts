import { ApiCallInterceptor } from './api-call.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { BlogListingComponent } from './blog-listing/blog-listing.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BlogComponent } from './blog/blog.component';
import { SearchPipe } from './search.pipe';
import { PermissionComponent } from './permission/permission.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    BlogListingComponent,
    NavbarComponent,
    BlogComponent,
    SearchPipe,
    PermissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:ApiCallInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
