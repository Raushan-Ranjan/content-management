import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public loginDetails:any = {}

  public blogListing:any = [];

  constructor(private http: HttpClient,private router:Router) { }

  loginFn(email:String,password:String,question:string,answer:string){
   return this.http.post<{data:{},token:{'token':string,'expireTime':number}}>('api/v1/auth/login',{
      email,password,question,answer
  })
  }


  getListingFn(sort:any){
   let url = 'api/v1/blog';
   return this.http.get<{blog:any[],user:any,totalRecords:number}>(url);
  }

  onRegistration(name:string,email:string,password:string,question:string, answer:string){
    return this.http.post('api/v1/auth/register',{name,email,password,question,answer})
  }

  onCreateBlog(title:string,description:string){
   return this.http.post('api/v1/blog/createBlog',{title,description});
  }

  onUpdateBlog(id: string,title: string,description:string){
    return this.http.put(`api/v1/blog/actions/${id}`,{title,description});
  }

  getBlogDetails(id: string){
    return this.http.get<{blog:{title:string,description:string},user:{}}>(`api/v1/blog/actions/${id}`);
  }

  onDeleteBlog(id:string){
    return this.http.delete(`api/v1/blog/actions/${id}`);
  }

  onApproveBlog(id:string,blog:any){
    return this.http.patch(`api/v1/blog/actions/${id}`,blog);
  }

  onPermission(role:string,email:string){
    return this.http.patch('api/v1/blog/adminAccess',{role,email})
  }

 
}
