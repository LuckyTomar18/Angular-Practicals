import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  endpoint = 'http://localhost:8080/Auth/signUp'

  constructor(private httpService: HttpServiceService) { }

  form: any = {
    data: {},
    message: '',
    inputerror: {}
  }

  signUp() {
    let self = this;
    console.log('form data== ', this.form.data);
    this.httpService.post(this.endpoint, this.form.data, function (response: any) {
      console.log('response ====== ', response)

      if (!response.success && response.result.inputerror) {
        self.form.inputerror = response.result.inputerror;
      }

      self.form.message = response.result.message;
    })
  }

}