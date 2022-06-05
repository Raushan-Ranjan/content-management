import { Router } from '@angular/router';
import { UtilsService } from './../utils.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  errorMessage:string = ''
  constructor(private service: UtilsService,private router:Router) { }

  permission = new FormGroup({
    email: new FormControl('',[Validators.required]),
    role: new FormControl('',[Validators.required])

  })

  ngOnInit(): void {
  }

  onPermission(){
   if(this.permission.invalid){
     return ;
   }
  const {role,email} = this.permission.value;
   this.service.onPermission(role,email).subscribe(res => {
   
    this.permission.reset()
      this.router.navigateByUrl('/blog-listing');
    },error => {
      this.errorMessage = error?.error?.msg || 'something went wrong, please try later';
    })
  }

}
