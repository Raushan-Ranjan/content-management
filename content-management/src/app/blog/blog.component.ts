import { UtilsService } from './../utils.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
 mode:string = '';
 blog:any;
 loginUser:any;
 createForm = new FormGroup({
   title: new FormControl('',[Validators.required]),
   description : new FormControl('',[Validators.required])
 })
 errorMessage:string ='';
 blogId: string = '';
  constructor(private activeRoute: ActivatedRoute,private router:Router,private service: UtilsService) { }

  ngOnInit(): void {
    this.activeRoute.url.subscribe(res => {
      this.mode = res[1].path;
      if(this.mode === 'edit'){
        this.activeRoute.params.subscribe(param => {
        this.blogId = param['id'];
          this.service.getBlogDetails(param['id']).subscribe(res => {
            const {title,description} = res.blog;
           this.createForm.setValue({title: title, description: description});
          })
        })
      }else if(this.mode === 'view'){
        this.activeRoute.params.subscribe(param => {
          this.blogId = param['id'];
            this.service.getBlogDetails(param['id']).subscribe(res => {
              this.blog = res.blog;
              this.loginUser = res.user;
            })
          })
      }
    })
  }

  onCreateFn(){
    if(this.createForm.invalid){
      return;
    }
    const {title,description} = this.createForm.value;
    if(this.mode === 'create'){
    this.service.onCreateBlog(title,description).subscribe(res => {
      this.createForm.reset()
      this.router.navigateByUrl('/blog-listing');
    },error => {
      this.errorMessage = error?.error?.msg || 'something went wrong, please try later';
    })
  }else{
     this.service.onUpdateBlog(this.blogId,title,description).subscribe(res => {
      this.createForm.reset()
      this.router.navigateByUrl('/blog-listing');
    },error => {
      this.errorMessage = error?.error?.msg || 'something went wrong, please try later';
    })
  }
  }

  onDiscard(){
    this.router.navigateByUrl('/blog-listing');
  }

  onDelete(id:string){
   this.service.onDeleteBlog(id).subscribe(res => {
     this.onDiscard();
   })
  }

  onApprove(id:string,blog:any){
    this.service.onApproveBlog(id,blog).subscribe(res => {
       this.onDiscard();
    })
  }

  onDeleteBlog(){
    // loginUser?.role !== 'user' && blog.email

    if(this.loginUser.email === this.blog.email && this.loginUser.role === 'admin'){
      return true;
    }else if (this.loginUser.role === 'super admin'){
      return true;
    }

    return false;
  }
}
