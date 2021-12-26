import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
   private  Auth : AuthService,
   private dataService : DataService,
   private router :Router
  ) { }

  ngOnInit(): void {
    this.dataService.setTitle('Login')
  }

  createLogin(loginData:any){
    if(loginData.value.email==''){
      this.dataService.showAlert('error','Error','Please Enter Email')
      return
    }

    if(loginData.value.password==''){
      this.dataService.showAlert('error','Error','Please Enter Password')
      return
    }

    this.Auth.setToken(JSON.stringify(loginData.value));
    this.router.navigateByUrl("/dashboard");
    this.dataService.showAlert('success','Success','Welcome back!')

  }

}
