import { Router } from '@angular/router';
import { UtilsService } from './../utils.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  login  = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
    question:new FormControl('',[Validators.required]),
    answer:new FormControl('',[Validators.required])
  })

  Security:string[] = ['What city were you born in?','What’s your favorite movie?','What was your first car?','What was your favorite school teacher’s name?'];
 
  loginError:string = ''
  constructor(private service: UtilsService,private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    const {email,password,question,answer} = this.login.value;
    this.service.loginFn(email,password,question,answer).subscribe(res => {
      localStorage.setItem('token',res.token.token);
      this.router.navigate(['/blog-listing'])
    },error => {
     this.loginError = error.error.msg
    })
  }

}
