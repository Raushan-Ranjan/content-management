import { Router } from '@angular/router';
import { UtilsService } from './../utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {


  register  = new FormGroup({
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
    question:new FormControl('',[Validators.required]),
    answer:new FormControl('',[Validators.required])
  })
  Security:string[] = ['What city were you born in?','What’s your favorite movie?','What was your first car?','What was your favorite school teacher’s name?'];
 errorMessage: string = '';
  constructor(private service: UtilsService,private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(){
    const {email,name,password,question,answer} = this.register.value;
    this.service.onRegistration(name,email,password,question,answer).subscribe((res:any) => {
      // this.loginDetails = res.data;
      localStorage.setItem('token',res.token.token);
      this.router.navigate(['/blog-listing'])
      },error => {
        this.errorMessage = error.error.msg;
      })
  }

}
