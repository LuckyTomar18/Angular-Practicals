import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service'; // Import HttpServiceService to make HTTP requests
import { Router } from '@angular/router'; // Import Router to navigate between routes
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute to access query parameters

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private httpService: HttpServiceService , private router: Router, private activatedRoute: ActivatedRoute) {
      this.activatedRoute.queryParams.subscribe(params => {
        if(params['message']) {
          this.form.message = params['message'];
        }
      });
   }


  endpoint = 'http://localhost:8080/Auth/login';

  form : any = {
    data: {},
    inputerror: {},
    success: true,
    message: '',
    errormessage: ''

  }

  signIn(){

    let self = this;

    this.httpService.post(this.endpoint, this.form.data ,function(response: any){
      console.log('response===>', response);

      if(!response.success && response.result.inputerror) {// Check input errors
        self.form.inputerror = response.result.inputerror;
  }
 
  if(!response.success && response.result.message) { // Check login & password invalid  message
    self.form.errormessage = response.result.message;
  }
  if(response.success){  // If login is successful, store user data in localStorage and navigate to welcome page
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
