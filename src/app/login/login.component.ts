import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private httpService: HttpServiceService , private router: Router) { }

  endpoint = 'http://localhost:8080/Auth/login';

  form : any = {
    data: {},
    inputerror: {},
    success: true,
    message: ''

  }

  signIn(){

    let self = this;

    this.httpService.post(this.endpoint, this.form.data ,function(response: any){
      console.log('response===>', response);

      if(!response.success && response.result.inputerror) {
        self.form.inputerror = response.result.inputerror;
  }
 
  if(response.success && response.result.message) {
    self.form.message = response.result.message;
  }
  if(response.success){
    localStorage.setItem('firstName', response.result.data.firstName);
    localStorage.setItem('roleName', response.result.data.roleName);
    localStorage.setItem('id', response.result.data.id);
    self.router.navigateByUrl('/welcome');
   
  }
    });
  }

   signUp() {
    this.router.navigateByUrl('/signup');
  }
}
